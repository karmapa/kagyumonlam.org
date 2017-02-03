/**
 *  @file       add_environment_variables.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 the kagyumonlam.org project contributors.
 *  @license    Licensed under the MIT license.
 **/

/**
 *  Make special variables available to templates.
 **/
var add_environment_variables = function (environmentVars) {
  return function(files, metalsmith, done) {
    for (var filePath in files) {

      for (var varName in environmentVars) {
        files[filePath][varName] = environmentVars[varName];
      }
    }
    done();
  };
};
module.exports = add_environment_variables;
