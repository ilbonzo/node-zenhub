var extend = require('xtend');
var request = require('request');
var querystring = require('querystring');
// Default zenhub API endpoint
var API_URL = 'https://api.zenhub.io/p1';

var Http = function(credentials, zenhub_api_url) {

    this.credentials = credentials;
    // Use user's custom endpoint or zenhub's cloud. Common use is zenhub for enterprise
    this.api_url = zenhub_api_url || API_URL;
};
/**
 * Helper to handle requests to the API with authorization
 *
 * @private
 * @param string    url             address part after API root
 * @param object    parameters      additional parameters
 * @callback        complete
 * @memberof        Http
 * @method          _get
 */
Http.prototype._get = function(url, parameters, callback) {
    parameters = extend(parameters, this.credentials); // Add credentials to parameters
    var getURL = this.api_url + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

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
 * Helper to handle POST requests to the API with authorization
 *
 * @private
 * @param string    url             address part after API root
 * @param object    parameters      additional parameters
 * @param object    body            request body
 * @callback        complete
 * @memberof        Http
 * @method          _post
 */
Http.prototype._post = function(url, parameters, body, callback) {
    parameters = extend(parameters, this.credentials); // Add credentials to parameters
    var postURL = this.api_url + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

    request.post({
        url: postURL,
        strictSSL: true,
        json: true,
        body: body,
    }, function(error, response, body) {
        callback(error, body || {});
    });
};

/**
 * Helper to handle PUT requests to the API with authorization
 *
 * @private
 * @param string    url             address part after API root
 * @param object    parameters      additional parameters
 * @param object    body            request body
 * @callback        complete
 * @memberof        Http
 * @method          _put
 */
Http.prototype._put = function (url, parameters, body, callback) {
    parameters = extend(parameters, this.credentials); // Add credentials to parameters
    var putURL = this.api_url + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

    request.put({
        url: putURL,
        strictSSL: true,
        json: true,
        body: body,
    }, function (error, response, body) {
        callback(error, body || {});
    });
};

module.exports = Http;
