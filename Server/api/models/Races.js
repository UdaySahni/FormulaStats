/**
 * Races.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'raceId',

  attributes: {
    raceId: {
      type: 'number',
      required: true,
      unique: true
    },
    year: {
      type: 'number'
    },
    round: {
      type: 'number'
    },
    circuitId: {
      type: 'number'
    },
    name: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    time: {
      type: 'ref'
    },
    url: {
      type: 'string'
    }
  }
};
