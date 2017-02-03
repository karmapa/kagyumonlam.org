var path = require("path");

/**
 *  Add `path` metadata to each page, so the template can tell what page
 *  it is programatically.
 **/
var add_path = function(files, metalsmith, done) {
  var dirname;
  var basename;
  for (var filePath in files) {
    dirname = path.dirname(filePath);
    files[filePath].path = (dirname == ".") ? "/" : "/" + dirname;
  }
  done();
};

module.exports = add_path;
