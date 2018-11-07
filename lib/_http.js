var extend = require('xtend');
var request = require('request');
var querystring = require('querystring');

var API_URL = 'https://api.zenhub.io/p1';

var Http = function(credentials) {
    this.credentials = credentials;
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
    var postURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

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
Http.prototype._put = function(url, parameters, body, callback) {
    parameters = extend(parameters, this.credentials); // Add credentials to parameters
    var putURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

    request.put({
        url: putURL,
        strictSSL: true,
        json: true,
        body: body,
    }, function(error, response, body) {
        callback(error, body || {});
    });
};

module.exports = Http;
