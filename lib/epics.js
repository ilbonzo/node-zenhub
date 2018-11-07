var Epics = function (_http) {
    this._http = _http;
};


/**
 * Get epics for a repository
 * This method returns an array of the repository's epics
 * @param int   repoId      github id of repository
 * @callback    complete
 * @memberof    Epics
 * @method      getEpics
 */
Epics.prototype.getEpics = function (repoId, callback) {
    this._http._get('repositories/' + repoId + '/epics', {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Show epic information
 * This method returns all data related to an epic
 * @param int   repoId      github id of repository
 * @param int   epicId      github id of issue marked as an epic
 * @callback    complete
 * @memberof    Epics
 * @method      getEpicData
 */
Epics.prototype.getEpicData = function (repoId, epicId, callback) {
    this._http._get('repositories/' + repoId + '/epics/' + epicId, {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Convert issue to an epic
 * This method converts an issue to an epic on Issues. A list of issues to move to the new epic may optionally be specified.
 * @param int   repoId      github id of repository
 * @param int   issueId      github id of issue to convert
 * @param object    payload      contains list of issues to move to the epic, see https://github.com/IssuesIO/API#convert-issue-to-epic for payload format
 * @callback    complete
 * @memberof    Epics
 * @method      convertIssueToEpic
 */
Epics.prototype.convertIssueToEpic = function (repoId, issueId, payload, callback) {
    this._http._post('repositories/' + repoId + '/issues/' + issueId + '/convert_to_epic', {}, payload, function (error, body) {
        callback(error, body);
    });
};

/**
 * Convert epic to an issue
 * This method converts an epic to an issue.
 * @param int   repoId      github id of repository
 * @param int   issueId      github id of issue to convert
 * @param object    payload      contains list of issues to move to the epic, see https://github.com/ZenHubIO/API#convert-an-epic-to-an-issue for payload format
 * @callback    complete
 * @memberof    Epics
 * @method      convertEpicToIssue
 */
Epics.prototype.convertEpicToIssue = function (repoId, epicId, payload, callback) {
    this._http._post('repositories/' + repoId + '/epics/' + epicId + '/convert_to_issue', {}, payload, function (error, body) {
        callback(error, body);
    });
};

/**
 * Add and/or remove issues to an epic
 * This method updates the Epics metadata for the epic
 * @param int   repoId      github id of repository
 * @param int   epicId      github id of issue marked as an epic
 * @param object    payload      instructions for which issues to move, see https://github.com/EpicsIO/API#add-or-remove-issues-to-epic for payload format
 * @callback    complete
 * @memberof    Epics
 * @method      addRemoveIssuesToEpic
 */
Epics.prototype.addRemoveIssuesToEpic = function (repoId, epicId, payload, callback) {
    this._http._post('repositories/' + repoId + '/epics/' + epicId + '/update_issues', {}, payload, function (error, body) {
        callback(error, body);
    });
};

module.exports = Epics;