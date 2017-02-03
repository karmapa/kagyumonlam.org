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
