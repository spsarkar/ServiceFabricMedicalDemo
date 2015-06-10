﻿// ------------------------------------------------------------
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

    public class ComputeEngineActor : Actor<VoicemailBox>, IComputeEngineActor
    {
        public Task<List<Voicemail>> GetMessagesAsync()
        {
            return Task.FromResult(this.State.MessageList);
        }

        public Task<string> GetGreetingAsync()
        {
            if (string.IsNullOrEmpty(this.State.Greeting))
            {
                ConfigurationSettings configSettings = this.Host.ActivationContext.GetConfigurationPackageObject("Config").Settings;
                ConfigurationSection configSection = configSettings.Sections.FirstOrDefault(s => (s.Name == "GreetingConfig"));
                if (configSection != null)
                {
                    ConfigurationProperty defaultGreeting = configSection.Parameters.FirstOrDefault(p => (p.Name == "DefaultGreeting"));
                    if (defaultGreeting != null)
                    {
                        return Task.FromResult(defaultGreeting.Value);
                    }
                }

                return Task.FromResult("No one is available, please leave a message after the beep.");
            }

            return Task.FromResult(this.State.Greeting);
        }

        public Task LeaveMessageAsync(string message)
        {
            this.State.MessageList.Add(
                new Voicemail
                {
                    Id = Guid.NewGuid(),
                    Message = message,
                    ReceivedAt = DateTime.Now
                });

            return Task.FromResult(true);
        }

        public Task SetGreetingAsync(string greeting)
        {
            this.State.Greeting = greeting;

            return Task.FromResult(true);
        }

        public Task DeleteMessageAsync(Guid messageId)
        {
            for (int i = 0; i < this.State.MessageList.Count; i++)
            {
                if (this.State.MessageList[i].Id.Equals(messageId))
                {
                    this.State.MessageList.RemoveAt(i);
                    break;
                }
            }

            return Task.FromResult(true);
        }

        public Task DeleteAllMessagesAsync()
        {
            this.State.MessageList.Clear();

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