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
        Task<List<Voicemail>> GetMessagesAsync();

        [Readonly]
        Task<string> GetGreetingAsync();

        Task LeaveMessageAsync(string message);
        Task SetGreetingAsync(string greeting);
        Task DeleteMessageAsync(Guid messageId);
        Task DeleteAllMessagesAsync();
    }
}