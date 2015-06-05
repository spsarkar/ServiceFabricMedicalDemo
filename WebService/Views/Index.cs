namespace WebService
{
    using System.Configuration;
    using Nancy;
    using Nancy.Security;

    public class Index : NancyModule
    {
        public Index()
        {
            this.RequiresMSOwinAuthentication();

            Get[string.Empty] = _ =>
            {
                var model = new
                {
                    ApiBaseUrl = "https://localhost:44302",
                    AgentBaseUrl = "https://localhost:44304"
                };
                return View["index", model];
            };
        }
    }
}
