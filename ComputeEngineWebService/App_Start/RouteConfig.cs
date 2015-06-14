// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace Microsoft.Azure.Service.Fabric.ComputeEngine
{
    using System.Web.Http;

    public static class RouteConfig
    {
        /// <summary>
        /// Routing registration.
        /// </summary>
        /// <param name="routes"></param>
        public static void RegisterRoutes(HttpRouteCollection routes)
        {
            routes.MapHttpRoute(
                name: "Default",
                routeTemplate: "{action}",
                defaults: new {controller = "Default", action = "Index"},
                constraints: new {}
                );

            routes.MapHttpRoute(
               name: "ping",
               routeTemplate: "{action}",
               defaults: new { controller = "Default", action = "ping" },
               constraints: new { }
               );

            routes.MapHttpRoute(
                name: "GetAllSubmittedTask",
                routeTemplate: "{action}",
                defaults: new {controller = "Default", action = "GetAllSubmittedTask"},
                constraints: new {}
                );

            routes.MapHttpRoute(
                name: "SubmitTask",
                routeTemplate: "SubmitTask/{message}",
                defaults: new {controller = "Default", action = "SubmitTask"},
                constraints: new {}
                );

            routes.MapHttpRoute(
                name: "DeleteMessage",
                routeTemplate: "{action}",
                defaults: new {controller = "Default", action = "DeleteMessage"},
                constraints: new {}
                );

            routes.MapHttpRoute(
                name: "Files",
                routeTemplate: "Files/{name}",
                defaults: new {controller = "File", action = "Get"},
                constraints: new {}
                );
        }
    }
}