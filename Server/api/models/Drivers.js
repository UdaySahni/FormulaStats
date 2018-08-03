/**
 * Drivers.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'driverId',

  attributes: {
    driverId: {
      type: 'number',
      required: true,
      unique: true
    },
    driverRef: {
      type: 'string'
    },
    number: {
      type: 'ref'
    },
    code: {
      type: 'ref'
    },
    forename: {
      type: 'string'
    },
    surname: {
      type: 'string'
    },
    dob: {
      type: 'string'
    },
    nationality: {
      type: 'string'
    },
    url: {
      type: 'string'
    }
  },

};
