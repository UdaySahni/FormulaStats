/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getUserData: async function(req, res) {
    var userData = await User.findOne({
      where: {username: req.user.username}
    }).populate('firstFavouriteDriver').populate('secondFavouriteDriver').populate('favouriteConstructor');

    return res.json({userData});
  },

  updateUserPreferences: async function(req, res) {
    var updatedUserData = req.body;
    var userData = await User.findOne({
      where: {username: req.user.username}
    }).populate('firstFavouriteDriver').populate('secondFavouriteDriver').populate('favouriteConstructor');

    var updated = false;

    var toUpdate = {};

    if(updatedUserData.firstFavouriteDriver && updatedUserData.firstFavouriteDriver != userData.firstFavouriteDriver.driverRef) {
      var driver = await Drivers.findOne({
        where: {driverRef: updatedUserData.firstFavouriteDriver}
      });
      if(!driver) {
        return res.badRequest("Please enter a valid favourite driver!");
      }
      toUpdate.firstFavouriteDriver = driver.driverId;
      updated = true;
    }

    if(updatedUserData.secondFavouriteDriver && updatedUserData.secondFavouriteDriver != userData.secondFavouriteDriver.driverRef) {
      var driver = await Drivers.findOne({
        where: {driverRef: updatedUserData.secondFavouriteDriver}
      });
      if(!driver) {
        return res.badRequest("Please enter a valid second favourite driver!");
      }
      toUpdate.secondFavouriteDriver = driver.driverId;
      updated = true;
    }

    if(updatedUserData.favouriteConstructor && updatedUserData.favouriteConstructor != userData.favouriteConstructor.constructorRef) {
      var constructor = await Constructors.findOne({
        where : {constructorRef : updatedUserData.favouriteConstructor}
      });
      if(!constructor) {
        return res.badRequest("Please enter a valid favourite constructor!");
      }
      toUpdate.favouriteConstructor = constructor.constructorId;
      updated = true;
    }

    if(updated) {
      await User.update({
        where: {username: req.user.username}
      }).set(toUpdate).fetch();

      var userData = await User.findOne({
        where: {username: req.user.username}
      }).populate('firstFavouriteDriver').populate('secondFavouriteDriver').populate('favouriteConstructor');
    }
    return res.json({userData});
  }

};
