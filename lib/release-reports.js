var ReleaseReports = function (_http) {
    this._http = _http;
};

/**
 * Create a Release Report
 * @param int repoId github id of repository
 * @param object payload contains estimate to set for the issue, see https://github.com/ZenHubIO/API#create-a-release-report for payload format
 * @callback    complete
 * @memberof    ReleaseReports
 * @method      createReleaseReport
 */
ReleaseReports.prototype.createReleaseReport = function (repoId, payload, callback) {
    this._http._post('repositories/' + repoId + '/reports/releases', {}, payload, function(error, body) {
        callback(error, body);
    });
};

/**
 * Get a Release Report
 * @param int releaseId
 * @callback    complete
 * @memberof    ReleaseReports
 * @method      getReleaseReport
 */
ReleaseReports.prototype.getReleaseReport = function (releaseId, callback) {
    this._http._get('reports/release/' + releaseId, {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Get a Release Report
 * @param int repoId
 * @callback    complete
 * @memberof    ReleaseReports
 * @method      getReleaseReportsForRepository
 */
ReleaseReports.prototype.getReleaseReportsForRepository = function (repoId, callback) {
    this._http._get('repositories/' + repoId + '/reports/release', {}, function(error, body) {
        callback(error, body);
    });
};

module.exports = ReleaseReports;