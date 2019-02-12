/**
 * Taste.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    lookingFor: {
      type: 'json',
      required: true,
      columnType: 'array'
    },
    preferences: {
      type: 'json',
      required: true,
    },
    personality: {
      type: 'json',
      required: true,
      columnType: 'array'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    lookingForGender: {
      type: 'string',
      required: true,
    }
  },

};

