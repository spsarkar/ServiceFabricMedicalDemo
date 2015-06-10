// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace Microsoft.Azure.Service.Fabric.ComputeEngine
{
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using Microsoft.Azure.Service.Fabric.ComputeEngine.Interfaces;

    [DataContract]
    public class VoicemailBox
    {
        public VoicemailBox()
        {
            this.MessageList = new List<Voicemail>();
        }

        [DataMember]
        public List<Voicemail> MessageList { get; set; }

        [DataMember]
        public string Greeting { get; set; }
    }
}