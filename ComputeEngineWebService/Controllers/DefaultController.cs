﻿// ------------------------------------------------------------
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
        public HttpResponseMessage Index()
        {
            //TODO: Add error handling.

            return this.View("Microsoft.Azure.Service.Fabric.ComputeEngine.wwwroot.Index.html", "text/html");
        }

        [HttpGet]
        public HttpResponseMessage ping()
        {
            HttpResponseMessage message = new HttpResponseMessage();
            message.Content = new StringContent("Compute Agent API is Live", Encoding.UTF8, "text/html");
            message.Content.Headers.Add("Access-Control-Allow-Origin", "*");
            return message;
        }

        [HttpGet]
        public HttpResponseMessage GetActorID()
        {
            //TODO: Add error handling.

            HttpResponseMessage httpResponse = new HttpResponseMessage();
            httpResponse.Content = new StringContent(actorId.ToString(), Encoding.UTF8, "text/html");
            return httpResponse;
        }

        [HttpGet]
        public async Task<HttpResponseMessage> GetGreeting()
        {
            //TODO: Add error handling.

            String greetings = await computeEngineActor.GetGreetingAsync();

            HttpResponseMessage message = new HttpResponseMessage();
            message.Content = new StringContent(greetings, Encoding.UTF8, "text/html");
            return message;
        }

        [HttpGet]
        public async Task<HttpResponseMessage> GetMessages()
        {
            //TODO: Add error handling.

            List<Voicemail> messageList = await computeEngineActor.GetMessagesAsync();

            StringBuilder sb = new StringBuilder();
            sb.Append("<table border=\"1\"><tr><td>MESSAGE ID</td><td>RECEIVED AT</td><td>MESSAGE TEXT</td></tr>");
            foreach (Voicemail vMail in messageList.OrderBy(item => item.ReceivedAt))
            {
                sb.Append("<tr><td>");
                sb.Append(vMail.Id);
                sb.Append("</td><td>");
                sb.Append(vMail.ReceivedAt.ToString());
                sb.Append("</td><td>");
                sb.Append(vMail.Message);
                sb.Append("</td></tr>");
            }

            sb.Append("</table>");

            HttpResponseMessage message = new HttpResponseMessage();
            message.Content = new StringContent(sb.ToString(), Encoding.UTF8, "text/html");
            return message;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> SetGreeting(string greeting)
        {
            //TODO: Add error handling.

            await computeEngineActor.SetGreetingAsync(greeting);

            HttpResponseMessage httpResponse = new HttpResponseMessage();
            httpResponse.Content =
                new StringContent(String.Format("Greeting Message: {0} <br/>Time Updated: {1}.", greeting, DateTime.Now.ToString()), Encoding.UTF8, "text/html");
            return httpResponse;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> LeaveMessage(string message)
        {
            //TODO: Add error handling.

            await computeEngineActor.LeaveMessageAsync(message);

            HttpResponseMessage httpResponse = new HttpResponseMessage();
            httpResponse.Content =
                new StringContent(String.Format("Message Text: {0} <br/>Time Sent: {1} ", message, DateTime.Now.ToString()), Encoding.UTF8, "text/html");
            return httpResponse;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> DeleteMessage()
        {
            //TODO: Add error handling.

            HttpResponseMessage httpResponse = new HttpResponseMessage();

            List<Voicemail> messageList = await computeEngineActor.GetMessagesAsync();

            if (messageList.Count < 1)
            {
                httpResponse.Content = new StringContent("Voicemail inbox is empty. Nothing to delete.", Encoding.UTF8, "text/html");
                return httpResponse;
            }

            Voicemail vMail = messageList.OrderBy(item => item.ReceivedAt).First();

            await computeEngineActor.DeleteMessageAsync(vMail.Id);

            httpResponse.Content =
                new StringContent(
                    String.Format("Message Text: {0} <br/>Time Deleted: {1}.", vMail.Message, DateTime.Now.ToString()),
                    Encoding.UTF8,
                    "text/html");
            return httpResponse;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> DeleteAllMessages()
        {
            //TODO: Add error handling.

            await computeEngineActor.DeleteAllMessagesAsync();

            HttpResponseMessage httpResponse = new HttpResponseMessage();
            httpResponse.Content = new StringContent(String.Format("Time Deleted: {0}.", DateTime.Now.ToString()), Encoding.UTF8, "text/html");
            return httpResponse;
        }
    }
}