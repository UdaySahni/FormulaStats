var request = require('request-promise');
var common = require('../common/common.js');
var users = require('../common/users.js');

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJUZXN0VXNlciIsImZpcnN0RmF2b3VyaXRlRHJpdmVyIjo4MzAsInNlY29uZEZhdm91cml0ZURyaXZlciI6ODE3LCJmYXZvdXJpdGVDb25zdHJ1Y3RvciI6OSwiaWF0IjoxNTMzMjU3OTQxfQ.IFfmTce-oDXYTzzAOXY-S_pxV-GHhkJAGWDFgQuc5lY';
var invalidToken = 'fapjfpoa';

var finishEndpoint = 'constructors/BestFinishHistory';
var startEndpoint = 'constructors/BestStartHistory';
var fastestLapEndpoint = 'constructors/BestFastestLapHistory';

describe('test constructor finish endpoint', () => {
  test('should reject without authentication', () => {
    return request.get(
      common.request(finishEndpoint, invalidToken)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(403);
      expect(err.message).toMatch("You are not authenticated. Please login or sign up!");
    });
  });

  test('should reject with invalid first constructor', () => {
    return request.get(
      common.request(finishEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haa&secondConstructor=toro_rosso', token)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(400);
      expect(err.message).toMatch("Please enter a valid firstConstructor!");
    });
  });

  test('should reject with invalid second constructor', () => {
    return request.get(
      common.request(finishEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haas&secondConstructor=toro_ross', token)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(400);
      expect(err.message).toMatch("Please enter a valid secondConstructor!");
    });
  });

  test('should return best finish history', () => {
    return request.get(
      common.request(finishEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haas&secondConstructor=toro_rosso', token)
    ).then(function(response) {
      var parsedJSON = JSON.parse(response);
      expect(parsedJSON.dataInfo.firstKey).toBe("Haas F1 Team");
      expect(parsedJSON.dataInfo.secondKey).toBe("Toro Rosso");
      expect(parsedJSON.dataInfo.dataOption).toBe("Finish");
      expect(parsedJSON.dataInfo.dataType).toBe("Constructor");
      expect(parsedJSON.result.length).toBeGreaterThan(0);
      expect(parsedJSON.result[0]).toHaveProperty("year");
      expect(parsedJSON.result[0]).toHaveProperty("firstConstructor");
      expect(parsedJSON.result[0]).toHaveProperty("secondConstructor");
    });
  });
});

describe('test constructor start endpoint', () => {
  test('should reject without authentication', () => {
    return request.get(
      common.request(startEndpoint, invalidToken)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(403);
      expect(err.message).toMatch("You are not authenticated. Please login or sign up!");
    });
  });

  test('should reject with invalid first constructor', () => {
    return request.get(
      common.request(startEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haa&secondConstructor=toro_rosso', token)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(400);
      expect(err.message).toMatch("Please enter a valid firstConstructor!");
    });
  });

  test('should reject with invalid second constructor', () => {
    return request.get(
      common.request(startEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haas&secondConstructor=toro_ross', token)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(400);
      expect(err.message).toMatch("Please enter a valid secondConstructor!");
    });
  });

  test('should return best start history', () => {
    return request.get(
      common.request(startEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haas&secondConstructor=toro_rosso', token)
    ).then(function(response) {
      var parsedJSON = JSON.parse(response);
      expect(parsedJSON.dataInfo.firstKey).toBe("Haas F1 Team");
      expect(parsedJSON.dataInfo.secondKey).toBe("Toro Rosso");
      expect(parsedJSON.dataInfo.dataOption).toBe("Start");
      expect(parsedJSON.dataInfo.dataType).toBe("Constructor");
      expect(parsedJSON.result.length).toBeGreaterThan(0);
      expect(parsedJSON.result[0]).toHaveProperty("year");
      expect(parsedJSON.result[0]).toHaveProperty("firstConstructor");
      expect(parsedJSON.result[0]).toHaveProperty("secondConstructor");
    });
  });
});

describe('test constructor fastest lap endpoint', () => {
  test('should reject without authentication', () => {
    return request.get(
      common.request(fastestLapEndpoint, invalidToken)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(403);
      expect(err.message).toMatch("You are not authenticated. Please login or sign up!");
    });
  });

  test('should reject with invalid first constructor', () => {
    return request.get(
      common.request(fastestLapEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haa&secondConstructor=toro_rosso', token)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(400);
      expect(err.message).toMatch("Please enter a valid firstConstructor!");
    });
  });

  test('should reject with invalid second constructor', () => {
    return request.get(
      common.request(fastestLapEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haas&secondConstructor=toro_ross', token)
    ).catch(function(err) {
      expect(err.statusCode).toEqual(400);
      expect(err.message).toMatch("Please enter a valid secondConstructor!");
    });
  });

  test('should return best fastest lap history', () => {
    return request.get(
      common.request(fastestLapEndpoint + '?grandPrix=Monaco%20Grand%20Prix&firstConstructor=haas&secondConstructor=toro_rosso', token)
    ).then(function(response) {
      var parsedJSON = JSON.parse(response);
      expect(parsedJSON.dataInfo.firstKey).toBe("Haas F1 Team");
      expect(parsedJSON.dataInfo.secondKey).toBe("Toro Rosso");
      expect(parsedJSON.dataInfo.dataOption).toBe("fastestLapTime");
      expect(parsedJSON.dataInfo.dataType).toBe("Constructor");
      expect(parsedJSON.result.length).toBeGreaterThan(0);
      expect(parsedJSON.result[0]).toHaveProperty("year");
      expect(parsedJSON.result[0]).toHaveProperty("firstConstructor");
      expect(parsedJSON.result[0]).toHaveProperty("secondConstructor");
    });
  });
});
