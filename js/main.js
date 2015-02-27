/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  $(window).bind ('scroll', function (e) {
    $('#parallax-bg').css ('top', (0 - ($(window).scrollTop () * 0.25)) + 'px');
  });
});