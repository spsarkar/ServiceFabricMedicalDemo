import 'css/index.css'

import Config from './config/Config'
import ConnectionStatus from './connections/ConnectionStatus'

var config = new Config();
var connectionStatus = new ConnectionStatus(config);

import './views/app-header.tag'
import './views/app-content.tag'
import './views/app-footer.tag'

riot.mount('app-header', config.user);
riot.mount('app-content', connectionStatus)
riot.mount('app-footer', connectionStatus);

