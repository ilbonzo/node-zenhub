var extend = require('xtend');
var request = require('request');
var querystring = require('querystring');

var API_URL = 'https://api.ZenHub.io/p1';

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


