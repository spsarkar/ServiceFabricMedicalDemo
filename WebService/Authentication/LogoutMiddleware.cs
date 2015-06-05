namespace Combinostics.Demo.Web.Authentication
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.Owin;

    public class LogoutMiddleware : OwinMiddleware
    {
        public LogoutMiddleware(OwinMiddleware next)
            : base(next)
        {
        }

        public async override Task Invoke(IOwinContext context)
        {
            if (context.Request.IsLogoutRequest())
            {
                var authenticationManager = context.Authentication;
                authenticationManager.SignOut();
                context.Response.Redirect("/");
            }
            else
            {
                await Next.Invoke(context);
            }
        }
    }
}
