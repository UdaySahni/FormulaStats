/**
 * Constructors.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'constructorId',

  attributes: {
    constructorId: {
      type: 'number',
      required: true,
      unique: true
    },
    constructorRef: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    nationality: {
      type: 'string'
    },
    url : {
      type: 'string'
    }
  },

};
