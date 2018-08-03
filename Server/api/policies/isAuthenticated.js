var passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (error, user, info) {
    if (error) return res.serverError(error);
    if (!user)
      return res.status(403).json({
        message: "You are not authenticated. Please login or sign up!",
        user   : user
      });

    req.user = user;
    next();
  })(req, res);
};
