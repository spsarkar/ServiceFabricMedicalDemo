// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace WebApplicationServer.WebService.Controllers
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Fabric;
    using System.Fabric.Query;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Microsoft.ServiceFabric.Services;
    using System.Web;
    using System.Web.Http.Cors;

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    /// <summary>
    /// Default controller.
    /// </summary>

    public class DefaultController : ApiController
    {
        private const string WordCountServiceName = "fabric:/WebServiceFrontEndApplication/WebApplicationServerService";
        
        private const int MaxQueryRetryCount = 20;
        private static TimeSpan BackoffQueryDelay = TimeSpan.FromSeconds(3);
        private static FabricClient fabricClient = new FabricClient();

        private static CommunicationClientFactory clientFactory = new CommunicationClientFactory(
            ServicePartitionResolver.GetDefault(),
            TimeSpan.FromSeconds(10),
            TimeSpan.FromSeconds(3));

        [HttpGet]
        public HttpResponseMessage ping()
        {
            HttpResponseMessage message = new HttpResponseMessage();
            message.Content = new StringContent("Agent API is Live", Encoding.UTF8, "text/html");
            message.Content.Headers.Add("Access-Control-Allow-Origin", "*");
            return message;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> StartReportAnalysis(string word)
        {
            // Determine the partition key that should handle the request
            long partitionKey = GetPartitionKey(word);

            // Use service partition client to resolve the service and partition key.
            // This determines the endpoint of the replica that should handle the request.
            // Internally, the service partition client handles exceptions and retries appropriately.
            ServicePartitionClient<CommunicationClient> servicePartitionClient = new ServicePartitionClient<CommunicationClient>(
                clientFactory,
                new Uri(WordCountServiceName),
                partitionKey);

            return await servicePartitionClient.InvokeWithRetryAsync(
                client =>
                {
                    Uri serviceAddress = new Uri(client.BaseAddress, string.Format("StartReportAnalysis/{0}", word));

                    HttpWebRequest request = WebRequest.CreateHttp(serviceAddress);
                    request.Method = "PUT";
                    request.ContentLength = 0;
                    request.Timeout = (int) client.OperationTimeout.TotalMilliseconds;
                    request.ReadWriteTimeout = (int) client.ReadWriteTimeout.TotalMilliseconds;

                    using (HttpWebResponse response = (HttpWebResponse) request.GetResponse())
                    {
                        HttpResponseMessage message = new HttpResponseMessage();
                        message.Content = new StringContent(
                            String.Format("<h1>{0}</h1> added to partition <h2>{1}</h2> at {2}", word, client.ResolvedServicePartition.Info.Id, serviceAddress),
                            Encoding.UTF8,
                            "text/html");
                        return Task.FromResult<HttpResponseMessage>(message);
                    }
                });
        }

        /// <summary>
        /// Gets the partition key which serves the specified word.
        /// Note that the sample only accepts Int64 partition scheme. 
        /// </summary>
        /// <param name="word">The word that needs to be mapped to a service partition key.</param>
        /// <returns>A long representing the partition key.</returns>
        private static long GetPartitionKey(string word)
        {
            return ((long) char.ToUpper(word[0])) - 64;
        }

        /// <summary>
        /// Returns a list of service partition clients pointing to one key in each of the WordCount service partitions.
        /// The returned representative key is the min key served by each partition.
        /// </summary>
        /// <returns>The service partition clients pointing at a key in each of the WordCount service partitions.</returns>
        private async Task<IList<ServicePartitionClient<CommunicationClient>>> GetServicePartitionClientsAsync()
        {
            for (int i = 0; i < MaxQueryRetryCount; i++)
            {
                try
                {
                    // Get the list of partitions up and running in the service.
                    ServicePartitionList partitionList = await fabricClient.QueryManager.GetPartitionListAsync(new Uri(WordCountServiceName));

                    // For each partition, build a service partition client used to resolve the low key served by the partition.
                    IList<ServicePartitionClient<CommunicationClient>> partitionClients =
                        new List<ServicePartitionClient<CommunicationClient>>(partitionList.Count);
                    foreach (Partition partition in partitionList)
                    {
                        Int64RangePartitionInformation partitionInfo = partition.PartitionInformation as Int64RangePartitionInformation;
                        if (partitionInfo == null)
                        {
                            throw new InvalidOperationException(
                                string.Format(
                                    "The service {0} should have a uniform Int64 partition. Instead: {1}",
                                    WordCountServiceName,
                                    partition.PartitionInformation.Kind));
                        }

                        partitionClients.Add(
                            new ServicePartitionClient<CommunicationClient>(clientFactory, new Uri(WordCountServiceName), partitionInfo.LowKey));
                    }

                    return partitionClients;
                }
                catch (FabricTransientException ex)
                {
                    ServiceEventSource.Current.OperationFailed(ex.Message, "create representative partition clients");
                    if (i == MaxQueryRetryCount - 1)
                    {
                        throw;
                    }
                }

                await Task.Delay(BackoffQueryDelay);
            }

            throw new TimeoutException("Retry timeout is exhausted and creating representative partition clients wasn't successful");
        }
    }
}