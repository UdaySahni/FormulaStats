module.exports = {
    request: request,
}

function request(endpoint, accessToken) {
  return {
    uri: 'http://localhost:1337/' + endpoint,
    auth: {
        'bearer': accessToken
    }
  };
}
