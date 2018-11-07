var Issues = function (_http) {
    this._http = _http;
};

/**
 * Show issue information
 * This method returns all issue information
 * @param int   repoId      github id of repository
 * @param int   issueNumber github id of issue
 * @callback    complete
 * @memberof    Issues
 * @method      getIssue
 */
Issues.prototype.getIssueData = function (repoId, issueNumber, callback) {
    this._http._get('repositories/' + repoId + '/issues/' + issueNumber, {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Show issue Events
 * This method returns all issue events
 * @param int   repoId      github id of repository
 * @param int   issueNumber github id of issue
 * @callback    complete
 * @memberof    Issues
 * @method      getIssueEvents
 */
Issues.prototype.getIssueEvents = function (repoId, issueNumber, callback) {
    this._http._get('repositories/' + repoId + '/issues/' + issueNumber + '/events', {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Set estimate in issue
 * This method set estimate for an issue on Issues.
 * @param int   repoId      github id of repository
 * @param int   issueId      github id of issue to convert
 * @param object    payload      contains estimate to set for the issue, see https://github.com/IssuesIO/API#set-estimate-for-issue for payload format
 * @callback    complete
 * @memberof    Issues
 * @method      setEstimateForIssue
 */
Issues.prototype.setEstimateForIssue = function (repoId, issueId, payload, callback) {
    this._http._put('repositories/' + repoId + '/issues/' + issueId + '/estimate', {}, payload, function (error, body) {
        callback(error, body);
    });
};

module.exports = Issues;