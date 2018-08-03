/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  DriversController: {
    // Apply the 'isLoggedIn' policy to the 'update' action of 'UserController'
    find: true
  },

  '*': ['isAuthenticated'],

  AuthController: {
      '*': true
  }

};
