import riot from 'riot'

riot.tag('app-footer',

    `<div class="container">
        <div class="row">
            <div class="col-sm-3">
                <h5>API access <span class="label label-{ apiStatus }"> { apiMessage } </span></h5>
            </div>
            <div class="col-sm-3">
                <h5>Agent status <span class="label label-{ agentStatus }"> { agentMessage } </span></h5>
            </div>
        </div>
    </div>`,

    function(connectionStatus) {
        
        this.updateConnectionStatus = function() {
            this.apiMessage = connectionStatus.apiMessage;
            this.apiStatus = connectionStatus.apiStatus;
            this.agentMessage = connectionStatus.agentMessage;
            this.agentStatus = connectionStatus.agentStatus;

            this.update();
        }

        this.updateConnectionStatus();

        connectionStatus.on(connectionStatus.CHANGED, () => {            
            this.updateConnectionStatus();
        });
    }   
);
