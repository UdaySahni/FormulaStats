var request = require('request-promise');
var common = require('../common/common.js');
var users = require('../common/users.js');

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJUZXN0VXNlciIsImZpcnN0RmF2b3VyaXRlRHJpdmVyIjo4MzAsInNlY29uZEZhdm91cml0ZURyaXZlciI6ODE3LCJmYXZvdXJpdGVDb25zdHJ1Y3RvciI6OSwiaWF0IjoxNTMzMjU3OTQxfQ.IFfmTce-oDXYTzzAOXY-S_pxV-GHhkJAGWDFgQuc5lY';
var invalidToken = 'fapjfpoa';


var collectionEndpoint = 'races/currentRace';

describe('test current race', () => {

  test('should reject without authentication', () => {
    return request.get(
      common.request(collectionEndpoint, invalidToken)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(403);
      expect(err.message).toMatch("You are not authenticated. Please login or sign up!");
    });
  });

  test('should return current race', () => {
    return request.get(
      common.request(collectionEndpoint, token)
    ).then(function(response) {
      var parsedJSON = JSON.parse(response);
      expect(parsedJSON.currentRace.Circuit).toHaveProperty("circuitName");
      expect(parsedJSON.currentRace).toHaveProperty("raceName");
      expect(parsedJSON.userData).toHaveProperty("firstFavouriteDriver");
      expect(parsedJSON.userData).toHaveProperty("secondFavouriteDriver");
      expect(parsedJSON).toHaveProperty("firstDriverResults");
      expect(parsedJSON).toHaveProperty("secondDriverResults");
      expect(parsedJSON.firstDriverResults.length).toBeGreaterThan(0);
      expect(parsedJSON.secondDriverResults.length).toBeGreaterThan(0);
    });
  });
});
