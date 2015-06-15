// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace Microsoft.Azure.Service.Fabric.ComputeEngine.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Cors;
    using Microsoft.Azure.Service.Fabric.ComputeEngine.Interfaces;
    using Microsoft.ServiceFabric.Actors;

    /// <summary>
    /// Default controller.
    /// </summary>
    /// 
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class DefaultController : ApiController
    {
        private static Uri serviceUri = new Uri("fabric:/ComputeEngineApplication/ComputeEngineActorService");
        private static ActorId actorId = ActorId.NewId();
        private static IComputeEngineActor computeEngineActor = ActorProxy.Create<IComputeEngineActor>(actorId, serviceUri);

        [HttpGet]
        public HttpResponseMessage ping()
        {
            HttpResponseMessage message = new HttpResponseMessage();
            message.Content = new StringContent("Compute Agent API is Live", Encoding.UTF8, "text/html");
            message.Content.Headers.Add("Access-Control-Allow-Origin", "*");
            return message;
        }

        [HttpGet]
        public async Task<HttpResponseMessage> GetAllSubmittedTask()
        {
            //TODO: Add error handling.

            List<DispensedTask> TaskMessageList = await computeEngineActor.GetTaskListAsync();

            StringBuilder sb = new StringBuilder();
            sb.Append("<table border=\"1\"><tr><td>Task ID</td><td>RECEIVED AT</td><td>TASK DETAILS</td></tr>");
            foreach (DispensedTask task in TaskMessageList.OrderBy(item => item.ReceivedAt))
            {
                sb.Append("<tr><td>");
                sb.Append(task.Id);
                sb.Append("</td><td>");
                sb.Append(task.ReceivedAt.ToString());
                sb.Append("</td><td>");
                sb.Append(task.TaskMessage);
                sb.Append("</td></tr>");
            }

            sb.Append("</table>");

            HttpResponseMessage message = new HttpResponseMessage();
            message.Content = new StringContent(sb.ToString(), Encoding.UTF8, "text/html");
            return message;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> SubmitTask(string message)
        {
            //TODO: Add error handling.

            await computeEngineActor.SubmitTaskAsync(message);

            HttpResponseMessage httpResponse = new HttpResponseMessage();
            httpResponse.Content =
                new StringContent(String.Format("Job ---- {0} --- Submitted <br/>Time Submitted: {1} ", message, DateTime.Now.ToString()), Encoding.UTF8, "text/html");
            return httpResponse;
        }
    }
}