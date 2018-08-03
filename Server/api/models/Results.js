/**
 * Results.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'resultId',

  attributes: {
    resultId: {
      type: 'number',
      required: true,
      unique: true
    },
    raceId: {
      model: 'Races'
    },
    driverId: {
      model: 'Drivers'
    },
    constructorId: {
      model: 'Constructors'
    },
    number: {
      type: 'number'
    },
    grid: {
      type: 'string'
    },
    position: {
      type: 'ref'
    },
    positionText: {
      type: 'string'
    },
    positionOrder: {
      type: 'number'
    },
    points: {
      type: 'number'
    },
    laps: {
      type: 'number'
    },
    time: {
      type: 'ref'
    },
    milliseconds: {
      type: 'ref'
    },
    fastestLap: {
      type: 'ref'
    },
    rank: {
      type: 'ref'
    },
    fastestLapTime: {
      type: 'ref'
    },
    fastestLapSpeed: {
      type: 'ref'
    },
    statusId: {
      type: 'number'
    }
  }
};
