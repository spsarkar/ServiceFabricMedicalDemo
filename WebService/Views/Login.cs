namespace WebService
{
    using Nancy;

    public class Login : NancyModule
    {
        public Login()
        {
            Get["/login"] = _ => View["login"];
        }
    }
}
