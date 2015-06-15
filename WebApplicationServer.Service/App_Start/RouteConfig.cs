// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace WebApplicationServer.Service
{
    using System.Web.Http;

    public static class RouteConfig
    {
        /// <summary>
        /// Routing registration.
        /// </summary>
        /// <param name="routes">The Http routes</param>
        public static void RegisterRoutes(HttpRouteCollection routes)
        {
            routes.MapHttpRoute(
                name: "StartReportAnalysis",
                routeTemplate: "StartReportAnalysis/{word}",
                defaults: new {controller = "Default", action = "StartReportAnalysis"},
                constraints: new {}
                );
        }
    }
}