function vc_js() {
    vc_toggleBehaviour(),
      vc_tabsBehaviour(),
      vc_accordionBehaviour(),
      vc_teaserGrid(),
      vc_carouselBehaviour(),
      vc_slidersBehaviour(),
      vc_prettyPhoto(),
      vc_googleplus(),
      vc_pinterest(),
      vc_progress_bar(),
      vc_plugin_flexslider(),
      vc_google_fonts(),
      vc_gridBehaviour(),
      vc_rowBehaviour(),
      vc_prepareHoverBox(),
      vc_googleMapsPointer(),
      vc_ttaActivation(),
      jQuery(document).trigger("vc_js"),
      window.setTimeout(vc_waypoints, 500)
  }
  document.documentElement.className += " js_active ",
    document.documentElement.className += "ontouchstart" in document.documentElement ? " vc_mobile " : " vc_desktop ",
    function () {
      for (var prefix = ["-webkit-", "-moz-", "-ms-", "-o-", ""], i = 0; i < prefix.length; i++)
        prefix[i] + "transform" in document.documentElement.style && (document.documentElement.className += " vc_transform ")
    }(),
    "function" != typeof window.vc_plugin_flexslider && (window.vc_plugin_flexslider = function ($parent) {
      ($parent ? $parent.find(".wpb_flexslider") : jQuery(".wpb_flexslider")).each(function () {
        var this_element = jQuery(this),
          sliderTimeout = 1e3 * parseInt(this_element.attr("data-interval")),
          sliderFx = this_element.attr("data-flex_fx"),
          slideshow = !0;
        0 === sliderTimeout && (slideshow = !1),
          this_element.is(":visible") && this_element.flexslider({
            animation: sliderFx,
            slideshow: slideshow,
            slideshowSpeed: sliderTimeout,
            sliderSpeed: 800,
            smoothHeight: !0
          })
      })
    }),
    "function" != typeof window.vc_googleplus && (window.vc_googleplus = function () {
      0 < jQuery(".wpb_googleplus").length && function () {
        var po = document.createElement("script");
        po.type = "text/javascript",
          po.async = !0,
          po.src = "https://apis.google.com/js/plusone.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(po, s)
      }()
    }),
    "function" != typeof window.vc_pinterest && (window.vc_pinterest = function () {
      0 < jQuery(".wpb_pinterest").length && function () {
        var po = document.createElement("script");
        po.type = "text/javascript",
          po.async = !0,
          po.src = "https://assets.pinterest.com/js/pinit.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(po, s)
      }()
    }),
    "function" != typeof window.vc_progress_bar && (window.vc_progress_bar = function () {
      void 0 !== jQuery.fn.waypoint && jQuery(".vc_progress_bar").waypoint(function () {
        jQuery(this).find(".vc_single_bar").each(function (index) {
          var bar = jQuery(this).find(".vc_bar"),
            val = bar.data("percentage-value");
          setTimeout(function () {
            bar.css({
              width: val + "%"
            })
          }, 200 * index)
        })
      }, {
        offset: "85%"
      })
    }),
    "function" != typeof window.vc_waypoints && (window.vc_waypoints = function () {
      void 0 !== jQuery.fn.vcwaypoint && jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function () {
        var $el = jQuery(this);
        $el.vcwaypoint(function () {
          $el.addClass("wpb_start_animation animated")
        }, {
          offset: "85%"
        })
      })
    }),
    "function" != typeof window.vc_toggleBehaviour && (window.vc_toggleBehaviour = function ($el) {
      function event(e) {
        e && e.preventDefault && e.preventDefault();
        var element = jQuery(this).closest(".vc_toggle"),
          content = element.find(".vc_toggle_content");
        element.hasClass("vc_toggle_active") ? content.slideUp({
          duration: 300,
          complete: function () {
            element.removeClass("vc_toggle_active")
          }
        }) : content.slideDown({
          duration: 300,
          complete: function () {
            element.addClass("vc_toggle_active")
          }
        })
      }
      $el ? $el.hasClass("vc_toggle_title") ? $el.unbind("click").click(event) : $el.find(".vc_toggle_title").unbind("click").click(event) : jQuery(".vc_toggle_title").unbind("click").on("click", event)
    }),
    "function" != typeof window.vc_tabsBehaviour && (window.vc_tabsBehaviour = function ($tab) {
      if (jQuery.ui) {
        var $call = $tab || jQuery(".wpb_tabs, .wpb_tour"),
          ver = jQuery.ui && jQuery.ui.version ? jQuery.ui.version.split(".") : "1.10",
          old_version = 1 === parseInt(ver[0]) && parseInt(ver[1]) < 9;
        $call.each(function (index) {
          var $tabs, interval = jQuery(this).attr("data-interval"),
            tabs_array = [];
          if ($tabs = jQuery(this).find(".wpb_tour_tabs_wrapper").tabs({
              show: function (event, ui) {
                wpb_prepare_tab_content(event, ui)
              },
              beforeActivate: function (event, ui) {
                1 !== ui.newPanel.index() && ui.newPanel.find(".vc_pie_chart:not(.vc_ready)")
              },
              activate: function (event, ui) {
                wpb_prepare_tab_content(event, ui)
              }
            }),
            interval && 0 < interval)
            try {
              $tabs.tabs("rotate", 1e3 * interval)
            } catch (e) {
              window.console && window.console.warn && console.warn(e)
            }
          jQuery(this).find(".wpb_tab").each(function () {
              tabs_array.push(this.id)
            }),
            jQuery(this).find(".wpb_tabs_nav li").click(function (e) {
              return e.preventDefault(),
                old_version ? $tabs.tabs("select", jQuery("a", this).attr("href")) : $tabs.tabs("option", "active", jQuery(this).index()),
                !1
            }),
            jQuery(this).find(".wpb_prev_slide a, .wpb_next_slide a").click(function (e) {
              if (e.preventDefault(),
                old_version) {
                var index = $tabs.tabs("option", "selected");
                jQuery(this).parent().hasClass("wpb_next_slide") ? index++ : index--,
                  index < 0 ? index = $tabs.tabs("length") - 1 : index >= $tabs.tabs("length") && (index = 0),
                  $tabs.tabs("select", index)
              } else {
                index = $tabs.tabs("option", "active");
                var length = $tabs.find(".wpb_tab").length;
                index = jQuery(this).parent().hasClass("wpb_next_slide") ? length <= index + 1 ? 0 : index + 1 : index - 1 < 0 ? length - 1 : index - 1,
                  $tabs.tabs("option", "active", index)
              }
            })
        })
      }
    }),
    "function" != typeof window.vc_accordionBehaviour && (window.vc_accordionBehaviour = function () {
      jQuery(".wpb_accordion").each(function (index) {
        var $tabs, $this = jQuery(this),
          active_tab = ($this.attr("data-interval"),
            !isNaN(jQuery(this).data("active-tab")) && 0 < parseInt($this.data("active-tab")) && parseInt($this.data("active-tab")) - 1),
          collapsible = !1 === active_tab || "yes" === $this.data("collapsible");
        $tabs = $this.find(".wpb_accordion_wrapper").accordion({
            header: "> div > h3",
            autoHeight: !1,
            heightStyle: "content",
            active: active_tab,
            collapsible: collapsible,
            navigation: !0,
            activate: vc_accordionActivate,
            change: function (event, ui) {
              void 0 !== jQuery.fn.isotope && ui.newContent.find(".isotope").isotope("layout"),
                vc_carouselBehaviour(ui.newPanel)
            }
          }),
          !0 === $this.data("vcDisableKeydown") && ($tabs.data("uiAccordion")._keydown = function () {})
      })
    }),
    "function" != typeof window.vc_teaserGrid && (window.vc_teaserGrid = function () {
      var layout_modes = {
        fitrows: "fitRows",
        masonry: "masonry"
      };
      jQuery(".wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)").each(function () {
        var $container = jQuery(this),
          $thumbs = $container.find(".wpb_thumbnails"),
          layout_mode = $thumbs.attr("data-layout-mode");
        $thumbs.isotope({
            itemSelector: ".isotope-item",
            layoutMode: void 0 === layout_modes[layout_mode] ? "fitRows" : layout_modes[layout_mode]
          }),
          $container.find(".categories_filter a").data("isotope", $thumbs).click(function (e) {
            e.preventDefault();
            var $thumbs = jQuery(this).data("isotope");
            jQuery(this).parent().parent().find(".active").removeClass("active"),
              jQuery(this).parent().addClass("active"),
              $thumbs.isotope({
                filter: jQuery(this).attr("data-filter")
              })
          }),
          jQuery(window).bind("load resize", function () {
            $thumbs.isotope("layout")
          })
      })
    }),
    "function" != typeof window.vc_carouselBehaviour && (window.vc_carouselBehaviour = function ($parent) {
      ($parent ? $parent.find(".wpb_carousel") : jQuery(".wpb_carousel")).each(function () {
        var $this = jQuery(this);
        if (!0 !== $this.data("carousel_enabled") && $this.is(":visible")) {
          $this.data("carousel_enabled", !0);
          getColumnsCount(jQuery(this));
          jQuery(this).hasClass("columns_count_1") && 900;
          var carousele_li = jQuery(this).find(".wpb_thumbnails-fluid li");
          carousele_li.css({
            "margin-right": carousele_li.css("margin-left"),
            "margin-left": 0
          });
          var fluid_ul = jQuery(this).find("ul.wpb_thumbnails-fluid");
          fluid_ul.width(fluid_ul.width() + 300),
            jQuery(window).resize(function () {
              screen_size != (screen_size = getSizeName()) && window.setTimeout("location.reload()", 20)
            })
        }
      })
    }),
    "function" != typeof window.vc_slidersBehaviour && (window.vc_slidersBehaviour = function () {
      jQuery(".wpb_gallery_slides").each(function (index) {
        var $imagesGrid, this_element = jQuery(this);
        if (this_element.hasClass("wpb_slider_nivo")) {
          var sliderTimeout = 1e3 * this_element.attr("data-interval");
          0 === sliderTimeout && (sliderTimeout = 9999999999),
            this_element.find(".nivoSlider").nivoSlider({
              effect: "boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse",
              slices: 15,
              boxCols: 8,
              boxRows: 4,
              animSpeed: 800,
              pauseTime: sliderTimeout,
              startSlide: 0,
              directionNav: !0,
              directionNavHide: !0,
              controlNav: !0,
              keyboardNav: !1,
              pauseOnHover: !0,
              manualAdvance: !1,
              prevText: "Prev",
              nextText: "Next"
            })
        } else
          this_element.hasClass("wpb_image_grid") && (jQuery.fn.imagesLoaded ? $imagesGrid = this_element.find(".wpb_image_grid_ul").imagesLoaded(function () {
            $imagesGrid.isotope({
              itemSelector: ".isotope-item",
              layoutMode: "fitRows"
            })
          }) : this_element.find(".wpb_image_grid_ul").isotope({
            itemSelector: ".isotope-item",
            layoutMode: "fitRows"
          }))
      })
    }),
    "function" != typeof window.vc_prettyPhoto && (window.vc_prettyPhoto = function () {
      try {
        jQuery && jQuery.fn && jQuery.fn.prettyPhoto && jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({
          animationSpeed: "normal",
          hook: "data-rel",
          padding: 15,
          opacity: .7,
          showTitle: !0,
          allowresize: !0,
          counter_separator_label: "/",
          hideflash: !1,
          deeplinking: !1,
          modal: !1,
          callback: function () {
            -1 < location.href.indexOf("#!prettyPhoto") && (location.hash = "")
          },
          social_tools: ""
        })
      } catch (err) {
        window.console && window.console.warn && console.warn(err)
      }
    }),
    "function" != typeof window.vc_google_fonts && (window.vc_google_fonts = function () {
      return !1
    }),
    window.vcParallaxSkroll = !1,
    "function" != typeof window.vc_rowBehaviour && (window.vc_rowBehaviour = function () {
      var vcSkrollrOptions, callSkrollInit, $ = window.jQuery;
  
      function fullWidthRow() {
        var $elements = $('[data-vc-full-width="true"]');
        $.each($elements, function (key, item) {
            var $el = $(this);
            $el.addClass("vc_hidden");
            var $el_full = $el.next(".vc_row-full-width");
            if ($el_full.length || ($el_full = $el.parent().next(".vc_row-full-width")),
              $el_full.length) {
              var el_body = parseInt($('#all').css('padding-left'), 10);
              if($('body').hasClass('header_type_side')) {
                var el_body = parseInt($('#all').css('padding-left'), 10);
              }
              var padding, paddingRight, el_margin_left = parseInt($el.css("margin-left"), 10) - el_body,
                el_margin_right = parseInt($el.css("margin-right"), 10) - el_body,
                offset = 0 - $el_full.offset().left - el_margin_left,
                width = $(window).width() - el_body;
  
              if($('body').hasClass('header_type_side')) {
                width = $(window).width() - el_body - parseInt($('#all').css('padding-right'), 10);
              }
              if ("rtl" === $el.css("direction") && (offset -= $el_full.width(),
                  offset += width,
                  offset += el_margin_left,
                  offset += el_margin_right),
                $el.css({
                  position: "relative",
                  left: offset,
                  "box-sizing": "border-box",
                  width: width
                }),
                !$el.data("vcStretchContent"))
                "rtl" === $el.css("direction") ? ((padding = offset) < 0 && (padding = 0),
                  (paddingRight = offset) < 0 && (paddingRight = 0)) : ((padding = -1 * offset) < 0 && (padding = 0),
                  (paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right) < 0 && (paddingRight = 0)),
                $el.css({
                  "padding-left": padding + "px",
                  "padding-right": paddingRight + "px"
                });
              $el.attr("data-vc-full-width-init", "true"),
                $el.removeClass("vc_hidden"),
                $(document).trigger("vc-full-width-row-single", {
                  el: $el,
                  offset: offset,
                  marginLeft: el_margin_left,
                  marginRight: el_margin_right,
                  elFull: $el_full,
                  width: width
                })
            }
          }),
          $(document).trigger("vc-full-width-row", $elements)
      }
  
      function fullHeightRow() {
        var coef = 0;
        if($('body').hasClass('header-on-side-type2')) {
          coef = 65;
        }
        var windowHeight, offsetTop, fullHeight, $element = $(".vc_row-o-full-height:first");
        $element.length && (windowHeight = $(window).height(),
          (offsetTop = $element.offset().top) < windowHeight && (fullHeight = 100 - (coef + offsetTop) / (windowHeight / 100),
            $element.css("min-height", fullHeight + "vh")));
        $(document).trigger("vc-full-height-row", $element)
      }
      $(window).off("resize.vcRowBehaviour").on("resize.vcRowBehaviour", fullWidthRow).on("resize.vcRowBehaviour", fullHeightRow),
        fullWidthRow(),
        fullHeightRow(),
        (0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv\:11\./)) && $(".vc_row-o-full-height").each(function () {
          "flex" === $(this).css("display") && $(this).wrap('<div class="vc_ie-flexbox-fixer"></div>')
        }),
        vc_initVideoBackgrounds(),
        callSkrollInit = !1,
        window.vcParallaxSkroll && window.vcParallaxSkroll.destroy(),
        $(".vc_parallax-inner").remove(),
        $("[data-5p-top-bottom]").removeAttr("data-5p-top-bottom data-30p-top-bottom"),
        $("[data-vc-parallax]").each(function () {
          var skrollrSize, skrollrStart, $parallaxElement, parallaxImage, youtubeId;
          callSkrollInit = !0,
            "on" === $(this).data("vcParallaxOFade") && $(this).children().attr("data-5p-top-bottom", "opacity:0;").attr("data-30p-top-bottom", "opacity:1;"),
            skrollrSize = 100 * $(this).data("vcParallax"),
            ($parallaxElement = $("<div />").addClass("vc_parallax-inner").appendTo($(this))).height(skrollrSize + "%"),
            (youtubeId = vcExtractYoutubeId(parallaxImage = $(this).data("vcParallaxImage"))) ? insertYoutubeVideoAsBackground($parallaxElement, youtubeId) : void 0 !== parallaxImage && $parallaxElement.css("background-image", "url(" + parallaxImage + ")"),
            skrollrStart = -(skrollrSize - 100),
            $parallaxElement.attr("data-bottom-top", "top: " + skrollrStart + "%;").attr("data-top-bottom", "top: 0%;")
        }),
        callSkrollInit && window.skrollr && (vcSkrollrOptions = {
            forceHeight: !1,
            smoothScrolling: !1,
            mobileCheck: function () {
              return !1
            }
          },
          window.vcParallaxSkroll = skrollr.init(vcSkrollrOptions),
          window.vcParallaxSkroll)
    }),
    "function" != typeof window.vc_gridBehaviour && (window.vc_gridBehaviour = function () {
      jQuery.fn.vcGrid && jQuery("[data-vc-grid]").vcGrid()
    }),
    "function" != typeof window.getColumnsCount && (window.getColumnsCount = function (el) {
      for (var find = !1, i = 1; !1 === find;) {
        if (el.hasClass("columns_count_" + i))
          return find = !0,
            i;
        i++
      }
    });
  var screen_size = getSizeName();
  
  function getSizeName() {
    var screen_w = jQuery(window).width();
    return 1170 < screen_w ? "desktop_wide" : 960 < screen_w && screen_w < 1169 ? "desktop" : 768 < screen_w && screen_w < 959 ? "tablet" : 300 < screen_w && screen_w < 767 ? "mobile" : screen_w < 300 ? "mobile_portrait" : ""
  }
  
  function loadScript(url, $obj, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript",
      script.readyState && (script.onreadystatechange = function () {
        "loaded" !== script.readyState && "complete" !== script.readyState || (script.onreadystatechange = null,
          callback())
      }),
      script.src = url,
      $obj.get(0).appendChild(script)
  }
  
  function vc_ttaActivation() {
    jQuery("[data-vc-accordion]").on("show.vc.accordion", function (e) {
      var $ = window.jQuery,
        ui = {};
      ui.newPanel = $(this).data("vc.accordion").getTarget(),
        window.wpb_prepare_tab_content(e, ui)
    })
  }
  
  function vc_accordionActivate(event, ui) {
    if (ui.newPanel.length && ui.newHeader.length) {
      var $pie_charts = ui.newPanel.find(".vc_pie_chart:not(.vc_ready)"),
        $round_charts = ui.newPanel.find(".vc_round-chart"),
        $line_charts = ui.newPanel.find(".vc_line-chart"),
        $carousel = ui.newPanel.find('[data-ride="vc_carousel"]');
      void 0 !== jQuery.fn.isotope && ui.newPanel.find(".isotope, .wpb_image_grid_ul").isotope("layout"),
        ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
          var grid = jQuery(this).data("vcGrid");
          grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
        }),
        vc_carouselBehaviour(ui.newPanel),
        vc_plugin_flexslider(ui.newPanel),
        $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat(),
        $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({
          reload: !1
        }),
        $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({
          reload: !1
        }),
        $carousel.length && jQuery.fn.carousel && $carousel.carousel("resizeAction"),
        ui.newPanel.parents(".isotope").length && ui.newPanel.parents(".isotope").each(function () {
          jQuery(this).isotope("layout")
        })
    }
  }
  
  function initVideoBackgrounds() {
    return window.console && window.console.warn && window.console.warn("this function is deprecated use vc_initVideoBackgrounds"),
      vc_initVideoBackgrounds()
  }
  
  function vc_initVideoBackgrounds() {
    jQuery("[data-vc-video-bg]").each(function () {
      var youtubeId, $element = jQuery(this);
      $element.data("vcVideoBg") ? ((youtubeId = vcExtractYoutubeId($element.data("vcVideoBg"))) && ($element.find(".vc_video-bg").remove(),
          insertYoutubeVideoAsBackground($element, youtubeId)),
        jQuery(window).on("grid:items:added", function (event, $grid) {
          $element.has($grid).length && vcResizeVideoBackground($element)
        })) : $element.find(".vc_video-bg").remove()
    })
  }
  
  function insertYoutubeVideoAsBackground($element, youtubeId, counter) {
    if ("undefined" == typeof YT || void 0 === YT.Player)
      return 100 < (counter = void 0 === counter ? 0 : counter) ? void console.warn("Too many attempts to load YouTube api") : void setTimeout(function () {
        insertYoutubeVideoAsBackground($element, youtubeId, counter++)
      }, 100);
    var $container = $element.prepend('<div class="vc_video-bg vc_hidden-xs"><div class="inner"></div></div>').find(".inner");
    new YT.Player($container[0], {
        width: "100%",
        height: "100%",
        videoId: youtubeId,
        playerVars: {
          playlist: youtubeId,
          iv_load_policy: 3,
          enablejsapi: 1,
          disablekb: 1,
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          wmode: "transparent"
        },
        events: {
          onReady: function (event) {
            event.target.mute().setLoop(!0)
          }
        }
      }),
      vcResizeVideoBackground($element),
      jQuery(window).bind("resize", function () {
        vcResizeVideoBackground($element)
      })
  }
  
  function vcResizeVideoBackground($element) {
    var iframeW, iframeH, marginLeft, marginTop, containerW = $element.innerWidth(),
      containerH = $element.innerHeight();
    containerW / containerH < 16 / 9 ? (iframeW = containerH * (16 / 9),
        iframeH = containerH,
        marginLeft = -Math.round((iframeW - containerW) / 2) + "px",
        marginTop = -Math.round((iframeH - containerH) / 2) + "px") : (iframeH = (iframeW = containerW) * (9 / 16),
        marginTop = -Math.round((iframeH - containerH) / 2) + "px",
        marginLeft = -Math.round((iframeW - containerW) / 2) + "px"),
      iframeW += "px",
      iframeH += "px",
      $element.find(".vc_video-bg iframe").css({
        maxWidth: "1000%",
        marginLeft: marginLeft,
        marginTop: marginTop,
        width: iframeW,
        height: iframeH
      })
  }
  
  function vcExtractYoutubeId(url) {
    if (void 0 === url)
      return !1;
    var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    return null !== id && id[1]
  }
  if ("function" != typeof window.wpb_prepare_tab_content && (window.wpb_prepare_tab_content = function (event, ui) {
      var $ui_panel, $google_maps, panel = ui.panel || ui.newPanel,
        $pie_charts = panel.find(".vc_pie_chart:not(.vc_ready)"),
        $round_charts = panel.find(".vc_round-chart"),
        $line_charts = panel.find(".vc_line-chart"),
        $carousel = panel.find('[data-ride="vc_carousel"]');
      if (vc_carouselBehaviour(),
        vc_plugin_flexslider(panel),
        ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
          var grid = jQuery(this).data("vcGrid");
          grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
        }),
        panel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && panel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
          var grid = jQuery(this).data("vcGrid");
          grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
        }),
        $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat(),
        $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({
          reload: !1
        }),
        $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({
          reload: !1
        }),
        $carousel.length && jQuery.fn.carousel && $carousel.carousel("resizeAction"),
        $ui_panel = panel.find(".isotope, .wpb_image_grid_ul"),
        $google_maps = panel.find(".wpb_gmaps_widget"),
        0 < $ui_panel.length && $ui_panel.isotope("layout"),
        $google_maps.length && !$google_maps.is(".map_ready")) {
        var $frame = $google_maps.find("iframe");
        $frame.attr("src", $frame.attr("src")),
          $google_maps.addClass("map_ready")
      }
      panel.parents(".isotope").length && panel.parents(".isotope").each(function () {
        jQuery(this).isotope("layout")
      })
    }),
    "function" != typeof window.vc_googleMapsPointer)
  
  function vc_googleMapsPointer() {
    var $ = window.jQuery,
      $wpbGmapsWidget = $(".wpb_gmaps_widget");
    $wpbGmapsWidget.click(function () {
        $("iframe", this).css("pointer-events", "auto")
      }),
      $wpbGmapsWidget.mouseleave(function () {
        $("iframe", this).css("pointer-events", "none")
      }),
      $(".wpb_gmaps_widget iframe").css("pointer-events", "none")
  }
  
  function vc_setHoverBoxPerspective(hoverBox) {
    hoverBox.each(function () {
      var $this = jQuery(this),
        perspective = 4 * $this.width() + "px";
      $this.css("perspective", perspective)
    })
  }
  
  function vc_setHoverBoxHeight(hoverBox) {
    hoverBox.each(function () {
      var $this = jQuery(this),
        hoverBoxInner = $this.find(".vc-hoverbox-inner");
      hoverBoxInner.css("min-height", 0);
      var frontHeight = $this.find(".vc-hoverbox-front-inner").outerHeight(),
        backHeight = $this.find(".vc-hoverbox-back-inner").outerHeight(),
        hoverBoxHeight = backHeight < frontHeight ? frontHeight : backHeight;
      hoverBoxHeight < 250 && (hoverBoxHeight = 250),
        hoverBoxInner.css("min-height", hoverBoxHeight + "px")
    })
  }
  
  function vc_prepareHoverBox() {
    var hoverBox = jQuery(".vc-hoverbox");
    vc_setHoverBoxHeight(hoverBox),
      vc_setHoverBoxPerspective(hoverBox)
  }
  jQuery(document).ready(vc_prepareHoverBox),
    jQuery(window).resize(vc_prepareHoverBox),
    jQuery(document).ready(function ($) {
      window.vc_js()
    });














    "use strict";jQuery(window).on('load',function(){jQuery(window).trigger('resize').trigger('scroll');var $preloader=jQuery('.preloader'),$spinner=$preloader.find('.spinner');$spinner.fadeOut();$preloader.delay(350).fadeOut('slow');jQuery('.owl-carousel').each(function(){jQuery(this).trigger('refresh.owl.carousel');});if(typeof skrollr!=="undefined"){skrollr.get().refresh();}});jQuery('.tabs-head').on('click','.item:not(.active-tab)',function(){jQuery(this).addClass('active-tab').siblings().removeClass('active-tab').parents('.tabs').find('.tabs-body .item').eq(jQuery(this).index()).fadeIn(150).siblings().hide();});function leadZero(n){return(n<10?'0':'')+n;}
    function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}
    return keys;}
    function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}
    return target;}
    function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}
    return obj;}
    function yprm_getCookie(name){var matches=document.cookie.match(new RegExp("(?:^|; )"+name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\$1')+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):undefined;}
    function yprm_setCookie(name,value){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};options=_objectSpread({path:'/'},options);if(options.expires instanceof Date){options.expires=options.expires.toUTCString();}
    var updatedCookie=encodeURIComponent(name)+"="+encodeURIComponent(value);for(var optionKey in options){updatedCookie+="; "+optionKey;var optionValue=options[optionKey];if(optionValue!==true){updatedCookie+="="+optionValue;}}
    document.cookie=updatedCookie;}
    if(yprm_getCookie('yprm_gdpr')=='true'){jQuery('.gdpr-modal-block').remove();}
    jQuery(document).ready(function(){jQuery('.tabs').each(function(){var item=jQuery(this).find('.tabs-body > .item'),tabs_head=jQuery(this).find('.tabs-head');item.each(function(){var name=jQuery(this).data('name');tabs_head.append('<div class="item">'+name+'</div>');});tabs_head.find('.item:first-of-type').addClass('active-tab');jQuery(this).find('.tabs-body > .item:first-of-type').css('display','block');});jQuery('.vertical-parallax-slider').each(function(){jQuery('body').addClass('body-one-screen');var this_el=jQuery(this),el=this_el.find('.item'),delay=800,dots=this_el.parent().find('.pagination-dots'),nav=this_el.parent().find('.nav-arrows'),status=false;el.each(function(){jQuery(this).css('z-index',parseInt(el.length-jQuery(this).index()));dots.append('<span></span>');});function vertical_parallax(coef,index){index=index===undefined?false:index;if(coef!=false){var index=this_el.find('.item.active').index()-coef;}
    el.eq(index).removeClass('prev next').addClass('active').siblings().removeClass('active');el.eq(index).prevAll().removeClass('next').addClass('prev');el.eq(index).nextAll().removeClass('prev').addClass('next');dots.find('span').eq(index).addClass('active').siblings().removeClass('active');}
    vertical_parallax(false,0);this_el.on('mousewheel wheel',function(e){if(jQuery(window).width()>992){e.preventDefault();var cur=this_el.find('.item.active').index();if(status!=true){status=true;if(e.originalEvent.deltaY>0&&cur!=parseInt(el.length-1)){vertical_parallax('-1');setTimeout(function(){status=false},delay);}else if(e.originalEvent.deltaY<0&&cur!=0){vertical_parallax('1');setTimeout(function(){status=false},delay);}else{status=false;}}}});dots.on('click','span:not(.active)',function(){jQuery(this).addClass('active').siblings().removeClass('active');vertical_parallax(false,jQuery(this).index());});nav.on('click','.prev',function(){var cur=this_el.find('.item.active').index();if(cur!=parseInt(el.length-1)){vertical_parallax('-1');}}).on('click','.next',function(){var cur=this_el.find('.item.active').index();if(cur!=0){vertical_parallax('1');}});});function equalHeight(group){if(jQuery(window).width()>'768'){var tallest=0;jQuery(group).each(function(){var thisHeight=jQuery(this).css('height',"").height();if(thisHeight>tallest){tallest=thisHeight;}});jQuery(group).height(tallest);}else{jQuery(group).height('auto');}}
    if(jQuery('.navigation > ul > li').length>7){jQuery('.navigation').addClass('min');}
    jQuery('.project-slider').each(function(){var head_slider=jQuery(this);if(head_slider.find('.item').length==1){head_slider.parent().removeClass('with-carousel-nav');}
    if(jQuery(this).find('.item').length>1){head_slider.addClass('owl-carousel').owlCarousel({items:1,nav:true,dots:false,autoplay:false,navClass:['owl-prev basic-ui-icon-left-arrow','owl-next basic-ui-icon-right-arrow'],navText:false,autoHeight:true,responsive:{0:{nav:false,},480:{},768:{nav:true,},},});var child_carousel=head_slider.next('.project-slider-carousel');var i=0;var flag=false;var c_items='4';if(head_slider.find('.owl-item:not(.cloned)').find('.item').length<4){c_items=head_slider.find('.owl-item:not(.cloned)').find('.item').length;}
    var child_carousel_c=child_carousel.addClass('owl-carousel').owlCarousel({items:1,nav:true,dots:false,autoplay:false,navClass:['owl-prev basic-ui-icon-left-arrow','owl-next basic-ui-icon-right-arrow'],navText:false,margin:15,responsive:{0:{nav:false,},480:{},768:{nav:true,items:c_items},},}).on('click initialized.owl.carousel','.item',function(e){e.preventDefault();head_slider.trigger('to.owl.carousel',[jQuery(e.target).parents('.owl-item').index(),300,true]);jQuery(e.target).parents('.owl-item').addClass('active-item').siblings().removeClass('active-item');}).data('owl.carousel');var child_carousel_item=child_carousel.find('.owl-item.active');head_slider.on('change.owl.carousel',function(e){if(e.namespace&&e.property.name==='position'&&!flag){flag=true;child_carousel_c.to(e.relatedTarget.relative(e.property.value),300,true);head_slider.parent().find('.banner-carousel .owl-item.active').first().addClass('active-item').siblings().removeClass('active-item');flag=false;}}).data('owl.carousel');}});jQuery(document).ready(function(){jQuery('.image-comparison-slider').each(function(){var cur=jQuery(this);var width=cur.width()+'px';cur.find('.resize .old').css('width',width);drags(cur.find('.line'),cur.find('.resize'),cur);});});jQuery(window).resize(function(){jQuery('.image-comparison-slider').each(function(){var cur=jQuery(this);var width=cur.width()+'px';cur.find('.resize .old').css('width',width);});});function drags(dragElement,resizeElement,container){dragElement.on('mousedown touchstart',function(e){dragElement.addClass('draggable');resizeElement.addClass('resizable');var startX=(e.pageX)?e.pageX:e.originalEvent.touches[0].pageX,dragWidth=dragElement.outerWidth(),posX=dragElement.offset().left+dragWidth-startX,containerOffset=container.offset().left,containerWidth=container.outerWidth(),minLeft=containerOffset,maxLeft=containerOffset+containerWidth-dragWidth;dragElement.parents().on("mousemove touchmove",function(e){var moveX=(e.pageX)?e.pageX:e.originalEvent.touches[0].pageX,leftValue=moveX+posX-dragWidth;if(leftValue<minLeft){leftValue=minLeft;}else if(leftValue>maxLeft){leftValue=maxLeft;}
    var widthValue=(leftValue+dragWidth/2-containerOffset)*100/containerWidth+'%';jQuery('.draggable').css('left',widthValue).on('mouseup touchend touchcancel',function(){jQuery(this).removeClass('draggable');resizeElement.removeClass('resizable');});jQuery('.resizable').css('width',widthValue);}).on('mouseup touchend touchcancel',function(){dragElement.removeClass('draggable');resizeElement.removeClass('resizable');});e.preventDefault();}).on('mouseup touchend touchcancel',function(e){dragElement.removeClass('draggable');resizeElement.removeClass('resizable');});}
    jQuery('.right-click-disable').on('contextmenu',function(){jQuery('.right-click-disable-message').addClass('active');return false;});jQuery('.right-click-disable-message:not(.lic)').on('click',function(){jQuery(this).removeClass('active');return false;});jQuery('.gdpr-modal-block').on('click','.close',function(){yprm_setCookie('yprm_gdpr',true);jQuery(this).parent().fadeOut();});jQuery('.site-header .search-button').on("click",function(){if(jQuery(this).hasClass('active')){jQuery(this).removeClass('active');jQuery('.search-popup').fadeOut();}else{jQuery(this).addClass('active');jQuery('.search-popup').fadeIn();}});jQuery('.search-popup .close').on("click",function(){jQuery('.site-header .search-button').removeClass('active');jQuery('.search-popup').fadeOut();});jQuery('.nav-button.hidden_menu, .nav-button.visible_menu').on('click',function(){if(jQuery(this).hasClass('active')){jQuery(this).removeClass('active');jQuery('.navigation').removeClass('active');}else{jQuery(this).addClass('active');jQuery('.navigation').addClass('active');}});jQuery('.nav-button.full_screen').on('click',function(){if(jQuery(this).hasClass('active')){jQuery(this).removeClass('active');jQuery('.full-screen-nav').fadeOut();}else{jQuery(this).addClass('active');jQuery('.full-screen-nav').fadeIn();}});jQuery('.full-screen-nav .close').on("click",function(){jQuery('.nav-button.full_screen').removeClass('active');jQuery('.full-screen-nav').fadeOut();});jQuery('.full-screen-nav .menu-item-has-children > a').on("click",function(){if(!jQuery(this).hasClass('active')){jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().parent().siblings().children('a').removeClass('active').next('.sub-menu').slideUp();return false;}});jQuery('.side-navigation ul li.menu-item-has-children > a,.side-navigation ul li.page_item_has_children > a').on('click',function(){jQuery(this).parents('li').addClass('active-child');return false;});jQuery('.side-navigation .sub-menu .back,.side-navigation .children .back').on('click',function(){jQuery(this).parent().parent().removeClass('active-child');return false;});jQuery('.side-bar-button').on('click',function(){jQuery('.side-bar-area').addClass('active');});jQuery('.side-bar-area .close').on("click",function(){jQuery('.side-bar-area').removeClass('active');});jQuery('.navigation .menu-item-has-children > a').on("click",function(){if(jQuery(window).width()<='1200'){console.log('cli');if(!jQuery(this).hasClass('active')){jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp().find('a.active').removeClass('active');return false;}else if(jQuery(this).attr('href')==''||jQuery(this).attr('href')=='#'){jQuery(this).removeClass('active').parent().children('.sub-menu').slideUp();return false;}}});jQuery(window).on("load resize scroll",function(){if(jQuery(document).scrollTop()>0){jQuery('.site-header:not(.without-fixed)').addClass('fixed');}else{jQuery('.site-header:not(.without-fixed)').removeClass('fixed');}});jQuery(document).on('click',".price-list .item .options .button-style1",function(){if(jQuery(this).parent().hasClass('active')){jQuery(this).removeClass('active').parent().removeClass('active').find('.wrap').slideUp();}else{jQuery(this).addClass('active').parent().addClass('active').find('.wrap').slideDown();}
    return false;});jQuery('#wpadminbar').addClass('wpadminbar');var nav_el='';if(jQuery('.navigation').hasClass('visible_menu')){nav_el='yes';}
    jQuery(window).on("load resize",function(){jQuery('.header-space').css('height',jQuery('.site-header').outerHeight()+jQuery('.header + .navigation').outerHeight()+jQuery('.ypromo-site-bar').outerHeight());jQuery('main.main-row').css('min-height',jQuery(window).outerHeight()-jQuery('.site-footer').outerHeight()-jQuery('.footer-social-button').outerHeight()-jQuery('.header-space:not(.hide)').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());jQuery('.protected-post-form .cell').css('height',jQuery(window).outerHeight()-jQuery('.site-footer').outerHeight()-jQuery('.footer-social-button').outerHeight()-jQuery('.header-space:not(.hide)').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());jQuery('.banner:not(.fixed-height)').each(function(){var coef=0;if(jQuery(this).parents('.banner-area').hasClass('external-indent')&&!jQuery(this).parents('.banner-area').hasClass('with-carousel-nav')){coef=70;}
    jQuery(this).css('height',jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').outerHeight()-jQuery('#wpadminbar').outerHeight()-coef);jQuery(this).find('.cell').css('height',jQuery(this).height());jQuery(this).parent().find('.banner-categories .item').css('height',jQuery(this).height());jQuery(this).parent().find('.banner-about .cell').css('height',jQuery(this).height()-20);jQuery(this).parent().find('.banner-about .image').css('height',jQuery(this).height());jQuery(this).parent().find('.banner-about .text').css('height',jQuery(this).height());jQuery(this).parent().find('.banner-right-buttons .cell').css('height',jQuery(this).height());});jQuery('.banner.fixed-height').each(function(){jQuery(this).find('.cell').css('height',jQuery(this).height());jQuery(this).parent().find('.banner-categories .item').css('height',jQuery(this).height());jQuery(this).parent().find('.banner-about .cell').css('height',jQuery(this).height()-20);jQuery(this).parent().find('.banner-about .image').css('height',jQuery(this).height());jQuery(this).parent().find('.banner-about .text').css('height',jQuery(this).height());jQuery(this).parent().find('.banner-right-buttons .cell').css('height',jQuery(this).height());});jQuery('.full-screen-nav .cell').css('height',jQuery(window).height()-20-jQuery('#wpadminbar').height());jQuery('.side-header .cell').css('height',jQuery('.side-header .wrap').height());if(nav_el=="yes"){if(jQuery(window).width()>=1200){jQuery('.navigation').addClass('visible_menu');jQuery('.nav-button').addClass('hidden');}else{jQuery('.navigation').removeClass('visible_menu');jQuery('.nav-button').removeClass('hidden').removeClass('active');}}
    if(jQuery(window).width()<='768'){jQuery('body').addClass('is-mobile-body');}else{jQuery('body').removeClass('is-mobile-body');}
    jQuery('div[data-vc-full-width-mod="true"]').each(function(){var coef=(jQuery('.container').outerWidth()-jQuery('#all').width())/2;jQuery(this).css('left',coef).css('width',jQuery('#all').width());});jQuery('.price-list').each(function(){var h=0;jQuery(this).find('.item').each(function(){if(h<jQuery(this).find('.wrap').outerHeight()){h=jQuery(this).find('.wrap').outerHeight();}});jQuery(this).find('.item').css('padding-bottom',h+130);});jQuery('.blog-type-grid').each(function(){});jQuery('.woocommerce .products').each(function(){equalHeight(jQuery(this).find('article div.product'));});jQuery('.project-horizontal-slider img, .project-horizontal, .project-horizontal-img').css('height',jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').height()-jQuery('.site-footer').outerHeight()-jQuery('#wpadminbar').outerHeight());jQuery('.project-horizontal .cell').css('height',jQuery('.project-horizontal').outerHeight());jQuery('.split-screen').each(function(){var this_el=jQuery(this);this_el.css('height',jQuery(window).height()-jQuery('#wpadminbar').outerHeight());this_el.find('.img-item').css('height',this_el.height());this_el.find('.cell').css('height',this_el.height());});jQuery('.category-slider-area').each(function(){var this_el=jQuery(this);this_el.css('height',jQuery(window).height()-jQuery('#wpadminbar').outerHeight());this_el.find('.category-slider-images').css('height',this_el.height());this_el.find('.cell').css('height',this_el.height());});jQuery('.vertical-parallax-slider').each(function(){jQuery(this).css('height',jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').height()-jQuery('#wpadminbar').outerHeight());jQuery(this).find('.cell').css('height',jQuery(this).height());});jQuery('.split-screen-type2').each(function(){jQuery(this).css('height',jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').height()-jQuery('#wpadminbar').outerHeight());jQuery(this).find('.items .item').css('height',jQuery(this).height());});jQuery('.navigation > ul > li > .sub-menu').each(function(){var left=jQuery(this).offset().left,width=jQuery(this).outerWidth(),window_w=jQuery(window).width();if(!jQuery(this).hasClass('right')&&window_w<(left+width)){jQuery(this).addClass('right');}});jQuery('.album-area').each(function(){if(jQuery(this).find('.album-cover').length>0){var cover_height=jQuery(this).find('.album-cover').outerHeight(),top_height=jQuery(this).find('.top').outerHeight();jQuery(this).find('.jp-playlist').css('height',cover_height-top_height);}});});jQuery('.project-horizontal-slider').each(function(){var head_slider=jQuery(this);if(head_slider.find('.item').length>1){head_slider.imagesLoaded(function(){head_slider.addClass('owl-carousel').owlCarousel({items:1,nav:true,dots:false,autoplay:false,autoWidth:true,navClass:['owl-prev basic-ui-icon-left-arrow','owl-next basic-ui-icon-right-arrow'],navText:false,margin:30,responsive:{0:{nav:false,},480:{},768:{nav:true,},}});});}});jQuery('#scroll-top').on("click",function(){jQuery('body, html').animate({scrollTop:'0'},1100);return false;});jQuery(window).on("load resize",function(){jQuery('.centered-container').each(function(){var width=parseInt(Math.round(jQuery(this).width()).toFixed(0)),height=parseInt(Math.round(jQuery(this).height()).toFixed(0));jQuery(this).css('width','').css('height','');if(width&1){jQuery(this).css('width',(width+1)+'px');}
    if(height&1){jQuery(this).css('height',(height+1)+'px');}});});jQuery(window).bind("load",function(){jQuery('.portfolio-items').each(function(){var wrap=jQuery(this);wrap.imagesLoaded(function(){var $grid=wrap.isotope({itemSelector:'article',masonry:{}});wrap.prev('.filter-button-group').on('click','button',function(){jQuery(this).addClass('active').siblings().removeClass('active');var filterValue=jQuery(this).attr('data-filter');if(jQuery(this).parents('.portfolio-block').find('.loadmore-button').length>0){jQuery(this).parents('.portfolio-block').find('.loadmore-button').trigger('click',[false]);}else{$grid.isotope({filter:filterValue});}
    jQuery(window).trigger('resize').trigger('scroll');});});});jQuery('.product-block .products').each(function(){var wrap=jQuery(this);wrap.imagesLoaded(function(){var $grid=wrap.isotope({itemSelector:'li',masonry:{}});wrap.prev('.filter-button-group').on('click','button',function(){jQuery(this).addClass('active').siblings().removeClass('active');var filterValue=jQuery(this).attr('data-filter');if(jQuery(this).parents('.product-block').find('.loadmore-button').length>0){jQuery(this).parents('.product-block').find('.loadmore-button').trigger('click',[false]);}else{$grid.isotope({filter:filterValue});}
    jQuery(window).trigger('resize').trigger('scroll');});});});jQuery('.post-gallery-grid:not(.disable-iso)').each(function(){var $grid=jQuery(this).addClass('isotope').isotope({itemSelector:'.col-12',});});jQuery('.product-thumb-slider').each(function(){let $product_thumb_slider=jQuery(this),$product_thumb_slider_container=new Swiper($product_thumb_slider,{loop:true,navigation:{nextEl:$product_thumb_slider.find('.next'),prevEl:$product_thumb_slider.find('.prev'),},});});jQuery('.js-pixproof-gallery').each(function(){var $grid=jQuery(this).addClass('isotope').isotope({itemSelector:'.proof-photo',getSortData:{selected:'[class]',},sortAscending:false,});});jQuery('.products.isotope').each(function(){var $grid=jQuery(this).isotope({itemSelector:'li',});});});jQuery(window).bind("load",function(){jQuery('.blog-items').each(function(){var wrap=jQuery(this);var $grid=jQuery(this).isotope({itemSelector:'article'});wrap.prev('.filter-button-group').on('click','button',function(){jQuery(this).addClass('active').siblings().removeClass('active');var filterValue=jQuery(this).attr('data-filter');if(jQuery(this).parents('.blog-block').find('.loadmore-button').length>0){jQuery(this).parents('.blog-block').find('.loadmore-button').trigger('click',[false]);}else{$grid.isotope({filter:filterValue});}
    jQuery(window).trigger('resize').trigger('scroll');});});});jQuery(window).on("load",function(){jQuery('.post-gallery-masonry').each(function(){var $grid=jQuery(this).isotope({itemSelector:'div'});});});jQuery('.replytocom').on('click',function(){var id_parent=jQuery(this).attr('data-id');jQuery('#comment_parent').val(id_parent);jQuery('#respond').appendTo(jQuery(this).parents('.comment-item'));jQuery('#cancel-comment-reply-link').show();return false;});jQuery('#cancel-comment-reply-link').on('click',function(){jQuery('#comment_parent').val('0');jQuery('#respond').appendTo(jQuery('#commentform-area'));jQuery('#cancel-comment-reply-link').hide();return false;});jQuery(window).on('load scroll',function(){jQuery('.background-parallax').each(function(){var wScroll=jQuery(window).scrollTop()-jQuery(this).parent().offset().top+jQuery('#wpadminbar').height()+jQuery('.header-space').height();jQuery(this).css('transform','translate(0px,'+wScroll+'px)');jQuery(this).parents('.owl-carousel').find('.owl-nav div').css('margin-top',wScroll);});});var l_button_index=0;jQuery('.project-image-load-button .button-style1').each(function(){var $button=jQuery(this),time=0;$button.on('click',function(){var $this=jQuery(this),$wrap=$this.parents('.project-grid-page'),$load_items=$wrap.find('.load-items'),cout_pages=$load_items.length;l_button_index++;if(cout_pages==1){jQuery(this).addClass('hide').parent().fadeOut();}
    var items=$wrap.find('.load-items'+l_button_index).find('.col-12');$wrap.find('.load-items'+l_button_index).remove();$wrap.find('.post-gallery-grid').append(items).isotope('appended',items).queue(function(next){if(typeof lazyLoad==='function'){lazyLoad();}
    next();});return false;});if($button.hasClass('load_more_on_scroll')){jQuery(window).on('scroll',function(){$button.parent().prev().imagesLoaded(function(){var new_time=Date.now();if((time+1000)<new_time&&!$button.hasClass('hide')){var top=$button.offset().top-500,w_top=jQuery(window).scrollTop()+jQuery(window).height();if(w_top>jQuery(window).height()+150&&top<w_top){$button.trigger('click');}
    time=new_time;}});});}});jQuery('.quantity .down').on("click",function(){var val=jQuery(this).parent().find('.input-text').val();if(val==''){val=0}
    if(val>1){val=parseInt(val)-1;jQuery(this).parent().find('.input-text').val(val);}
    return false;});jQuery('.quantity .up').on("click",function(){var val=jQuery(this).parent().find('.input-text').val();if(val==''){val=0}
    val=parseInt(val)+1;jQuery(this).parent().find('.input-text').val(val);return false;});jQuery(window).on('load scroll',function(){jQuery('.skill-item .chart').each(function(){var top=jQuery(document).scrollTop()+jQuery(window).height();var pos_top=jQuery(this).offset().top;if(top>pos_top){jQuery(this).addClass('animated');}});});jQuery(document).on('click','[href="#"]',function(){return false;});jQuery('.photo-carousel .carousel').each(function(){var head_slider=jQuery(this);if(head_slider.find('.item').length>1){head_slider.addClass('owl-carousel').owlCarousel({loop:true,items:1,nav:false,dots:false,autoplay:true,autoplayTimeout:3000,smartSpeed:2000,autoWidth:false,navText:false,responsive:{0:{items:2},480:{items:3},768:{items:4},980:{items:5},1200:{items:6},1400:{items:7},1700:{items:8},1980:{items:9},}});}});jQuery('.product-image-block').each(function(){var $block=jQuery(this),$thumbs_carousel=$block.find('.thumbs .swiper-container'),$image_slider=$block.find('.slider');var $thumbs_carousel_swiper=new Swiper($thumbs_carousel,{direction:'vertical',slidesPerView:'auto',spaceBetween:15,});var $image_slider_swiper=new Swiper($image_slider,{navigation:{nextEl:$image_slider.find('.next'),prevEl:$image_slider.find('.prev'),},slideToClickedSlide:true,thumbs:{swiper:$thumbs_carousel_swiper}});});jQuery('.project-single-carousel').each(function(){var $portfolio_carousel=jQuery(this),$portfolio_carousel_swiper=new Swiper($portfolio_carousel.find('.swiper-container'),{slidesPerView:'auto',spaceBetween:30,breakpoints:{576:{autoHeight:true}}});});jQuery('.single_variation_wrap').on('show_variation',function(event,variation){let image=variation.image.url;if(jQuery('.product-image-block').length>0){let swiperSlider=jQuery('.product-image-block').find('.slider').get(0).swiper,swiperThumbs=jQuery('.product-image-block').find('.thumbs .swiper-container').get(0).swiper,adaptive=jQuery('.product-image-block').hasClass('adaptive');if(adaptive){jQuery(swiperSlider.slides[0]).find('img').attr('src',image);}else{jQuery(swiperSlider.slides[0]).find('a').css('background-image','url('+image+')');}
    jQuery(swiperThumbs.slides[0]).css('background-image','url('+image+')');swiperSlider.slideTo(0);}else if(jQuery('.product-image').length>0){let adaptive=jQuery('.product-image').hasClass('adaptive');if(adaptive){jQuery('.product-image').find('img').attr('src',image);}else{jQuery('.product-image').find('a').css('background-image','url('+image+')');}}});});




    $(document).ready(function(){
      $('.dropdown-toggle').click(function(e){
          e.preventDefault();
          $(this).siblings('.submenu').toggle();
      });
  });



// contact form validations code

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const serviceSelect = document.getElementById('company_name');
const errorMessages = document.querySelectorAll('.error-message');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  let isValid = true;

  // Existing validation logic for name, email, phone, and message (if any)

  // Service selection validation
  if (serviceSelect.value === "") {
    isValid = false;
    const serviceErrorMessage = serviceSelect.nextElementSibling.children[1];
    serviceErrorMessage.textContent = "Please select a service.";
  } else {
    serviceErrorMessage.textContent = "";
  }

  if (!isValid) {
    return; // Prevent form submission if validation fails
  }

  // Submit the form (code for form submission logic)
});
