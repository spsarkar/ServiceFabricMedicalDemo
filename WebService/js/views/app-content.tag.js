import riot from 'riot'

riot.tag('app-content',

    `<div class="container">
          <h3> Service Web Endpoint Status </h3>
          <h5>Agent status <span class="label label-{ agentStatus }"> { agentMessage } </span></h5>
         <div class="row">
            <button id="sendButton" onclick={sendAnalysisTask}>Send Report For Analysis</button>
            <br></br>
            <div id="sendResult"></div>
            <div id="sendWord"></div>
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

        this.SendWords = function (){
            $.ajax({
                url: connectionStatus.config.apiBaseUrl + '/analyze/AddWord/' + this.randomWord(),
                method: 'POST'
            })
           .done(function (wordResult) {
               $('#sendWord').html(wordResult);
           });
        }

        this.sendAnalysisTask = function() {
            this.sendButton.disabled=true
            $('#sendResult').html("<span>Report sent for Analysis, waiting result....</span>" );
            this.SendWords();
        }

        this.getdAnalysisTaskID = function() {
            this.sendButton.disabled=true
        }

        this.count = function(){
            $.ajax({
                url: connectionStatus.config.apiBaseUrl + '/analyze/Count?c=' + Math.random(),
                dataType: 'text',
                method: 'GET'
            })
           .done(function (countResult) {
               $('#getResult').html(countResult)
           });
        }

        this.randomWord = function(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }


        this.SetGreeting = function() {
            $.ajax({
                url:  connectionStatus.conf.agentBaseUrl + '/voicemailbox/SetGreeting/' + NextGreeting(),
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
                url: connectionStatus.conf.agentBaseUrl + '/voicemailbox/GetMessages?c=' + (++getRequestIteration),
                dataType: 'text',
                method: 'GET'
            })
           .done(function (getMessagesResult) {
               $('#getMessages').html(getMessagesResult)
           });
        }
    }    
);

