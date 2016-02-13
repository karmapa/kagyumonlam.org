var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var metadata = require("metalsmith-metadata");
var path = require("metalsmith-path");

Metalsmith(__dirname)
  .ignore(["*.js", "*.less"])
  .use(path())
  .use(metadata({
    navigation: "navigation.yaml"
  }))
  .use(markdown())
  .use(layouts("swig"))
  .build(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Build complete!");
    }
  });
