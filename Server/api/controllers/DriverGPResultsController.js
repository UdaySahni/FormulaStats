/**
 * DriverGPResultsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var pullDriverData = async function(driverRef) {
  var driver = await Drivers.findOne({
    where: {driverRef: driverRef}
  });

  return driver;
}

 var pullPreviousRaces = async function(selectedGrandPrix) {
   var previousRaces = await Races.find({
     where: {name: selectedGrandPrix},
     select: ['raceId', 'year']
   });
   return previousRaces;
 }

 var pullDriverResults = async function(previousRaces, driverId, field) {
   var previousRaceIds = _.map(previousRaces, 'raceId');

   var driverResults;

   if (field === 'fastestLapTime') {
     driverResults = await Results.find({
       where: {raceId: previousRaceIds, driverId: driverId, fastestLapTime: { '!=': null}},
       select: ['raceId', field]
     });
   }
   else {
     driverResults = await Results.find({
       where: {raceId: previousRaceIds, driverId: driverId},
       select: ['raceId', field]
     });
   }

   _.map(driverResults, function(result) {
       return _.assign(result, _.find(previousRaces, {raceId: result.raceId}));
   });

   driverResults = _.sortBy(driverResults, result => result.year)

   return driverResults;
 }

 var mergeData = function(firstDriverData, secondDriverData, value) {
   if(firstDriverData.length < secondDriverData.length) {
     _.forEach(firstDriverData, function(data) {
       data.firstDriver = data[value];
       delete data[value];
       delete data.resultId;
       delete data.raceId;
     });

     _.forEach(secondDriverData, function(data) {
       data.firstDriver = null;
       data.secondDriver = data[value];
       delete data[value];
       delete data.resultId;
       delete data.raceId;
     });

     _.map(secondDriverData, function(result) {
         return _.assign(result, _.find(firstDriverData, {year: result.year}));
     });
     var result = secondDriverData;
     return result;
   }
   else {
     _.forEach(firstDriverData, function(data) {
         data.firstDriver = data[value];
         data.secondDriver = null;
         delete data[value];
         delete data.resultId;
         delete data.raceId;
       }
     );

     _.forEach(secondDriverData, function(data) {
       data.secondDriver = data[value];
       delete data[value];
       delete data.resultId;
       delete data.raceId;
     });

     _.map(firstDriverData, function(result) {
         return _.assign(result, _.find(secondDriverData, {year: result.year}));
     });
     var result = firstDriverData;
     return result;
   }

 }

module.exports = {


  /*
  {
    grandPrix: "",
    driver1: "",
    driver2: ""
  }
  */
  getFinishHistory : async function(req, res) {
      var selectedGrandPrix = req.param('grandPrix');
      var firstDriver = req.param('firstDriver');
      var secondDriver = req.param('secondDriver');

      if(!selectedGrandPrix) {
        res.badRequest("Please specify a grand prix!");
      }

      if(!firstDriver) {
        res.badRequest("Please specify firstDriver!");
      }

      if(!secondDriver) {
        res.badRequest("Please specify secondDriver!");
      }

      firstDriver = await pullDriverData(firstDriver);
      secondDriver = await pullDriverData(secondDriver);

      if(!firstDriver) {
        return res.badRequest("Please enter a valid firstDriver!");
      }

      if(!secondDriver) {
        return res.badRequest("Please enter a valid secondDriver!");
      }

      var previousRaces = await pullPreviousRaces(selectedGrandPrix);

      var firstDriverResults = await pullDriverResults(previousRaces, firstDriver.driverId, 'positionOrder');
      var secondDriverResults = await pullDriverResults(previousRaces, secondDriver.driverId, 'positionOrder');

      var result = await mergeData(firstDriverResults, secondDriverResults, 'positionOrder');

      var dataInfo = {
        firstKey: firstDriver.surname,
        secondKey: secondDriver.surname,
        dataOption: 'Finish',
        dataType: 'Driver'
      };

      return res.json({dataInfo, result});
  },

  getStartHistory : async function(req, res) {
      var selectedGrandPrix = req.param('grandPrix');
      var firstDriver = req.param('firstDriver');
      var secondDriver = req.param('secondDriver');

      if(!selectedGrandPrix) {
        res.badRequest("Please specify a grand prix!");
      }

      if(!firstDriver) {
        res.badRequest("Please specify firstDriver!");
      }

      if(!secondDriver) {
        res.badRequest("Please specify secondDriver!");
      }

      firstDriver = await pullDriverData(firstDriver);
      secondDriver = await pullDriverData(secondDriver);

      if(!firstDriver) {
        return res.badRequest("Please enter a valid firstDriver!");
      }

      if(!secondDriver) {
        return res.badRequest("Please enter a valid secondDriver!");
      }

      var previousRaces = await pullPreviousRaces(selectedGrandPrix);
      var firstDriverResults = await pullDriverResults(previousRaces, firstDriver.driverId, 'grid');
      var secondDriverResults = await pullDriverResults(previousRaces, secondDriver.driverId, 'grid');

      var result = await mergeData(firstDriverResults, secondDriverResults, 'grid');

      var dataInfo = {
        firstKey: firstDriver.surname,
        secondKey: secondDriver.surname,
        dataOption: 'Start',
        dataType: 'Driver'
      };

      return res.json({dataInfo, result});
  },

  getFastestLapHistory : async function(req, res) {
      var selectedGrandPrix = req.param('grandPrix');
      var firstDriver = req.param('firstDriver');
      var secondDriver = req.param('secondDriver');

      if(!selectedGrandPrix) {
        res.badRequest("Please specify a grand prix!");
      }

      if(!firstDriver) {
        res.badRequest("Please specify firstDriver!");
      }

      if(!secondDriver) {
        res.badRequest("Please specify secondDriver!");
      }

      firstDriver = await pullDriverData(firstDriver);
      secondDriver = await pullDriverData(secondDriver);

      if(!firstDriver) {
        return res.badRequest("Please enter a valid firstDriver!");
      }

      if(!secondDriver) {
        return res.badRequest("Please enter a valid secondDriver!");
      }

      var previousRaces = await pullPreviousRaces(selectedGrandPrix);
      var firstDriverResults = await pullDriverResults(previousRaces, firstDriver.driverId, 'fastestLapTime');
      var secondDriverResults = await pullDriverResults(previousRaces, secondDriver.driverId, 'fastestLapTime');

      var result = await mergeData(firstDriverResults, secondDriverResults, 'fastestLapTime');

      var dataInfo = {
        firstKey: firstDriver.surname,
        secondKey: secondDriver.surname,
        dataOption: 'fastestLapTime',
        dataType: 'Driver'
      };

      return res.json({dataInfo, result});
  }

};
