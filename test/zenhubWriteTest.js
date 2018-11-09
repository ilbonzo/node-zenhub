var assert = require('assert');
var nock = require('nock');

var token = 'token';
var repoId = 9876;
var tokenQueryString = '?access_token=' + token;

describe('ZenHub Write API', function() {
    var Zenhub = require('../lib/zenhub');
    var api = new Zenhub(token);

    afterEach(function() {
        assert(nock.isDone(), 'not all expected HTTP requests were made');
    });

    describe('Issues test', function() {
        var issueId = 457;

        it('Set estimate for issue test', function(done) {
            var payload = {
                estimate: 8
            };
            nock('https://api.zenhub.io/p1')
                .put('/repositories/' + repoId + '/issues/' + issueId + '/estimate' + tokenQueryString, payload)
                .reply(200, { status: 'OK' });
            api.issues.setEstimateForIssue(repoId, issueId, payload, done);
        });

        it('Move issue between pipelines test', function(done) {
            var payload = {
                pipeline_id: '595d430add03f01d32460080',
                position: 1
            };
            nock('https://api.zenhub.io/p1')
                .post('/repositories/' + repoId + '/issues/' + issueId + '/moves' + tokenQueryString, payload)
                .reply(200, { status: 'OK' });
            api.issues.moveIssueBetweenPipelines(repoId, issueId, payload, done);
        });
    });
    
    describe('Add/remove issues to epic test', function() {
        var epicId = 123;

        it('should send payload to the ZenHub API', function(done) {
            var payload = {
                remove_issues: [
                    {
                        repo_id: repoId,
                        issue_number: 3
                    }
                ],
                add_issues: [
                    {
                        repo_id: repoId,
                        issue_number: 2
                    },
                    {
                        repo_id: repoId,
                        issue_number: 1
                    }
                ]
            };
            nock('https://api.zenhub.io/p1')
                .post('/repositories/' + repoId + '/epics/' + epicId + '/update_issues' + tokenQueryString, payload)
                .reply(200, { status: 'OK' });
            api.epics.addRemoveIssuesToEpic(repoId, epicId, payload, done);
        });
    });

    describe('Convert issue to epic test', function() {
        var issueId = 456;

        it('should send payload to the ZenHub API', function(done) {
            var payload = {
                issues: [
                    {
                        repo_id: 13550592,
                        issue_number: 3
                    },
                    {
                        repo_id: 13550592,
                        issue_number: 1
                    }
                ]
            };
            nock('https://api.zenhub.io/p1')
                .post('/repositories/' + repoId + '/issues/' + issueId + '/convert_to_epic' + tokenQueryString, payload)
                .reply(200, { status: 'OK' });
            api.epics.convertIssueToEpic(repoId, issueId, payload, done);
        });
    });

    describe('Convert epic to issue test', function() {
        var epicId = 456;

        it('should send payload to the ZenHub API', function(done) {
            var payload = {};
            nock('https://api.zenhub.io/p1')
                .post('/repositories/' + repoId + '/epics/' + epicId + '/convert_to_issue' + tokenQueryString, payload)
                .reply(200, { status: 'OK' });
            api.epics.convertEpicToIssue(repoId, epicId, payload, done);
        });
    });

    describe('Set start_date for milestone test', function() {
        var milestoneNumber = 457;

        it('should send payload to the ZenHub API', function(done) {
            var payload = {
                start_date: '2018-11-07T01:38:56.842Z'
            };
            nock('https://api.zenhub.io/p1')
                .post('/repositories/' + repoId + '/milestones/' + milestoneNumber + '/start_date' + tokenQueryString, payload)
                .reply(200, { status: 'OK' });
            api.milestones.setMilestoneStartDate(repoId, milestoneNumber, payload, done);
        });
    });
});

describe('ZenHub RealaseReports Write API', function() {
    var Zenhub = require('../lib/zenhub');
    var api = new Zenhub(token);

    describe('Repository Create a Release Report', function() {
        it('should create a release report', function(done) {
            var payload = {
                title: 'Mayonaise',
                description: 'Siamese Dream Song',
                start_date: '2018-11-07T01:38:56.842Z',
                desired_end_date: '2018-11-14T01:38:56.842Z',
                repositories: [
                    101231
                ]
            };
            nock('https://api.zenhub.io/p1')
                .post('/repositories/' + repoId + '/reports/release' + tokenQueryString, payload)
                .reply(200, { status: 'OK' });
            api.releaseReports.createReleaseReport(repoId,  payload, done);
        });
    });
});