/**
 * @author Matteo Magni <matteo@magni.me> (magni.me)
 */

var fs = require('fs');
var path = require('path');

var config = JSON.parse(fs.readFileSync(path.normalize(__dirname + '/config.json', 'utf8')));

describe('ZenHub API', function() {
    var Zenhub = require('../lib/zenhub');
    var api = new Zenhub(config.token);

    describe('Board test', function() {
        it('should get board of repo', function(done) {
            api.getBoard(config.repoId, done);
        });
    });

    describe('Board issue test', function() {
        it('should get issue in a board of repo', function(done) {
            api.getIssue(config.repoId, config.issueId, done);
        });
    });

    describe('Board issue events test', function() {
        it('should get issue events in a board of repo', function(done) {
            api.getIssueEvents(config.repoId, config.issueId, done);
        });
    });

    describe('Board epics test', function() {
        it('should get all epics in a board of repo', function(done) {
            api.getEpics(config.repoId, done);
        });
        it('should get all data for an epic', function(done) {
            var self = this;
            api.getEpics(config.repoId, function(error, response) {
                if (response.epic_issues.length === 0) {
                    return self.skip();
                }
                api.getEpicData(config.repoId, response.epic_issues[0].issue_number, done);
            });
        });
    });

});
