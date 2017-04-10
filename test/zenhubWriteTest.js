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
            api.addRemoveIssuesToEpic(repoId, epicId, payload, done);
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
            api.convertIssueToEpic(repoId, issueId, payload, done);
       });
    });
});
