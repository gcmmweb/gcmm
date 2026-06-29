"use strict";
$ = jQuery.noConflict();
$(document).ready(function () {
  // Read More
  $(".fc__read-more").each(function () {
    $(this).on("click", function () {
      var id = $(this).attr("href");
      $(this).text($(id).hasClass("show") ? "Read More" : "Read Less");
    });
  });
});
$(document).on("sf:ajaxstart", ".searchandfilter", function () {
  setTimeout(function () {
    equalHeight();
  }, 501);
  setTimeout(function () {
    equalHeight();
  }, 1001);
});
$(window)
  .on("load", function () {
    equalHeight();
  })
  .resize(function () {
    setTimeout(function () {
      equalHeight();
    }, 501);
    setTimeout(function () {
      equalHeight();
    }, 1001);
  });

function equalHeight() {
  var maxheight = 0;
  $(".eqaul-height-one").css("height", "");
  $(".eqaul-height-one").each(function () {
    maxheight =
      $(this).outerHeight(true) > maxheight
        ? $(this).outerHeight(true)
        : maxheight;
  });
  $(".eqaul-height-one").height(maxheight);
  var maxheight1 = 0;
  $(".eqaul-height-two").css("height", "");
  $(".eqaul-height-two").each(function () {
    maxheight1 =
      $(this).outerHeight(true) > maxheight1
        ? $(this).outerHeight(true)
        : maxheight1;
  });
  $(".eqaul-height-two").height(maxheight1);
  var maxheight2 = 0;
  $(".eqaul-height-three").css("height", "");
  $(".eqaul-height-three").each(function () {
    maxheight2 =
      $(this).outerHeight(true) > maxheight2
        ? $(this).outerHeight(true)
        : maxheight2;
  });
  $(".eqaul-height-three").height(maxheight2);

  var maxheight3 = 0;
  $(".our-programs-main").css("height", "");
  $(".our-programs-main").each(function () {
    maxheight3 =
      $(this).outerHeight(true) > maxheight3
        ? $(this).outerHeight(true)
        : maxheight3;
  });
  $(".our-programs-main").height(maxheight3);

  var maxheight4 = 0;
  $(".eqaul-height-four").css("height", "");
  $(".eqaul-height-four").each(function () {
    maxheight4 =
      $(this).outerHeight(true) > maxheight4
        ? $(this).outerHeight(true)
        : maxheight4;
  });
  $(".eqaul-height-four").height(maxheight4);

  var maxheight5 = 0;
  $(".our-story-eq-height").css("height", "");
  $(".our-story-eq-height").each(function () {
    maxheight5 =
      $(this).outerHeight(true) > maxheight5
        ? $(this).outerHeight(true)
        : maxheight5;
  });
  $(".our-story-eq-height").height(maxheight5);
}
$(document).ready(function () {
  $(".quote-section-slider").slick({
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    autoplay: true,
    adaptiveHeight: false,
  });
  $(".our-story-slider").slick({
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    autoplay: false,
    adaptiveHeight: false,
  });
  //	accodian js start
  $("#horizontalTab").easyResponsiveTabs({
    type: "default", //Types: default, vertical, accordion
    width: "auto", //auto or any width like 600px
    fit: true, // 100% fit in a container
    css3animation: "animated fadeInLeft",
    removeHashfrmUrl: true,
    closed: "accordion", // Start closed if in accordion view
    activate: function (event) {
      // Callback function if tab is switched
    },
  });

  // scroll up js animation start here
  (function ($) {
    $.fn.isOnScreen = function (test) {
      var height = this.outerHeight();
      var width = this.outerWidth();
      if (!width || !height) {
        return false;
      }
      var win = $(window);
      var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft(),
      };
      viewport.right = viewport.left + win.outerWidth();
      viewport.bottom = viewport.top + win.outerHeight() / 1.1;
      var bounds = this.offset();
      bounds.right = bounds.left + width;
      bounds.bottom = bounds.top + height;
      var deltas = {
        top: viewport.bottom - bounds.top,
        left: viewport.right - bounds.left,
        bottom: bounds.bottom - viewport.top,
        right: bounds.right - viewport.left,
      };
      if (typeof test == "function") {
        return test.call(this, deltas);
      }
      return (
        deltas.top > 0 &&
        deltas.left > 0 &&
        deltas.right > 0 &&
        deltas.bottom > 0
      );
    };
  })(jQuery);

  $(window).scroll(function () {
    $(".animation-box").each(function () {
      if ($(this).isOnScreen()) {
        $(this).addClass("onView");
        var _child = $(this).find(".animation");
        if (_child.length) {
          $(function () {
            var el = _child;
            var index = 0;
            var timer = window.setInterval(function () {
              if (index < el.length) {
                el.eq(index++).addClass("onView");
              } else {
                window.clearInterval(timer);
              }
            }, 300);
          });
        }
      }
    });
  });

  $(".animation-box").each(function () {
    if ($(this).isOnScreen()) {
      $(this).addClass("onView");
      var _child = $(this).find(".animation");
      if (_child.length) {
        $(function () {
          var el = _child;
          var index = 0;
          var timer = window.setInterval(function () {
            if (index < el.length) {
              el.eq(index++).addClass("onView");
            } else {
              window.clearInterval(timer);
            }
          }, 300);
        });
      }
    }
  });

  function pCreateAccordion() {
    if ($(".our-story-slider").hasClass("slick-initialized")) {
      $(".our-story-slider").slick("unslick");
    }

    $(".our-story-slider-desc h3").each(function () {
      if (this.scrollHeight <= 50) {
        $(this).parent().css("max-height", "82px");
      } else {
        $(this).parent().css("max-height", "105px");
      }
    });

    if ($(".our-story-slider-desc.active").length) {
      $(".our-story-slider-desc.active").each(function () {
        var height = this.scrollHeight + 30;
        $(this).css("max-height", height + "px");
      });
    }

    $(".our-story-btn-mbl")
      .off()
      .on("click", function () {
        $(this).siblings(".our-story-slider-desc").toggleClass("active");
        $(this).toggleClass("active");
        $(".our-story-slider-desc h3").each(function () {
          if (this.scrollHeight <= 50) {
            $(this).parent().css("max-height", "82px");
          } else {
            $(this).parent().css("max-height", "105px");
          }
        });
        if ($(".our-story-slider-desc.active").length) {
          $(".our-story-slider-desc.active").each(function () {
            var height = this.scrollHeight + 30;
            $(this).css("max-height", height + "px");
          });
        }
      });
  }
  if ($(window).width() < 992) {
    pCreateAccordion();
  }
  $(window).on("resize", function () {
    if ($(window).width() < 992) {
      pCreateAccordion();
    } else {
      if ($(".our-story-slider").hasClass("slick-initialized")) {
        $(".our-story-slider").slick({
          dots: true,
          infinite: true,
          speed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: false,
          autoplay: false,
          adaptiveHeight: false,
        });
      } else {
        $(".our-story-slider").not(".slick-initialized").slick({
          dots: true,
          infinite: true,
          speed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: false,
          autoplay: false,
          adaptiveHeight: false,
        });
      }
    }
  });
});


//	clone js start
	var flag;
	$(window).resize(menu_content);

	function menu_content() {
		if (window.innerWidth <= 991 && (typeof flag == "undefined" || flag)) {
			flag = false;
			$(".navbar-toggler").prepend("<div class='content'></div>");
			$(".donate-btn").prependTo(".content");
		}
		else if (window.innerWidth > 991 && (typeof flag == "undefined" || !flag)) {
			flag = true;
			$(".content .donate-btn").appendTo(".navbar-nav");
			$(".content").remove();
		}
	}
	menu_content();

$(function() {
  $('.ways-make-impact-block a').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var distancetocover = Math.abs($(document).scrollTop() - target.offset().top);
        var minTimeToScroll = 500, maxTimeToScroll = 1500;
        var timetoscroll = (distancetocover / 5);
        timetoscroll = timetoscroll < minTimeToScroll ? minTimeToScroll: timetoscroll;
        timetoscroll = timetoscroll > maxTimeToScroll ? maxTimeToScroll : timetoscroll;
        $('html,body').animate({
          scrollTop: target.offset().top
        }, timetoscroll); 
        return false;
      }
    }
  });
});