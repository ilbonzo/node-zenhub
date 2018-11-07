var Http = require('./_http');
var Issues = require('./issues');
var Boards = require('./boards');
var Epics = require('./epics');
var Milestones = require('./milestones');

/**
 * ZenHub API Client
 * @constructor
 * @param string    token   Your account's ZenHub token
 * @author Matteo Magni <matteo@magni.me> (magni.me)
 */
var ZenHub = function(token) {
    this.credentials = {
        'access_token': token
    };
    this._http = new Http(this.credentials);
    this.issues = new Issues(this._http);
    this.boards = new Boards(this._http);
    this.epics = new Epics(this._http);
    this.milestones = new Milestones(this._http);
};

module.exports = ZenHub;