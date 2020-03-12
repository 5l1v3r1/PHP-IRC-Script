(function() {
  var Layout,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Layout = (function() {
    function Layout() {
      this.scroll_messages = __bind(this.scroll_messages, this);
      this.arrange_layout = __bind(this.arrange_layout, this);
      var change_nickname, nickname,
        _this = this;

      $(window).bind('resize', function() {
        _this.arrange_layout();
        //return tab_bar.arrange_header_tabs();
      });
      this.arrange_layout();
      //tab_bar.arrange_header_tabs();
      this.scrolling_messages = false;
      $('.messages').on('mouseover', '.message', function() {
        var sender;

        sender = $(this).attr('sender');
        return $('[sender="' + sender + '"]').addClass('message_hover');
      }).on('mouseout', '.message', function() {
        var sender;

        sender = $(this).attr('sender');
        return $('[sender="' + sender + '"]').removeClass('message_hover');
      });
      $(window).click(function() {
        $('#context_menu').css('display', 'none');
        return true;
      });
      change_nickname = $('#change_nickname');
      $('.cancel', change_nickname).click(function() {
        return change_nickname.css('display', 'none');
      });
      $('.add', change_nickname).click(function() {
        var name;

        if (!$('input', change_nickname).val()) {
          return show_error('Please enter a nickname', function() {
            return $('input', change_nickname).focus();
          });
        } else {
          $('input', change_nickname).attr('disabled', true);
          $('.add', change_nickname).attr('disabled', true);
          name = $('input', change_nickname).val();
          return api.change_nickname(name, function(result) {
            if (show_result_error(result, function() {
              return $('input', change_nickname).focus();
            })) {
              view_model.change_nickname(name);
              change_nickname.css('display', 'none');
            }
            $('input', change_nickname).attr('disabled', false);
            return $('.add', change_nickname).attr('disabled', false);
          });
        }
      });
      nickname = $('.nickname', $('.editor'));
      nickname.click(function() {
        change_nickname.css('display', 'block');
        change_nickname.css('top', nickname.offset().top - nickname.height() - change_nickname.height());
        change_nickname.css('left', nickname.offset().left);
        $('input', change_nickname).val('');
        $('button', change_nickname).attr('disabled', false);
        $('input', change_nickname).attr('disabled', false);
        return $('input', change_nickname).focus();
      });
    }

    Layout.prototype.arrange_layout = function() {
      var body,gen2, body_height, body_width, buttons, ust, ust2, list, ust_width ,chrome, chrome_height, chrome_width, editor, header, input, input_width, members, members_box, msg, msg_width, nickname, send, v_spacing, win;

      win = $(window);
	  
      header = $('.header');
	  bar = $('.tab-bar', header);
      body = $('.body');
	  ust = $('.ust');
	  ust2 = $('.ust2');
      chrome = $('.chrome');
	  reklam = $('.yanreklam', chrome);
      msg = $('.messages', chrome);
	  list = $('.list', chrome);
      editor = $('.editor');
      input = $('.input', editor);
      send = $('button', editor);
      nickname = $('.nickname', editor);
      members = $('.members', chrome);
      members_box = $('.box', members);
      buttons = $('.buttons');
	  
	  if (win.width()<800){
	  gen2=800;
	  } else {
	  gen2=win.width();
	  }
      if (yukseklik==0)
      body_height = win.height()-ust.height()- 30- header.height() - vertical_spacing(header) - buttons.height() - vertical_spacing(buttons) - editor.height() - vertical_spacing(editor) - vertical_spacing(body);
      else
      body_height = yukseklik;

      body.height(body_height);
      v_spacing = vertical_spacing(chrome);
      chrome_height = body_height - v_spacing - vertical_paddings(body) - 2;
      chrome.height(chrome_height);
      members.height(chrome_height);
	  bar.height(chrome_height+18);
	   $(document).ready(function() {
	  yanyukseklik=chrome_height - vertical_spacing(members_box) - vertical_paddings(members);
	  
	  });
      members_box.height(chrome_height - vertical_spacing(members_box) - vertical_paddings(members));
      if (genislik==0)
      body_width = gen2-20;
	else
      body_width = genislik;

      ust.width(body_width);
      body.width(body_width);
	  
      chrome_width = body_width - horizontal_paddings(body) - horizontal_spacing(chrome)-165;
      chrome.width(chrome_width);
      if (members.css('display') === 'none') {
        msg_width = chrome_width - horizontal_paddings(chrome) - horizontal_spacing(msg);
      } else {
        msg_width = chrome_width - members.width() - horizontal_paddings(chrome) - horizontal_spacing(members) - horizontal_spacing(msg)-reklam.width();
      }
	  list.width(msg_width);
      msg.width(msg_width);
      members_box.width(members.width() - horizontal_spacing(members_box) - horizontal_paddings(members));
      msg.height(chrome_height);
      list.height(chrome_height);
	  editor.width(chrome_width+7);
      input_width = chrome_width;
	
	  ust2.width(chrome_width);
      input.width(input_width);
      return $('body', $('iframe.input').contents().get(0)).css('background', '#fff').css('padding', '5px 0 0 2px').css('margin', '0');
    };
	
    Layout.prototype.scroll_messages = function() {
      var _this = this;

      if (this.scrolling_messages) {
        return setTimeout(function() {
          return _this.scroll_messages();
        }, 1);
      } else {
        this.scrolling_messages = true;
        return $(".messages").animate({
          scrollTop: $('.messages')[0].scrollHeight
        }, 1, function() {
          return _this.scrolling_messages = false;
        });
      }
    };

    return Layout;

  })();

  $(document).ready(function() {
    $('iframe.input').contents().get(0).designMode = 'on';
    $($('iframe.input').contents().get(0)).bind('keydown', function(e) {
      var body, code;

      code = e.keyCode ? e.keyCode : e.which;
      if (code === 13) {
        body = $('body', $($('iframe.input').contents().get(0)));
        view_model.send(body.text());
        body.text('');
        return false;
      }
      return true;
    });
    $($('iframe.input')[0].contentWindow).focus();
    window.css_to_int = function(val) {
      if (!val) {
        return 0;
      }
      return val.replace('px', '') * 1;
    };
    window.vertical_margins = function(element) {
      return css_to_int(element.css('marginTop')) + css_to_int(element.css('marginBottom'));
    };
    window.horizontal_margins = function(element) {
      return css_to_int(element.css('marginLeft')) + css_to_int(element.css('marginRight'));
    };
    window.vertical_paddings = function(element) {
      return css_to_int(element.css('paddingTop')) + css_to_int(element.css('paddingBottom'));
    };
    window.horizontal_paddings = function(element) {
      return css_to_int(element.css('paddingLeft')) + css_to_int(element.css('paddingRight'));
    };
    window.vertical_spacing = function(element) {
      return vertical_paddings(element) + vertical_margins(element);
    };
    window.horizontal_spacing = function(element) {
      return horizontal_paddings(element) + horizontal_margins(element);
    };
    window.show_error = function(message, callback) {
      return new Messi(message, {
        modal: true,
        title: 'Error',
        buttons: [
          {
            label: 'OK'
          }
        ],
        callback: function() {
          if (callback) {
            return callback();
          }
        }
      });
    };
    window.show_result_error = function(result, callback) {
      var message;

      if (!result) {
        show_error('Invalid result returned from the server', function() {
          if (callback) {
            return callback();
          }
        });
        return false;
      } else if (result.error) {
        message = result.message;
        if (!message) {
          message = 'Server returned an unspecific error';
        }
        show_error(message, function() {
          if (callback) {
            return callback();
          }
        });
        return false;
      }
      return true;
    };
    return window.layout = new Layout();
  });

}).call(this);