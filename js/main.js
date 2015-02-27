/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  $(window).bind ('scroll', function (e) {
    $('#parallax-bg').css ('top', (0 - ($(window).scrollTop () * 0.25)) + 'px');
  });


  // $(window).resize (function () {
  //     var move = function (i) {
  //         var w = $(window).width ();
  //         $('.units').css ({'width': w * $('.units .unit').length + 'px'});
  //         $('.units .unit').map (function (j, t) {
  //             $(this).css ({'left': (j - i) * w + 'px', 'width': w + 'px'});
  //         });
  //     }
  //     $('.point').click (function () {
  //         $(this).addClass ('now').siblings ().removeClass ('now');
  //         var i = $('.points_c .point').index ($(this));
  //         move (i);
  //     });

  //     var loop = function () {
  //         clearTimeout (timer);
  //         $('.points_c .point').eq (index).click ();
  //         index = ++index < $('.units .unit').length ? index : 0;
  //         timer = setTimeout (loop, 3000);
  //     }
  //     loop ();
  // }).resize ();
  var timer = null, banner_index = 0;
  $(window).resize (function () {
    var move = function (i) {
      var w = $(window).width ();
      var h = (w / 1200) * 572;
      $('.banners').css ({'width': w * $('.banners .banner').length + 'px', 'height': h + 'px'});
      if (i>1) {
        var $temp = $('.banners .banner').first ().clone ();
        $('.banners').append ($temp);
        $('.banners .banner').first ().remove ();
      }
      $('.banners .banner').map (function (j, t) {
        $(this).css ({'left': (j - (i>1 ? 1 : i)) * w + 'px', 'width': w + 'px'}).addClass ('show');
      });
    }
    var loop = function () {
      clearTimeout (timer);
      move (banner_index++);
      timer = setTimeout (loop, 3000);
    }
    loop ();
  }).resize ();

});