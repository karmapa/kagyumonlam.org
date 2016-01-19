var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");

Metalsmith(__dirname)
  .use(markdown())
  .use(layouts("swig"))
  .build(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Build complete!");
    }
  });
