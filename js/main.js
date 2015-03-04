/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var timer = null, banner_index = 0;
  var body_overflow = $('body').css('overflow');
  var $pop_up = $('.pop_up');
  var product_index = 0;
  var headerHeight = 180;

  $(window).bind ('scroll', function (e) {
    $('#parallax-bg').css ('top', (0 - ($(window).scrollTop () * 0.35)) + 'px');
  });

  $(window).resize (function () {
    var move = function (i) {
      var w = $('body > .container').width ();
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
    };
    var loop = function () {
      clearTimeout (timer);
      move (banner_index++);
      timer = setTimeout (loop, 3000);
    };
    loop ();
  }).resize ();

  $('.service .icon').mouseover (function () {
    $(this).addClass ('show').siblings ().removeClass ('show');
    $('.service .info_container').text ($(this).data ('info'));
  });
  var pop_up = function (action) {
    if ((action == 'show') && !$($pop_up).is (':visible')) {
      $('body').css('overflow', 'hidden');
      $pop_up.css ({'width': '100%', 'height': 'calc(100% - ' + headerHeight + 'px)'}).fadeIn ();
    } else if ((action == 'hide')) {
      $('body').css('overflow', body_overflow);
      $pop_up.fadeOut ();
    }
  };

  $('.people .button').click (function () {
    $pop_up.find ('.container').empty ().append ($(_.template ($('#_people_more').html (), {}) ({})));
    pop_up ('show');
  });

  $('.product .more').click (function () {
    product_index = 0;
    $pop_up.find ('.container').empty ().append ($(_.template ($('#_product_more').html (), {}) ({})));
    pop_up ('show');
  });

  $('.pop_up .close img').click (function () {
    pop_up ('hide');
  });

  var set_arrow = function () {
    if ((product_index + 1) >= $('.product_more .banners img').length) $('.product_more .arrow_r img').addClass ('disable');
    else $('.product_more .arrow_r img').removeClass ('disable');
    if (product_index < 1) $('.product_more .arrow_l img').addClass ('disable');
    else $('.product_more .arrow_l img').removeClass ('disable');
  };

  $('body').on ('click', '.arrow_r img', function () {
    product_index = ++product_index < $('.product_more .banners img').length ? product_index : $('.product_more .banners img').length - 1;

    $('.product_more .banners img').map (function (j, t) {
      $(this).css ({'left': (j - product_index) * $(this).width () + 'px'});
    });
    set_arrow ();
  });

  $('body').on ('click', '.people_more .button', function () {
    pop_up ('hide');
    setTimeout (function () {
      $("html, body").stop ().animate ({ scrollTop: $('.block.contact').offset ().top - headerHeight }, 1000);
    }, 500);
  });

  $('body').on ('click', '.arrow_l img', function () {
    product_index = --product_index < 0 ? 0 : product_index;

    $('.product_more .banners img').map (function (j, t) {
      $(this).css ({'left': (j - product_index) * $(this).width () + 'px'});
    });
    set_arrow ();
  });

  $('.contact form').submit (function () {
    $('.contact input, .contact textarea').val ('');
    alert ('您的意見我們已經收到，將盡快與您聯繫。');
    return false;
  });

  $('.menu .item').click (function () {
    $("html, body").stop ().animate ({ scrollTop: $('.block.' + $(this).data ('go')).offset ().top - headerHeight }, 1000);
    // console.error ($(this).data ('go'));
  });
});