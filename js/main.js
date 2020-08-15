/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46121102-10', 'auto');
ga('send', 'pageview');

ga('create', 'UA-61832444-1', 'auto', {'name': 'newTracker'});
ga('newTracker.send','pageview');


$(function () {
  var timer = null, banner_index = 0;
  var body_overflow = $('body').css('overflow');
  var $pop_up = $('.pop_up');
  var product_index = 0;
  var headerHeight = 130;
  var videos = [];

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
      timer = setTimeout (loop, 5000);
    };
    loop ();
  }).resize ();

  $('.service .icon').mouseover (function () {
    $(this).addClass ('show').siblings ().removeClass ('show');
    $('.service .info_container').text ($(this).data ('info'));
  });
  var pop_up = function (action, func) {
    if ((action == 'show') && !$pop_up.is (':visible')) {
      $('body').css('overflow', 'hidden');
      $pop_up.css ({'width': '100%', 'height': 'calc(100% - ' + headerHeight + 'px)'}).fadeIn ();
    } else if ((action == 'hide')) {
      $('body').css('overflow', body_overflow);
      $pop_up.fadeOut ();
    }
    func && setTimeout(_ => func(), 500)
  };

  $('.people .button').click (function () {
    $pop_up.find ('.container').empty ().append ($(_.template ($('#_people_more').html (), {}) ({})));
    pop_up ('show');
  });

  $('.product .more').click (function () {
    product_index = 0;
    
    var $content = $(_.template ($('#' + $(this).data ('name')).html (), {}) ({}))
    $pop_up.find ('.container').empty ().append ($content);
    var ga = $content.data('ga')
    ga === undefined || console.error('ga more', ga);

    pop_up ('show', _ => {
      var ga = $content.find('.item').eq(0).data('ga')
      ga === undefined || console.error('ga product', ga);

      $content.find('.video').each(function() {
        videos.push(new YT.Player($(this).get(0), {
          videoId: $(this).data('vid'), playerVars: { rel: 0, playsinline: 1, autoplay: false, disablekb: 0, showsearch: 0, showinfo: 0, controls: 0, iv_load_policy: 3 },
          events: {
            onStateChange: e => {
              var ga = $(this).data('ga')
              ga !== undefined && e.data == YT.PlayerState.PLAYING && console.error('ga product video playing', ga);
              ga !== undefined && e.data == YT.PlayerState.PAUSED && console.error('ga product video paused', ga);
            }
          }
        }))
      })
    });
  });

  $('.pop_up .close img').click (function () {
    pop_up ('hide', _ => {
      videos.forEach(t => t.pauseVideo())
      videos = []
    });
  });

  var set_arrow = function () {
    if ((product_index + 1) >= $('.product_more .banners .item').length)
      $('.product_more .arrow_r img').addClass ('disable');
    else
      $('.product_more .arrow_r img').removeClass ('disable');

    if (product_index < 1)
      $('.product_more .arrow_l img').addClass ('disable');
    else
      $('.product_more .arrow_l img').removeClass ('disable');
  };

  $('body').on ('click', '.arrow_r img', function () {
    if (++product_index >= $('.product_more .banners .item').length)
      return product_index = $('.product_more .banners .item').length - 1

    videos.forEach(t => t.pauseVideo())

    $('.product_more .banners .item').map (function (j, t) {
      var px = (j - product_index) * $(this).width ()
      $(this).css ({'left': px + 'px'});
      if (px == 0) {
        var ga = $(this).data('ga')
        ga === undefined || console.error('ga product', ga);
      }
    });
    set_arrow ();
  });

  $('body').on ('click', '.arrow_l img', function () {
    if (--product_index < 0) return product_index = 0

    videos.forEach(t => t.pauseVideo())

    $('.product_more .banners .item').map (function (j, t) {
      var px = (j - product_index) * $(this).width ()
      $(this).css ({'left': px + 'px'});
      if (px == 0) {
        var ga = $(this).data('ga')
        ga === undefined || console.error('ga product', ga);
      }
    });
    set_arrow ();
  });

  $('body').on ('click', '.people_more .button', function () {
    pop_up ('hide');
    setTimeout (function () {
      $("html, body").stop ().animate ({ scrollTop: $('.block.contact').offset ().top - headerHeight }, 1000);
    }, 500);
  });

  $('.contact form').submit (function () {
    $.ajax ({
      url: 'send.php',
      data: { name: $('#_name').val (), email: $('#_email').val (), comment: $('#_comment').val () },
      async: true, cache: false, dataType: 'json', type: 'POST',
      beforeSend: function () {}
    })
    .done (function (result) { })
    .fail (function (result) { })
    .complete (function (result) { });

    $('.contact input, .contact textarea').val ('');

    $pop_up.find ('.container').empty ().append ($(_.template ($('#_thanks').html (), {}) ({})));
    pop_up ('show');
    return false;
  });

    
  
  $('.menu .item').click (function () {
    if ($(this).data ('go'))
      $("html, body").stop ().animate ({ scrollTop: $('.block.' + $(this).data ('go')).offset ().top - headerHeight }, 1000);
  });

  var hash = window.location.hash.trim ().slice (1);
  if (hash.length) {
    if ($('.block.' + hash).length) {
      setTimeout (function () {
        $("html, body").stop ().animate ({ scrollTop: $('.block.' + hash).offset ().top - headerHeight }, 1000);
      }, 500);
    }
  }
  window.onhashchange = function () {
  };


  $('.process .line').css ({'top': $('.process .icons_container').offset ().top - $('.block.process').offset ().top + 78 + 'px'});

});

document.oncontextmenu = function () { return false; };
document.onselectstart = function () { return false; };
document.onmousedown = function (e) { if (e.button == 2) return false; };