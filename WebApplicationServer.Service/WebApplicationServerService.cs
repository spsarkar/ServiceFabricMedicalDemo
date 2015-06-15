// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace WebApplicationServer.Service
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.ServiceFabric.Actors;
    using Microsoft.ServiceFabric.Data;
    using Microsoft.ServiceFabric.Data.Collections;
    using Microsoft.ServiceFabric.Services;
    using Microsoft.Azure.Service.Fabric.ComputeEngine.Interfaces;
    using WordCount.Common;
    using System.Net.Http;
    using System.Net.Http.Headers;



    /// <summary>
    /// Sample Service Fabric persistent service for counting words.
    /// </summary>
    public class WebApplicationServerService : StatefulService
    {        
        public const string ServiceEventSourceName = "WebApplicationServerService";
        static Random _r = new Random();

        /// <summary>
        /// Initializes a new instance of the <see cref="WebApplicationServer"/> class. 
        /// </summary>
        public WebApplicationServerService()
        {
            ServiceEventSource.Current.ServiceInstanceConstructed(ServiceEventSourceName);
        }

        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            ServiceEventSource.Current.RunAsyncInvoked(ServiceEventSourceName);

            IReliableQueue<string> inputQueue = await this.StateManager.GetOrAddAsync<IReliableQueue<string>>("jobInputQueue");
            while (true)
            {
                cancellationToken.ThrowIfCancellationRequested();

                try
                {
                    using (ITransaction tx = this.StateManager.CreateTransaction())
                    {
                        ConditionalResult<string> dequeuReply = await inputQueue.TryDequeueAsync(tx);

                        if (dequeuReply.HasValue)
                        {
                            string taskDetails = dequeuReply.Value;
                            //Send for Processing to the web service hosting the actors
                            submitDemoComputeJob(taskDetails);

                            await tx.CommitAsync();
                        }
                    }

                    await Task.Delay(TimeSpan.FromMilliseconds(100), cancellationToken);
                }
                catch (TimeoutException)
                {
                    //Service Fabric uses timeouts on collection operations to prevent deadlocks.
                    //If this exception is thrown, it means that this transaction was waiting the default
                    //amount of time (4 seconds) but was unable to acquire the lock. In this case we simply
                    //retry after a random backoff interval. You can also control the timeout via a parameter
                    //on the collection operation.
                    Thread.Sleep(TimeSpan.FromSeconds(new Random().Next(100, 300)));

                    continue;
                }
                catch (Exception exception)
                {
                    //For sample code only: simply trace the exception.
                    ServiceEventSource.Current.MessageEvent(exception.ToString());
                }
            }
        }

        private void submitDemoComputeJob(string taskDetails)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:44304/");

            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            string jobUrl = "/dispense/SubmitTask/" + _r.Next();

            var response = client.PostAsJsonAsync(jobUrl, taskDetails).Result;
            string msg;

            if (response.IsSuccessStatusCode)
            {
                msg = "Distributed Job --- {0} ----  submitted successfully" + taskDetails;
            }
            else
            {
                msg = "Error Code" + response.StatusCode + " : Message - " + response.ReasonPhrase;
                
            }
            ServiceEventSource.Current.MessageEvent(msg);
        }

        protected override ICommunicationListener CreateCommunicationListener()
        {
            ServiceEventSource.Current.CreateCommunicationListener(ServiceEventSourceName);

            return new OwinCommunicationListener("WebApplicationServer", new Startup(this.StateManager));
        }
    }
}