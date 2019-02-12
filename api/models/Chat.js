/**
 * Chat.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    message: {
      type: 'string',
    },
    from: {
      type: 'string',
      required: true
    },
    to: {
      type: 'string',
      required: true,
    },

  },

};

