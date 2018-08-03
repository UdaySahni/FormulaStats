var request = require('request-promise');
var common = require('../common/common.js');
var users = require('../common/users.js');

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJUZXN0VXNlciIsImZpcnN0RmF2b3VyaXRlRHJpdmVyIjo4MzAsInNlY29uZEZhdm91cml0ZURyaXZlciI6ODE3LCJmYXZvdXJpdGVDb25zdHJ1Y3RvciI6OSwiaWF0IjoxNTMzMjU3OTQxfQ.IFfmTce-oDXYTzzAOXY-S_pxV-GHhkJAGWDFgQuc5lY';
var invalidToken = 'fapjfpoa';

var collectionEndpoint = 'user';

describe('test get user', () => {

  test('should reject without authentication', () => {
    return request.get(
      common.request(collectionEndpoint, invalidToken)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(403);
      expect(err.message).toMatch("You are not authenticated. Please login or sign up!");
    });
  });

  test('should return current user data', () => {
    return request.get(
      common.request(collectionEndpoint, token)
    ).then(function(response) {
      var parsedJSON = JSON.parse(response);
      expect(parsedJSON.userData).toHaveProperty("firstFavouriteDriver");
      expect(parsedJSON.userData.firstFavouriteDriver).toHaveProperty("driverRef");
      expect(parsedJSON.userData).toHaveProperty("secondFavouriteDriver");
      expect(parsedJSON.userData.secondFavouriteDriver).toHaveProperty("driverRef");
      expect(parsedJSON.userData).toHaveProperty("favouriteConstructor");
      expect(parsedJSON.userData.favouriteConstructor).toHaveProperty("constructorRef");
      expect(parsedJSON.userData.username).toBe('TestUser');
    });
  });
});
