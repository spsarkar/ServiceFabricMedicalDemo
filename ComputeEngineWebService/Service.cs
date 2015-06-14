﻿// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace Microsoft.Azure.Service.Fabric.ComputeEngine
{
    using Microsoft.ServiceFabric.Services;

    /// <summary>
    /// This service handles front-end web requests and acts as a proxy to the back-end data for the UI web page.
    /// This service is a stateless service that hosts a Web API application on OWIN.
    /// </summary>
    public class Service : StatelessService
    {
        /// <summary>
        /// Name of the service type.
        /// </summary>
        public const string ServiceTypeName = "ComputeEngineWebServiceType";

        /// <summary>
        /// Creates a listener for Web API with websockets.
        /// </summary>
        /// <returns></returns>
        protected override ICommunicationListener CreateCommunicationListener()
        {
            return new OwinCommunicationListener("dispense", new Startup());
        }
    }
}