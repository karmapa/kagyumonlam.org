/**
 *  @file       builder.js
 *
 *  @desc       Entry point into the static website builder.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 the kagyumonlam.org project contributors.
 *  @license    Licensed under the MIT license.
 **/

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

var add_path = require("./lib/add_path.js");
var add_current_nav = require("./lib/add_current_nav.js");
var add_environment_variables = require("./lib/add_environment_variables.js");

var environmentVars = {
  NODE_ENV: process.env.NODE_ENV,
  cssBuildFilePath: 'styles/index.css',
  jsBuildFilePath: 'build.js'
};

var builder = Metalsmith(__dirname)
  .ignore(["*.js", "*.swp"])
  .source("./source")
  .use(metadata({
    navigation: "navigation.yaml",
  }))
  .use(markdown())
  .use(add_environment_variables(environmentVars))
  .use(add_path)
  .use(add_current_nav);

let lessOptions = {
  pattern: "styles/index.less",
  // options for less compiler
  render: {
    paths: "source/styles/"
  }
};

// in development mode, build less source maps
if (process.env.NODE_ENV == "development") {
  lessOptions.useDynamicSourceMap = true;
}

// less build
builder.use(less(lessOptions));
// js build
builder.use(browserify(environmentVars.jsBuildFilePath, [
  'source/index.js'
]));

// in production mode
if (process.env.NODE_ENV != "development") {

  // fingerprint css and js build files
  builder.use(fingerprint({
    pattern: environmentVars.cssBuildFilePath
  }))
  .use(fingerprint({
    pattern: environmentVars.jsBuildFilePath
  }));
  
  // remove intermediate files
  builder.use(ignore({
    patterns: [
      // less build files
      "**/*.less",
      // css build file without fingerprint
      environmentVars.cssBuildFilePath,
      // js build file without fingerprint
      environmentVars.jsBuildFilePath
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

console.log("Building site...");
builder.build(function (err) {
  if (err) {
    console.log(err.stack);
    throw err;
  } else {
    console.log("Build complete!");
  }
});
