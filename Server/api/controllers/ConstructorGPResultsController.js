/**
 * ConstructorGPResultsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 var pullConstructorData = async function(constructorRef) {
   var constructor = await Constructors.findOne({
     where: {constructorRef: constructorRef}
   });

   return constructor;
 }

 var pullPreviousRaces = async function(selectedGrandPrix) {
   var previousRaces = await Races.find({
     where: {name: selectedGrandPrix},
     select: ['raceId', 'year']
   });
   return previousRaces;
 }

 var pullBestFastestLapHistory = async function(previousRaces, selectedConstructor) {
   var previousRaceIds = _.map(previousRaces, 'raceId');

   var firstConstructorResults = await Results.find({
     where: {raceId: previousRaceIds, constructorId: selectedConstructor},
     select: ['raceId', 'fastestLapTime']
   });

   var quickestTimesConstructor = [];
   const resultByRace = _.groupBy(firstConstructorResults,'raceId');
   _.forOwn(resultByRace, function(value, key) {
     if(value.length == 1) {
       quickestTimesConstructor.push(value[0]);
     }
     else if(value[0].fastestLapTime != null && (value[0].fastestLapTime < value[1].fastestLapTime || value[1].fastestLapTime == null)) {
       quickestTimesConstructor.push(value[0]);
     }
     else if (value[1].fastestLapTime != null) {
       quickestTimesConstructor.push(value[1]);
     }
   });

   _.map(quickestTimesConstructor, function(result) {
       return _.assign(result, _.find(previousRaces, {raceId: result.raceId}));
   });

   quickestTimesConstructor = _.sortBy(quickestTimesConstructor, result => result.year)

   return quickestTimesConstructor;
 }

 var pullBestStartHistory = async function(previousRaces, selectedConstructor) {
   var previousRaceIds = _.map(previousRaces, 'raceId');

   var firstConstructorResults = await Results.find({
     where: {raceId: previousRaceIds, constructorId: selectedConstructor},
     select: ['raceId', 'grid']
   });

   var bestGridConstructor = [];
   const resultByRace = _.groupBy(firstConstructorResults,'raceId');
   _.forOwn(resultByRace, function(value, key) {
     if(value.length == 1) {
       bestGridConstructor.push(value[0]);
     }
     else if(value[0].grid != null && (value[0].grid < value[1].grid || value[1].grid == null)) {
       bestGridConstructor.push(value[0]);
     }
     else if (value[1].grid != null) {
       bestGridConstructor.push(value[1]);
     }
   });

   _.map(bestGridConstructor, function(result) {
       return _.assign(result, _.find(previousRaces, {raceId: result.raceId}));
   });

   bestGridConstructor = _.sortBy(bestGridConstructor, result => result.year)

   return bestGridConstructor;
 }

 var pullBestFinishHistory = async function(previousRaces, selectedConstructor) {
   var previousRaceIds = _.map(previousRaces, 'raceId');

   var firstConstructorResults = await Results.find({
     where: {raceId: previousRaceIds, constructorId: selectedConstructor},
     select: ['raceId', 'positionOrder']
   });

   var bestFinishConstructor = [];
   const resultByRace = _.groupBy(firstConstructorResults,'raceId');
   _.forOwn(resultByRace, function(value, key) {
     if(value.length == 1) {
       bestFinishConstructor.push(value[0]);
     }
     else if(value[0].positionOrder < value[1].positionOrder) {
       bestFinishConstructor.push(value[0]);
     }
     else if (value[1].positionOrder != null) {
       bestFinishConstructor.push(value[1]);
     }
   });

   _.map(bestFinishConstructor, function(result) {
       return _.assign(result, _.find(previousRaces, {raceId: result.raceId}));
   });

   bestFinishConstructor = _.sortBy(bestFinishConstructor, result => result.year)

   return bestFinishConstructor;
 }

 var mergeData = function(firstConstructorData, secondConstructorData, value) {

   if(firstConstructorData.length < secondConstructorData.length) {

     _.forEach(firstConstructorData, function(data) {
       data.firstConstructor = data[value];
       delete data[value];
       delete data.resultId;
       delete data.raceId;
     });

     _.forEach(secondConstructorData, function(data) {
       data.firstConstructor = null;
       data.secondConstructor = data[value];
       delete data[value];
       delete data.resultId;
       delete data.raceId;
     });

     _.map(secondConstructorData, function(result) {
         return _.assign(result, _.find(firstConstructorData, {year: result.year}));
     });
     var result = secondConstructorData;
     return result;
   }
   else {

     _.forEach(firstConstructorData, function(data) {
         data.firstConstructor = data[value];
         data.secondConstructor = null;
         delete data[value];
         delete data.resultId;
         delete data.raceId;
       }
     );

     _.forEach(secondConstructorData, function(data) {
       data.secondConstructor = data[value];
       delete data[value];
       delete data.resultId;
       delete data.raceId;
     });

     _.map(firstConstructorData, function(result) {
         return _.assign(result, _.find(secondConstructorData, {year: result.year}));
     });
     var result = firstConstructorData;
     return result;
   }

 }



module.exports = {

  getBestFinishHistory: async function(req, res) {
    var selectedGrandPrix = req.param('grandPrix');
    var firstConstructor = req.param('firstConstructor');
    var secondConstructor = req.param('secondConstructor');

    if(!selectedGrandPrix) {
      res.badRequest("Please specify a grand prix!");
    }

    if(!firstConstructor) {
      res.badRequest("Please specify firstConstructor!");
    }

    if(!secondConstructor) {
      res.badRequest("Please specify secondConstructor!");
    }

    firstConstructor = await pullConstructorData(firstConstructor);

    secondConstructor = await pullConstructorData(secondConstructor);

    if(!firstConstructor) {
      return res.badRequest("Please enter a valid firstConstructor!");
    }

    if(!secondConstructor) {
      return res.badRequest("Please enter a valid secondConstructor!");
    }

    var previousRaces = await pullPreviousRaces(selectedGrandPrix);

    var bestFinishConstructor1 = await pullBestFinishHistory(previousRaces, firstConstructor.constructorId);

    var bestFinishConstructor2 = await pullBestFinishHistory(previousRaces, secondConstructor.constructorId);

    var result = await mergeData(bestFinishConstructor1, bestFinishConstructor2, 'positionOrder');

    var dataInfo = {
      firstKey: firstConstructor.name,
      secondKey: secondConstructor.name,
      dataOption: 'Finish',
      dataType: 'Constructor'
    };

    return res.json({dataInfo, result});
  },

  getBestStartHistory: async function(req, res) {
    var selectedGrandPrix = req.param('grandPrix');
    var firstConstructor = req.param('firstConstructor');
    var secondConstructor = req.param('secondConstructor');

    if(!selectedGrandPrix) {
      res.badRequest("Please specify a grand prix!");
    }

    if(!firstConstructor) {
      res.badRequest("Please specify firstConstructor!");
    }

    if(!secondConstructor) {
      res.badRequest("Please specify secondConstructor!");
    }

    firstConstructor = await pullConstructorData(firstConstructor);

    secondConstructor = await pullConstructorData(secondConstructor);

    if(!firstConstructor) {
      return res.badRequest("Please enter a valid firstConstructor!");
    }

    if(!secondConstructor) {
      return res.badRequest("Please enter a valid secondConstructor!");
    }


    var previousRaces = await pullPreviousRaces(selectedGrandPrix);

    var bestGridConstructor1 = await pullBestStartHistory(previousRaces, firstConstructor.constructorId);

    var bestGridConstructor2 = await pullBestStartHistory(previousRaces, secondConstructor.constructorId);

    var result = await mergeData(bestGridConstructor1, bestGridConstructor2, 'grid');

    var dataInfo = {
      firstKey: firstConstructor.name,
      secondKey: secondConstructor.name,
      dataOption: 'Start',
      dataType: 'Constructor'
    };

    return res.json({dataInfo, result});
  },

  getBestFastestLapHistory: async function(req, res) {
    var selectedGrandPrix = req.param('grandPrix');
    var firstConstructor = req.param('firstConstructor');
    var secondConstructor = req.param('secondConstructor');

    if(!selectedGrandPrix) {
      res.badRequest("Please specify a grand prix!");
    }

    if(!firstConstructor) {
      res.badRequest("Please specify firstConstructor!");
    }

    if(!secondConstructor) {
      res.badRequest("Please specify secondConstructor!");
    }

    firstConstructor = await pullConstructorData(firstConstructor);

    secondConstructor = await pullConstructorData(secondConstructor);

    if(!firstConstructor) {
      return res.badRequest("Please enter a valid firstConstructor!");
    }

    if(!secondConstructor) {
      return res.badRequest("Please enter a valid secondConstructor!");
    }

    var previousRaces = await pullPreviousRaces(selectedGrandPrix);

    var quickestTimesConstructor1 = await pullBestFastestLapHistory(previousRaces, firstConstructor.constructorId);

    var quickestTimesConstructor2 = await pullBestFastestLapHistory(previousRaces, secondConstructor.constructorId);

    var result = await mergeData(quickestTimesConstructor1, quickestTimesConstructor2, 'fastestLapTime');

    var dataInfo = {
      firstKey: firstConstructor.name,
      secondKey: secondConstructor.name,
      dataOption: 'fastestLapTime',
      dataType: 'Constructor'
    };

    return res.json({dataInfo, result});
  }
};
