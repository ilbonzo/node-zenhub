/**
 * @author Matteo Magni <matteo@magni.me> (magni.me)
 */

var fs = require('fs');
var path = require('path');

var config;

if (typeof process.env.TOKEN !== 'undefined') {
    config = {
        'token': process.env.TOKEN,
        'repoId': process.env.REPO_ID,
        'issueId': process.env.ISSUE_ID,
        'milestoneId': process.env.MILESTONE_ID,
    };
} else {
    config = JSON.parse(fs.readFileSync(path.normalize(__dirname + '/config.json', 'utf8')));
}

describe('ZenHub Issues Read API', function() {
    var Zenhub = require('../lib/zenhub');
    var api = new Zenhub(config.token);

    describe('get issue data test', function() {
        it('should get issue in a repo', function(done) {
            api.issues.getIssueData(config.repoId, config.issueId, done);
        });
    });

    describe('get issue events test', function() {
        it('should get issue events in a repo', function(done) {
            api.issues.getIssueEvents(config.repoId, config.issueId, done);
        });
    });
});

describe('ZenHub Boards Read API', function() {
    var Zenhub = require('../lib/zenhub');
    var api = new Zenhub(config.token);

    describe('Board test', function() {
        it('should get board of repo', function(done) {
            api.boards.getBoard(config.repoId, done);
        });
    });
});

describe('ZenHub Epics Read API', function() {
    var Zenhub = require('../lib/zenhub');
    var api = new Zenhub(config.token);

    describe('Repository epics test', function() {
        it('should get all epics in a repo', function(done) {
            api.epics.getEpics(config.repoId, done);
        });
        it('should get all data for an epic', function(done) {
            var self = this;
            api.epics.getEpics(config.repoId, function(error, response) {
                if (response.epic_issues.length === 0) {
                    return self.skip();
                }
                api.epics.getEpicData(config.repoId, response.epic_issues[0].issue_number, done);
            });
        });
    });
});

describe('ZenHub Milestones Read API', function() {
    var Zenhub = require('../lib/zenhub');
    var api = new Zenhub(config.token);

    describe('Repository Milestones test', function() {
        it('should get Milestone startDate', function(done) {
            api.milestones.getMilestoneStartDate(config.repoId, config.milestoneNumber, done);
        });
    });
});