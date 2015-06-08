// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------
using Microsoft.Owin;
//[assembly: OwinStartup(typeof (WebServiceFrontEnd), WebServiceFrontEnd.ConfigurationMethodName)]

namespace WebServiceFrontEnd
{
    using System.Web.Http;
    using System.Configuration;
    using System.Diagnostics;
    using System.Threading.Tasks;
    using Auth0.Owin;
    using Combinostics.Demo.Web.Authentication;
    using Microsoft.AspNet.Identity;
    using Microsoft.Owin;
    using Microsoft.Owin.Security.Cookies;
    using Nancy.Helpers;
    using Owin;
    using System;

    public class Startup : IOwinAppBuilder
    {
        internal const string ConfigurationMethodName = "Configuration";

        private readonly string domain = "combinosticst.auth0.com";
        private readonly string clientId = "Gwa7en2pSNwc3DsUfifjBakFGBJw6bAV";
        private readonly string clientSecret = "T5_gyh9tjFaJ894QObzTQ-0eGUfcpbTnYz4FDAyD98BIgz-kOv4mGl_aLEo4J6MW";

        public void Configuration(IAppBuilder app)
        {
            AppDomain.CurrentDomain.UnhandledException += UnhandledException;

            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(GetCookieAuthenticationOptions());

            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            app.UseAuth0Authentication(
                clientId,
                clientSecret,
                domain,
                Authentication.Auth0LoginCallback,
                provider: GetAuth0AuthenticationProvider());

            app.Use<Auth0AuthenticationCallback>();
            app.Use<LogoutMiddleware>();
            
            app.UseNancy();
        }

        private static CookieAuthenticationOptions GetCookieAuthenticationOptions()
        {
            return new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/login"),
                LogoutPath = new PathString("/logout"),
                ExpireTimeSpan = TimeSpan.FromSeconds(86400.0)
            };
        }

        private static Auth0AuthenticationProvider GetAuth0AuthenticationProvider()
        {
            var provider = new Auth0AuthenticationProvider
            {
                OnReturnEndpoint = context =>
                {
                    // xsrf validation
                    if (context.Request.Query["state"] == null || !context.Request.Query["state"].Contains("xsrf="))
                    {
                        throw new InvalidOperationException("Invalid or missing antiforgery token.");
                    }
                    var actual = HttpUtility.ParseQueryString(context.Request.Query["state"])["xsrf"];
                    var expected = context.Request.Cookies[Authentication.AntiForgeryTokenKey];
                    expected = expected.Replace('+', ' '); // '+' doesn't survive the round-trip to Auth0

                    if (expected != actual)
                    {
                        throw new InvalidOperationException("Invalid or missing antiforgery token.");
                    }

                    return Task.FromResult(0);
                }
            };
            return provider;
        }

        private static void UnhandledException(object sender, UnhandledExceptionEventArgs e)
        {
            Trace.TraceError(e.ExceptionObject.ToString());
        }
    }
}