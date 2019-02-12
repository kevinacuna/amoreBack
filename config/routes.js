/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /testDB': 'UserController.loginTestDB',
  'POST /signup': 'UserController.signup',
  'POST /signupFoto': 'UserController.signupFoto',
  'POST /loginGoogle': 'UserController.loginGoogle',
  'POST /login': 'UserController.login',
  'POST /addInfoToUser': 'UserController.addInfoToUser',
  'POST /sendMessage': 'ChatController.sendMessage',
  'GET /getMessages' : 'ChatController.getMessages',
  'POST /joinChat' : 'ChatController.joinChat',
  'POST /addPreferences' : 'TasteController.addPreferences',
  'POST /addLookinFor' : 'TasteController.addLookinFor',
  'POST /updatePreferences' : 'TasteController.updatePreferences',
  'POST /updateLookingFor' : 'TasteController.updateLookingFor',
  'POST /getUserTastes' : 'TasteController.getUserTastes',
  'POST /addUserTastes' : 'TasteController.addUserTastes',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
