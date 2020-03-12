(function() {
  var TabBar,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  TabBar = (function() {
    var settings, settings_button;

    function TabBar() {
      this.clear_nav_interval = __bind(this.clear_nav_interval, this);
      this.animate_tabs = __bind(this.animate_tabs, this);
      var add_button, add_channel, rapid_move_interval, rapid_move_step, slow_move_interval, slow_move_step,
        _this = this;

      this.nav_interval = null;
      this.nav_button = null;
      rapid_move_step = 500;
      rapid_move_interval = 1000;
      slow_move_step = 50;
      slow_move_interval = 500;
      this.outer_interval = 10;
      this.animating = false;
      $('.header').on('mouseover', '.tab', function(event) {
        return _this.scroll_into_view($(event.target));
      });
      this.arrange_header_tabs();
      $('.tab-bar', $('.header')).mouseover(function() {
        return _this.show_nav_buttons();
      }).mouseout(function() {
        return $('.nav', $('.header')).css({
          'display': 'none'
        });
      });
      $('.icons-left', $('.header')).bind('mouseover', function() {
        _this.nav_button = 'left';
        return _this.animate_tabs(true, slow_move_step, slow_move_interval);
      });
      $('.icons-right', $('.header')).bind('mouseover', function() {
        _this.nav_button = 'right';
        return _this.animate_tabs(false, slow_move_step, slow_move_interval);
      });
      $('.icons-left', $('.header')).bind('mousedown', function() {
        return _this.animate_tabs(true, rapid_move_step, rapid_move_interval);
      });
      $('.icons-right', $('.header')).bind('mousedown', function() {
        return _this.animate_tabs(false, rapid_move_step, rapid_move_interval);
      });
      $('.nav', $('.header')).bind('mouseup', function() {
        var button;

        button = _this.nav_button;
        _this.clear_nav_interval();
        if (button === 'left') {
          return _this.animate_tabs(true, slow_move_step, slow_move_interval);
        } else if (button === 'right') {
          return _this.animate_tabs(false, slow_move_step, slow_move_interval);
        }
      }).bind('mouseout', function() {
        _this.nav_button = null;
        return _this.clear_nav_interval();
      });
      add_channel = $('#add_channel');
      $('.cancel', add_channel).click(function() {
        return add_channel.css('display', 'none');
      });
      $('.add', add_channel).click(function() {
        var name;

        if (!$('input', add_channel).val()) {
          return show_error('Giriþ yapmak istediðiniz kanali giriniz', function() {
            return $('input', add_channel).focus();
          });
        } else {
          $('input', add_channel).attr('disabled', true);
          $('.add', add_channel).attr('disabled', true);
          name = $('input', add_channel).val();
          if (name[0] !== '#') {
            name = '#' + name;
          }
          return api.add_channel(name.substring(1), function(result) {
            if (show_result_error(result, function() {
              return $('input', add_channel).focus();
            })) {
              view_model.add_channel(name, result.members);
              add_channel.css('display', 'none');
            }
            $('input', add_channel).attr('disabled', false);
            return $('.add', add_channel).attr('disabled', false);
          });
        }
      });
      add_button = $('.icons-add-channel');
      add_button.click(function() {
        add_channel.css('display', 'block');
        add_channel.css('top', add_button.offset().top + add_button.height());
        add_channel.css('left', add_button.offset().left + add_button.width() - add_channel.width() - 30);
        $('input', add_channel).val('');
        $('button', add_channel).attr('disabled', false);
        $('input', add_channel).attr('disabled', false);
        return $('input', add_channel).focus();
      });
    }

    settings = $('#settings');

    settings_button = $('.icons-settings');

    settings_button.click(function() {
      settings.css('display', 'block');
      settings.css('top', settings_button.offset().top + settings_button.height());
      settings.css('left', settings_button.offset().left + settings_button.width() - settings.width() - 30);
      $('input', settings).val('');
      $('button', settings).attr('disabled', false);
      $('input', settings).attr('disabled', false);
      return $('input', settings).focus();
    });

    $('.cancel', settings).click(function() {
      return settings.css({
        'display': 'none'
      });
    });

    TabBar.prototype.animate_tabs = function(to_left, step, interval) {
      var bar, tabs,
        _this = this;

      this.clear_nav_interval();
      tabs = $('.tabs', $('.header'));
      if (to_left) {
        this.clear_nav_interval();
        this.nav_interval = setInterval(function() {
          var diff;

          if (_this.animating) {
            return;
          }
          diff = tabs.position().left * -1;
          if (diff <= 0) {
            return _this.clear_nav_interval();
          } else {
            if (step > diff) {
              step = diff;
            }
            _this.animating = true;
            return tabs.animate({
              left: '+=' + step
            }, interval, 'linear', function() {
              return _this.animating = false;
            });
          }
        }, this.outer_interval);
      } else {
        bar = $('.tab-bar', $('.header'));
        this.nav_interval = setInterval(function() {
          var diff, tabs_right;

          if (_this.animating) {
            return;
          }
          tabs_right = tabs.position().left + tabs.outerWidth();
          diff = tabs_right - bar.width();
          if (diff <= 0) {
            return _this.clear_nav_interval();
          } else {
            if (step > diff) {
              step = diff;
            }
            _this.animating = true;
            return tabs.animate({
              left: '-=' + step
            }, interval, 'linear', function() {
              return _this.animating = false;
            });
          }
        }, this.outer_interval);
      }
      return this;
    };

    TabBar.prototype.clear_nav_interval = function() {
      if (this.nav_interval) {
        clearInterval(this.nav_interval);
      }
      this.nav_interval = null;
      return this.show_nav_buttons();
    };

    TabBar.prototype.show_nav_buttons = function() {
      var bar, bar_width, nav_left, nav_left_x, nav_right, nav_right_x, nav_top, tabs, tabs_left, tabs_width;

      tabs = $('.tabs', $('.header'));
      bar = $('.tab-bar', $('.header'));
      nav_left = $('.icons-left');
      nav_right = $('.icons-right');
      tabs_width = tabs.outerWidth();
      bar_width = bar.width();
      nav_top = bar.offset().top + 2;
      nav_left_x = bar.offset().left + 6;
      nav_right_x = bar.offset().left + bar.width() - 15;
      tabs_left = tabs.position().left;
      nav_left.css('display', 'none');
      nav_right.css('display', 'none');
      if (tabs_width > bar_width) {
        if (tabs_left < -5) {
          nav_left.css('display', 'block');
          nav_left.css('left', nav_left_x);
          nav_left.css('top', nav_top);
        }
        if (-1 * tabs_left < tabs_width - bar_width) {
          nav_right.css('display', 'block');
          nav_right.css('left', nav_right_x);
          return nav_right.css('top', nav_top);
        }
      }
    };

    TabBar.prototype.arrange_header_tabs = function() {
      var bar, header,  tab, tabs, w, _i, _len, _ref;

      header = $('.header');
      bar = $('.tab-bar', header);
      tabs = $('.tabs', bar);
     
      w = 24;
      _ref = $('.tab', tabs);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        w = w+24;
      }
      tabs.height(w);
      return this;
    };

    TabBar.prototype.scroll_into_view = function(sender) {
      var bar, bar_width, left, offset, right, tabs, tabs_container, tabs_container_left, tabs_container_right;

      tabs_container = $('.tabs', $('.header'));
      tabs = $('.tab', tabs_container);
      if (!sender.position) {
        sender = $(tabs[sender]);
      }
      left = sender.position().left;
      right = left + sender.outerWidth();
      bar = $('.tab-bar', $('.header'));
      bar_width = bar.width();
      tabs_container_left = tabs_container.position().left * -1;
      tabs_container_right = tabs_container_left + bar_width;
      if (right > tabs_container_right) {
        offset = right - tabs_container_right;
        return tabs_container.animate({
          left: '-=' + offset
        }, 100);
      } else if (left < tabs_container_left) {
        offset = tabs_container_left - left;
        return tabs_container.animate({
          left: '+=' + offset
        }, 100);
      }
    };

    return TabBar;

  })();

  $(document).ready(function() {
    return window.tab_bar = new TabBar();
  });

}).call(this);
