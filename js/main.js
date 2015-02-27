/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  function parallaxScroll () {
    var scrolled = $(window).scrollTop ();
    $('#parallax-bg').css ('top', (0 - (scrolled * 0.25)) + 'px');
  }

  $(window).bind ('scroll', function (e) {
    parallaxScroll ();
  });
});