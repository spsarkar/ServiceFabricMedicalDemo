// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace Microsoft.Azure.Service.Fabric.ComputeEngine.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.ServiceFabric.Actors;

    public interface IComputeEngineActor : IActor
    {
        [Readonly]
        Task<List<DispensedTask>> GetTaskListAsync();

        Task SubmitTaskAsync(string message);
        Task DeleteTaskAsync(Guid messageId);
        Task CleanAllTasksAsync();
    }
}