/**
 *  @file       index.js
 *
 *  @desc       Entry-point to client-side code, runs in the browser on
 *  page load.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @license    Licensed under the MIT license.
 **/

var $ = require("jquery");

// hack is required for bootstrap to use our jQuery.
window.jQuery = window.$ = $;
// include all of bootstrap's jQuery plugins
require("bootstrap");

// entry-point to our styles.
//require("../styles/index.less");



$(document).ready(function () {
  console.log("Hello!");
	$('[data-toggle=offcanvas]').click(function() {
		$('.row-offcanvas').toggleClass('active');
	});
});
