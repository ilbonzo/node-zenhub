var extend = require('xtend');
var request = require('request');
var querystring = require('querystring');

var API_URL = 'https://api.zenhub.io/p1';

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
};
module.exports = ZenHub;

/**
 * Helper to handle requests to the API with authorization
 *
 * @private
 * @param string    url             address part after API root
 * @param object    parameters      additional parameters
 * @callback        complete
 * @memberof        ZenHub
 * @method          get
 */
ZenHub.prototype._get = function(url, parameters, callback) {
    parameters = extend(parameters, this.credentials); // Add credentials to parameters
    var getURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

    request.get({
        url: getURL,
        strictSSL: true,
        json: true
    }, function(error, response, body) {
        if (!error && !!body.status && body.status !== 'OK') {
            error = new Error(body.description || body.error_message);
        }
        callback(error, body || {});
    });
};

/**
 * Show All Pipelines in a repo board
 * This method returns all pipelines in a repo board
 * @param int   repoId      github id of repository
 * @callback    complete
 * @memberof    ZenHub
 * @method      getBoard
 */
ZenHub.prototype.getBoard = function (repoId, callback) {
    this._get('repositories/' + repoId + '/board', {}, function(error, body) {
        callback(error, body.pipelines);
    });
};

/**
 * Show issue information
 * This method returns all issue information
 * @param int   repoId      github id of repository
 * @param int   issueNumber github id of issue
 * @callback    complete
 * @memberof    ZenHub
 * @method      getIssue
 */
ZenHub.prototype.getIssue = function (repoId, issueNumber, callback) {
    this._get('repositories/' + repoId + '/issues/' + issueNumber, {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Show issue Events
 * This method returns all issue events
 * @param int   repoId      github id of repository
 * @param int   issueNumber github id of issue
 * @callback    complete
 * @memberof    ZenHub
 * @method      getIssueEvents
 */
ZenHub.prototype.getIssueEvents = function (repoId, issueNumber, callback) {
    this._get('repositories/' + repoId + '/issues/' + issueNumber + '/events', {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Get epics for a repository
 * This method returns an array of the repository's epics
 * @param int   repoId      github id of repository
 * @callback    complete
 * @memberof    ZenHub
 * @method      getEpics
 */
ZenHub.prototype.getEpics = function (repoId, callback) {
    this._get('repositories/' + repoId + '/epics', {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Show epic information
 * This method returns all data related to an epic
 * @param int   repoId      github id of repository
 * @param int   epicId      github id of issue marked as an epic
 * @callback    complete
 * @memberof    ZenHub
 * @method      getEpicData
 */
ZenHub.prototype.getEpicData = function (repoId, epicId, callback) {
    this._get('repositories/' + repoId + '/epics/' + epicId, {}, function(error, body) {
        callback(error, body);
    });
};
