/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    /*
    JSON Body {
      "username" : "uday.sahni@mail.mcgillddafafaa.ca",
      "password" : "testtteawpoalkaskpm",
      "firstFavouriteDriver" : "max_verstappen",
      "secondFavouriteDriver" : "ricciardo",
      "favouriteConstructor" : "force_india"
    }
    */
    signup: async function(req, res) {
      var user = req.body;
      if(user.username == '') {
        return res.badRequest("Please enter a username!");
      }
      if(user.password == '') {
        return res.badRequest("Please enter a password!");
      }
      if(user.firstFavouriteDriver == '') {
        return res.badRequest("Please enter your favourite driver!");
      }
      if(user.secondFavouriteDriver == '') {
        return res.badRequest("Please enter your second favourite driver!");
      }
      if(user.favouriteConstructor == '') {
        return res.badRequest("Please enter your favourite constructor!");
      }

      var firstFavouriteDriver = await Drivers.findOne({
        where: {driverRef: user.firstFavouriteDriver}
      });
      var secondFavouriteDriver = await Drivers.findOne({
        where : {driverRef: user.secondFavouriteDriver}
      });
      var favouriteConstructor = await Constructors.findOne({
        where : {constructorRef : user.favouriteConstructor}
      });

      if(!firstFavouriteDriver) {
        return res.badRequest("Please enter a valid favourite driver!");
      }
      if(!secondFavouriteDriver) {
        return res.badRequest("Please enter a valid second favourite driver!");
      }
      if(!favouriteConstructor) {
        return res.badRequest("Please enter a valid favourite constructor!");
      }

      user.firstFavouriteDriver = firstFavouriteDriver.driverId;
      user.secondFavouriteDriver = secondFavouriteDriver.driverId;
      user.favouriteConstructor = favouriteConstructor.constructorId;

      User.create(user).fetch().exec(function(err, userData){
        if(err) {
          if(err.code == 'E_UNIQUE') {
            return res.badRequest('The username is already in use!');
          }
          return res.badRequest(err);
        }
        const token = jwt.sign(userData.toJSON(), 'decamcgilltoken');
        return res.json({token});
      });
    },

    /*
    JSON Body {
      "username" : "uday.sahni@mail.mcgillddafafaa.ca",
      "password" : "testtteawpoalkaskpm",
    }
    */
    login: function(req, res) {
        passport.authenticate('local', {session: false}, async function(err, user, info) {
            if ((err) || (!user)) {
              return res.badRequest("Your login attempt was unsuccesful. Please make sure you are using the correct credentials or register for an account!");
            }
            req.logIn(user, {session: false}, function(err) {
                if (err) res.badRequest(err);
            });
            var userData = await User.find({
              where: {username: user.username}
            });
            userData = userData[0].toJSON();
            const token = jwt.sign(userData, 'decamcgilltoken');
            return res.json({token});
        })(req, res);
    }
};
