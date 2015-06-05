using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebService
{
    using System;
    using System.IO;
    using Nancy;
    using System.Reflection;

    /// <summary>
    /// Sets up the root path for Nancy application when running as ASP.NET hosted OWIN application.
    /// </summary>
    public class NancyRootPathProvider : IRootPathProvider
    {
        /// <summary>
        /// Gets the root path for Nancy views.
        /// </summary>
        public string GetRootPath()
        {
            var assembly =
                Assembly.GetEntryAssembly() ??
                Assembly.GetExecutingAssembly();

            var assemblyPath =
                Path.GetDirectoryName(assembly.Location) ??
                Environment.CurrentDirectory;

            //We want to move two directories up ( to the project root ).
            //Nancy does not allow relative paths for static content,
            //so we make sure we have an absolute path using GetFullPath

            //var rootPath = Path.GetFullPath(Path.Combine(assemblyPath, "..", ".."));
            var debugNancyViewsPath = Path.Combine(assemblyPath, "Views");
            var assemblyPathFull = Path.GetFullPath(assemblyPath);
            var rootPath = Path.GetFullPath(debugNancyViewsPath);
            if (!Directory.Exists(rootPath))
            {
                throw new Exception(string.Format("Views within root path cannot be found: {0}.",
                                                  new DirectoryInfo(rootPath).FullName));
            }
            return assemblyPathFull;
        }
    }
}
