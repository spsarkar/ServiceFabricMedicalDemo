// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace Microsoft.Azure.Service.Fabric.ComputeEngine
{
    using System;
    using System.Collections.Generic;
    using System.Fabric.Description;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Azure.Service.Fabric.ComputeEngine.Interfaces;
    using Microsoft.ServiceFabric.Actors;

    public class ComputeEngineActor : Actor<DispensedTaskList>, IComputeEngineActor
    {
        public Task<List<DispensedTask>> GetTaskListAsync()
        {
            return Task.FromResult(this.State.TaskList);
        }

        public Task SubmitTaskAsync(string message)
        {
            this.State.TaskList.Add(
                new DispensedTask
                {
                    Id = Guid.NewGuid(),
                    TaskMessage = message,
                    ReceivedAt = DateTime.Now
                });

            return Task.FromResult(true);
        }

        public Task DeleteTaskAsync(Guid messageId)
        {
            for (int i = 0; i < this.State.TaskList.Count; i++)
            {
                if (this.State.TaskList[i].Id.Equals(messageId))
                {
                    this.State.TaskList.RemoveAt(i);
                    break;
                }
            }

            return Task.FromResult(true);
        }

        public Task CleanAllTasksAsync()
        {
            this.State.TaskList.Clear();

            return Task.FromResult(true);
        }

        public override async Task OnActivateAsync()
        {
            ServiceEventSource.Current.ActorActivatedStart(this);
            await base.OnActivateAsync();
            ServiceEventSource.Current.ActorActivatedStop(this);
        }

        public override async Task OnDeactivateAsync()
        {
            ServiceEventSource.Current.ActorDeactivatedStart(this);
            await base.OnDeactivateAsync();
            ServiceEventSource.Current.ActorDeactivatedStop(this);
        }
    }
}