"use strict";

var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var metadata = require("metalsmith-metadata");
var watch = require("metalsmith-watch");
var serve = require("metalsmith-serve");
var browserify = require("metalsmith-browserify");
var less = require("metalsmith-less");
var fingerprint = require("metalsmith-fingerprint");
var ignore = require("metalsmith-ignore");

var FeedParser = require("feedparser");
var request = require("request");

var path = require("path");

// all retrieved posts from the feed
var retrievedPosts = {
  // in the order they came in
  all: [],
  // indexed by the GUID (probably unique URL)
  byguid: {}
};


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

var addRetrievedPosts = function (files, metalsmith, done) {
  for (var filePath in files) {
    files[filePath].retrievedPosts = retrievedPosts;
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

var parseMonlamFeedItem = function (originalItem) {
  var enhancedItem = originalItem;

  if (originalItem) {

    //console.log("originalItem[\"rss:p\"]");
    //console.log(originalItem["rss:p"]);
    //console.log(originalItem["rss:p"][0]["a"]["img"]["@"]);
    //console.log(originalItem["rss:p"][1]["#"]);

    //console.log(originalItem.guid);

    enhancedItem.img = originalItem["rss:p"][0]["a"]["img"]["@"];
    enhancedItem.title = originalItem["rss:title"]["#"];
  }

  //console.log("enhancedItem");
  //console.log(enhancedItem);

  return enhancedItem;

};

/**
 *  Call this to begin to retrieve the monlam feed.
 *
 *  @param  {Function}  retrieveOrParserDone - This gets called when the
 *  retrieve is finished, because it failed or finished parsing successfully.
 **/
var retrieveMonlamTagFeed = function (retrieveOrParserDone) {
  var url = "http://kagyuoffice.org/tag/kagyu-monlam/feed",
    req,
    parser;

  req = request(url);
  parser = new FeedParser();

  req.on('error', retrieveOrParserDone);
  req.on('response', function(res) {
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    //var charset = getParams(res.headers['content-type'] || '').charset;
    //res = maybeTranslate(res, charset);
    // And boom goes the dynamite
    res.pipe(parser);
  });

  parser.on('error', retrieveOrParserDone);
  parser.on('end', retrieveOrParserDone);
  parser.on('readable', function() {
    var post;
    while (post = parseMonlamFeedItem(this.read())) {
      retrievedPosts.all.push(post);
      retrievedPosts.byguid[post.guid] = post;
    }
  });
};

var cssBuildFilePath = 'styles/index.css';
var jsBuildFilePath = 'build.js';

/**
 *  Make special variables available to templates.
 **/
var addEnvironmentVariables = function(files, metalsmith, done) {
  for (var filePath in files) {
    files[filePath].NODE_ENV = process.env.NODE_ENV;
    files[filePath].cssBuildFilePath = cssBuildFilePath;
    files[filePath].jsBuildFilePath = jsBuildFilePath;
  }
  done();
};



var builder = Metalsmith(__dirname)
  .ignore(["*.js", "*.swp"])
  .use(metadata({
    navigation: "navigation.yaml",
  }))
  .use(markdown())
  .use(addEnvironmentVariables)
  .use(addPath)
  .use(addCurrentNav)
  .use(addRetrievedPosts);


let lessOptions = {
  pattern: "styles/index.less",
  // options for less compiler
  render: {
    paths: "src/styles/"
  }
};

// in development mode, build less source maps
if (process.env.NODE_ENV == "development") {
  lessOptions.useDynamicSourceMap = true;
}

// less build
builder.use(less(lessOptions));
// js build
builder.use(browserify(jsBuildFilePath, [
  'src/index.js'
]));

// in production mode
if (process.env.NODE_ENV != "development") {

  // fingerprint css and js build files
  builder.use(fingerprint({
    pattern: cssBuildFilePath
  }))
  .use(fingerprint({
    pattern: jsBuildFilePath
  }));
  
  // remove intermediate files
  builder.use(ignore({
    patterns: [
      // less build files
      "**/*.less",
      // css build file without fingerprint
      cssBuildFilePath,
      // js build file without fingerprint
      jsBuildFilePath
    ]
  }));

}

builder.use(layouts({
  engine: "nunjucks",
  directory: "layouts",
  settings: {
    views: 'layouts'
  }
}));

if (process.env.NODE_ENV && process.env.NODE_ENV == "development") {
  // watch files for changes
  builder.use(watch({
    paths: {
      //"${source}/**/*": true,
      "layouts/**/*": "**/*.md",
      "${source}/styles/**/*": "**/*.less",
      "${source}/**/*.md": true,
      "${source}/index.js": true
    },
    livereload: true
  }));

  builder.use(serve({
    host: "0.0.0.0"
  }));
};

//console.log("Retrieving monlam feed...");
//retrieveMonlamTagFeed(function (err) {

  //if (err) {
    //console.log(err.stack);
    //throw err;
  //} else {
    //console.log("Building site...");
    //builder.build(function (err) {
      //if (err) {
        //console.log(err.stack);
        //throw err;
      //} else {
        //console.log("Build complete!");
      //}
    //});
  //}
//});

console.log("Building site...");
builder.build(function (err) {
  if (err) {
    console.log(err.stack);
    throw err;
  } else {
    console.log("Build complete!");
  }
});
