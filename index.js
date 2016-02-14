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
};

/**
 *  Add `currentNavigation` to point to the top-level navigation item for
 *  rendering sub-navigation on a page.  This depends on the `addPath` plugin
 *  above.
 **/
var addCurrentNav = function(files, metalsmith, done) {
  var navigation = metalsmith.metadata().navigation;

  var pagePath;
  var topLevelPagePath;
  var navItem;
  for (var filePath in files) {
    pagePath = files[filePath].path;
    topLevelPagePath = pagePath.split("/")[1];

    // find item in navigation metadata
    for (var navItemIndex in navigation) {
      navItem = navigation[navItemIndex];

      if (navItem.url.match(topLevelPagePath)) {
        //console.log(`Matched page '${pagePath}' with nav url '${navItem.url}'`);
        files[filePath].currentNavigation = navItem;
        break;
      }
    }

  }
  done();
};

Metalsmith(__dirname)
  .ignore(["*.js", "*.less", "*.swp"])
  .use(metadata({
    navigation: "navigation.yaml"
  }))
  .use(markdown())
  .use(addPath)
  .use(addCurrentNav)
  .use(layouts("swig"))
  .build(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Build complete!");
    }
  });
