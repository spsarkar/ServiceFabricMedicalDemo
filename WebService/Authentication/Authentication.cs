namespace Combinostics.Demo.Web.Authentication
{
    public static class Authentication
    {
        public const string AntiForgeryTokenKey = Nancy.Security.CsrfToken.DEFAULT_CSRF_KEY;
        public const string Auth0LoginCallback = "/auth0_login_callback";
        public const string Logout = "/logout";
    }
}
