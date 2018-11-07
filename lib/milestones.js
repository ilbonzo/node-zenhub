var Milestones = function (_http) {
    this._http = _http;
};


/**
 * Get milestone start Date
 * This method returns value of Milestone start date
 * @param int   epicId      github id of issue marked as an epic
 * @param int   milestoneNumber number of milestone
 * @callback    complete
 * @memberof    Milestone
 * @method      getMilestoneStartDate
 */
Milestones.prototype.getMilestoneStartDate = function (repoId, milestoneNumber, callback) {
    this._http._get('repositories/' + repoId + '/milestones/' + milestoneNumber + '/start_date', {}, function(error, body) {
        callback(error, body);
    });
};

/**
 * Set milestone start Date
 * This method returns value of Milestone start date
 * @param int   epicId      github id of issue marked as an epic
 * @param int   milestoneNumber number of milestone
 * @param object    payload      contains estimate to set for the issue, see https://github.com/ZenHubIO/API#set-milestone-start-date for payload format
 * @callback    complete
 * @memberof    Milestone
 * @method      getMilestoneStartDate
 */
Milestones.prototype.setMilestoneStartDate = function (repoId, milestoneNumber, payload, callback) {
    this._http._post('repositories/' + repoId + '/milestones/' + milestoneNumber + '/start_date', {}, payload, function(error, body) {
        callback(error, body);
    });
};

module.exports = Milestones;