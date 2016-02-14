var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var metadata = require("metalsmith-metadata");

var path = require("path");

/**
 *  Add `path` metadata to each page, so the template can tell what page
 *  it is programatically.
 **/
var addPath = function(files, metalsmith, done) {
  var dirname;
  var basename;
	for (var filePath in files) {
    dirname = path.dirname(filePath);
    files[filePath].path = (dirname == ".") ? "/" : "/" + dirname;
	}
	done();


    console.log("data");
    console.log(data);

		// add to path data for use in links in templates
		//data.path = '.' == path ? '' : path;
};

Metalsmith(__dirname)
  .ignore(["*.js", "*.less", "*.swp"])
  .use(metadata({
    navigation: "navigation.yaml"
  }))
  .use(markdown())
  .use(addPath)
  .use(layouts("swig"))
  .build(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Build complete!");
    }
  });
