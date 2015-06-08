﻿// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace WebApplicationServer.WebService
{
    using Microsoft.ServiceFabric.Services;
    using WordCount.Common;

    /// <summary>
    /// Service that handles front-end web requests and acts as a proxy to the back-end data for the UI web page.
    /// It is a stateless service that hosts a Web API application on OWIN.
    /// </summary>
    public class WebApplicationServerWebService : StatelessService
    {
        /// <summary>
        /// Creates a listener for Web API with websockets.
        /// </summary>
        /// <returns>The OWIN communication listener.</returns>
        protected override ICommunicationListener CreateCommunicationListener()
        {
            return new OwinCommunicationListener("wordcount", new Startup());
        }
    }
}