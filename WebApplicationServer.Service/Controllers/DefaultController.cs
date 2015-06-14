// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace WebApplicationServerService.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Microsoft.ServiceFabric.Data;
    using Microsoft.ServiceFabric.Data.Collections;

    /// <summary>
    /// Default controller.
    /// </summary>
    public class DefaultController : ApiController
    {
        private readonly IReliableStateManager stateManager;

        public DefaultController(IReliableStateManager stateManager)
        {
            this.stateManager = stateManager;
        }

        [HttpPut]
        public async Task<IHttpActionResult> StartReportAnalysis(string jobDetails)
        {
            IReliableQueue<string> queue = await this.stateManager.GetOrAddAsync<IReliableQueue<string>>("jobInputQueue");

            using (ITransaction tx = this.stateManager.CreateTransaction())
            {
                await queue.EnqueueAsync(tx, jobDetails);

                await tx.CommitAsync();
            }
            return this.Ok();
        }
    }
}