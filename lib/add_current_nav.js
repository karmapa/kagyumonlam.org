/**
 *  Add `currentNavigation` to point to the top-level navigation item for
 *  rendering sub-navigation on a page.  This depends on the `add_path` plugin
 *  above.
 **/
var add_current_nav = function(files, metalsmith, done) {
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
module.exports = add_current_nav;
