import riot from 'riot'

export default class ConnectionStatus {

    constructor(config) {
        riot.observable(this);
        this.config = config;

        this.apiMessage = 'Pending...';
        this.apiStatus = 'warning';

        this.agentMessage = 'Pending...';
        this.agentStatus = 'warning';

        this.CHANGED = 'changed';
        updateStatus(this);
    }
}

function updateStatus(self) {
    $.ajax({
        type: 'GET',
        url: self.config.apiBaseUrl + '/api/ping/',
        beforeSend: xhr => {
            xhr.setRequestHeader('Authorization', 'Bearer ' + self.config.user.idToken)
        }
    }).done((response) => {
        self.apiMessage = response.Name
        self.apiStatus = 'success'
    })
    .error(() => {
        self.api = 'Missing valid token, unable to call API'
        self.apiStatus = 'danger'
    })
    .complete(() => {
        self.trigger(self.CHANGED)
    });

    $.ajax({
        type: 'GET',
        url: self.config.agentBaseUrl + '/api/ping/'
    }).done((response) => {
        self.agentMessage = response
        self.agentStatus = 'success'
    })
    .error(() => {
        self.agent = 'Unable to call Agent.'
        self.agentStatus = 'danger'
    })
    .complete(() => {
        self.trigger(self.CHANGED)
    });

    setTimeout(() => updateStatus(self), 120000);
}