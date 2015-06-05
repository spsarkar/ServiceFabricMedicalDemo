namespace Combinostics.Demo.Web.Authentication
{
    using Microsoft.Owin;

    public static class AuthenticationExtensionMethods
    {
        public static bool IsAuth0LoginCallback(this IOwinRequest request)
        {
            return request.Uri.AbsolutePath == Authentication.Auth0LoginCallback;
        }

        public static bool IsLogoutRequest(this IOwinRequest request)
        {
            return request.Uri.AbsolutePath == Authentication.Logout;
        }
    }
}
