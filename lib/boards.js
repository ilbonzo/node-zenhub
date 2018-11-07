var Boards = function (_http) {
    this._http = _http;
};

/**
 * Show All Pipelines in a repo board
 * This method returns all pipelines in a repo board
 * @param int   repoId      github id of repository
 * @callback    complete
 * @memberof    Boards
 * @method      getBoard
 */
Boards.prototype.getBoard = function (repoId, callback) {
    this._http._get('repositories/' + repoId + '/board', {}, function(error, body) {
        callback(error, body.pipelines);
    });
};

module.exports = Boards;