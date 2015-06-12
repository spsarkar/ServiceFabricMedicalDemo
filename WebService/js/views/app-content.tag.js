import riot from 'riot'

riot.tag('app-content',

    `<div class="container">
        <div class="row">
            <div class="col-sm-3">
                <h5>Agent status <span class="label label-{ agentStatus }"> { agentMessage } </span></h5>
            </div>
            <div id="sendResult"></div>
            <button onclick={sayHello}>Click me</button>
            <div id="count"></div>
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

        this.sendAnalysisTask = function() {
            this.sendButton.disabled=true
        }

        this.getdAnalysisTaskID = function() {
            this.sendButton.disabled=true
        }


        this.SetGreeting = function() {
            $.ajax({
                url: serviceUrl + '/voicemailbox/SetGreeting/' + NextGreeting(),
                dataType: 'text',
                method: 'POST'
            })
           .done(function (setGreetingResult) {
               $('#setGreeting').html(setGreetingResult)
               GetGreeting();
           });
        }

        this.GetMessages = function(){
            $.ajax({
                url: serviceUrl + '/voicemailbox/GetMessages?c=' + (++getRequestIteration),
                dataType: 'text',
                method: 'GET'
            })
           .done(function (getMessagesResult) {
               $('#getMessages').html(getMessagesResult)
           });
        }
    }    
);

