/**
 * CurrentRaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');
const currentRaceURL = 'http://ergast.com/api/f1/current/next.json';

module.exports = {

  getCurrentRace: async function(req, res) {
    var user = req.user;
    axios.get(currentRaceURL).then(async function (currentRaceResponse) {
      var currentRace = currentRaceResponse.data.MRData.RaceTable.Races[0];

      //Finds previous grand prix
      var previousRaces = await Races.find({
        where: {name: currentRace.raceName},
        select: ['raceId', 'year']
      });
      var previousRaceIds = _.map(previousRaces, 'raceId');


      //Finds favourite drivers result at this grand prix
      var firstDriverResults = await Results.find({
        where: {raceId: previousRaceIds, driverId: user.firstFavouriteDriver},
        select: ['raceId', 'grid', 'positionOrder', 'fastestLapTime']
      });

      _.map(firstDriverResults, function(result) {
          return _.assign(result, _.find(previousRaces, {raceId: result.raceId}));
      });

      firstDriverResults = _.sortBy(firstDriverResults, result => result.year)


      //Finds second favourite drivers result at this grand prix
      var secondDriverResults = await Results.find({
        where: {raceId: previousRaceIds, driverId: user.secondFavouriteDriver},
        select: ['raceId', 'grid', 'positionOrder', 'fastestLapTime']
      });

      _.map(secondDriverResults, function(result) {
          return _.assign(result, _.find(previousRaces, {raceId: result.raceId}));
      });

      secondDriverResults = _.sortBy(secondDriverResults, result => result.year)

      //Find favourite drivers' and constructor's name
      var favouriteDriverName = await Drivers.findOne({
        where: {driverId: user.firstFavouriteDriver},
        select: ['forename', 'surname']
      });
      var secondFavouriteDriverName = await Drivers.findOne({
        where: {driverId: user.secondFavouriteDriver},
        select: ['forename', 'surname']
      });

      favouriteDriverName = favouriteDriverName.forename + " " + favouriteDriverName.surname;
      secondFavouriteDriverName = secondFavouriteDriverName.forename + " " + secondFavouriteDriverName.surname;

      var userData = {
        firstFavouriteDriver: favouriteDriverName,
        secondFavouriteDriver: secondFavouriteDriverName,
      };

      return res.json({currentRace, userData, firstDriverResults, secondDriverResults});
    });

  },
};
