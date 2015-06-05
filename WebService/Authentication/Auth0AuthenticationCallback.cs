namespace Combinostics.Demo.Web.Authentication
{
    using System;
    using System.Diagnostics;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNet.Identity;
    using Microsoft.Owin;
    using Microsoft.Owin.Security;

    public class Auth0AuthenticationCallback : OwinMiddleware
    {
        public Auth0AuthenticationCallback(OwinMiddleware next)
            : base(next)
        {
        }

        public override async Task Invoke(IOwinContext context)
        {
            if (context.Request.IsAuth0LoginCallback())
            {
                //Trace.Assert(!context.Request.User.Identity.IsAuthenticated);
                var authentication = context.Authentication;
                authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                var externalIdentity = await authentication.GetExternalIdentityAsync(DefaultAuthenticationTypes.ExternalCookie);
                if (externalIdentity == null)
                {
                    throw new Exception("Could not get the external identity. Please check your Auth0 configuration settings and ensure that " +
                                        "you configured UseCookieAuthentication and UseExternalSignInCookie in the OWIN Startup class. " +
                                        "Also make sure you are not calling setting the callbackOnLocationHash option on the JavaScript login widget.");
                }

                authentication.SignIn(
                    new AuthenticationProperties {IsPersistent = false},
                    new ClaimsIdentity(externalIdentity.Claims, DefaultAuthenticationTypes.ApplicationCookie));

                var returnUrl = context.Request.Query.Get("returnUrl");
                var idTokenClaim = externalIdentity.Claims.FirstOrDefault(claim => claim.Type == "id_token");
                var fragment = string.Empty;
                if (idTokenClaim != null)
                {
                    fragment = idTokenClaim.Value;
                }
                context.Response.Redirect(GetLocalUrl(returnUrl) + "#" + fragment);
            }
            else
            {
                await Next.Invoke(context);
            }
        }

        private static string GetLocalUrl(string url)
        {
            return string.IsNullOrEmpty(url) ? "/" : new Uri(url).PathAndQuery;
        }
    }
}
