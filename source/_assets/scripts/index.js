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

  var navigationElement = $('.row-offcanvas');

  var toggle_navigation = function (e) {
		navigationElement.toggleClass('active');
    e.stopPropagation();
  };

  var close_navigation_if_open = function (e) {
    if (navigationElement.hasClass('active')) {
      return toggle_navigation(e);
    }
  };

  // open navigation when button is clicked
	$('[data-toggle=offcanvas]').click(toggle_navigation);

  // close navigation when button is clicked
  $('button.navigation-close').click(toggle_navigation);

  // if header or body is clicked, close navigation
  $('div.navbar').click(close_navigation_if_open);
  $('div#main').click(close_navigation_if_open);
});
