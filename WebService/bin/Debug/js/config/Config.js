import $ from 'jquery'
import User from './user'

export default class Config {
    constructor() {
        this.apiBaseUrl = $("meta[name=\"env:url:api\"]").attr("content");
        this.agentBaseUrl = $("meta[name=\"env:url:agent\"]").attr("content");
        this.user = new User();
    }
}
