var Http = require('./_http');
var Issues = require('./issues');
var Boards = require('./boards');
var Epics = require('./epics');
var Milestones = require('./milestones');
var ReleaseReports = require('./release-reports');

/**
 * ZenHub API Client
 * @constructor
 * @param string    token   Your account's ZenHub token
 * @param {string}    zenhub_api_url   URL of your enterprise instance of zenhub
 * @author Matteo Magni <matteo@magni.me> (magni.me)
 */
var ZenHub = function(token, zenhub_api_url) {
    this.credentials = {
        'access_token': token
    };
    this._http = new Http(this.credentials, zenhub_api_url);
    this.issues = new Issues(this._http);
    this.boards = new Boards(this._http);
    this.epics = new Epics(this._http);
    this.milestones = new Milestones(this._http);
    this.releaseReports = new ReleaseReports(this._http);
};

module.exports = ZenHub;