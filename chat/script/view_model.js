
(function() {
  var Channel, Member, Message, ViewModel, colors, status_channel_name,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
 
  
  status_channel_name = 'Status';

  colors = ['#000'];

  Member = (function() {
    function Member(nickname, date_joined) {
      var _this = this;

      this.date_joined = date_joined;
      if (!this.date_joined) {
        this.date_joined = new Date();
      }
      this.date_joined = this.date_joined.getTime();
      this.color = ko.observable('#000');
      this.nickname = ko.observable(nickname);
	  if (nickname.charAt(0)=='~')
	  this.color = ko.observable('#ff0000');
	  if (nickname.charAt(0)=='~')
	  this.color = ko.observable('#ff0000');
	  else if (nickname.charAt(0)=='&')
	  this.color = ko.observable('#560000');
	  else if (nickname.charAt(0)=='@')
	  this.color = ko.observable('#ff0000');
	  else if (nickname.charAt(0)=='%')
	  this.color = ko.observable('#cacaca');
	  else if (nickname.charAt(0)=='+')
	  this.color = ko.observable('#FF8000');
	  
      this.now = ko.observable(new Date().getTime());
      this.sub = ko.computed(function() {
        var days, diff, hours, minutes;

        diff = _this.now() - _this.date_joined;
        minutes = Math.floor(diff / 60000);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);
        if (days > 0) {
          if (days === 1) {
            return 'Joined yesterday';
          } else {
            return 'Joined ' + days + ' days ago';
          }
        } else if (hours > 0) {
          if (hours === 1) {
            return 'Joined more than an hour ago';
          } else {
            return 'Joined more than ' + hours + ' hours ago';
          }
        } else if (minutes > 0) {
          if (minutes === 1) {
            return 'Joined a minute ago';
          } else {
            return 'Joined ' + minutes + ' minutes ago';
          }
        } else {
          return 'Joined less than a minute ago';
        }
      });
    }

    return Member;

  })();

  Message = (function() {
    function Message(date, sender, message, color) {
      this.date = date;
      this.sender = sender;
	  this.parantez1 = '<';
	  this.parantez2 = '>';
	  if (sender=='*') {
	   this.parantez1 = '';
	  this.parantez2 = '';
	  }
      this.message = message;
      this.color = color;
     
     
    }

    return Message;

  })();

  Channel = (function() {
    function Channel(name, members) {
	  var member, _i, _len;
	  this.name = name;
      this.join = __bind(this.join, this);
      this.is_private = this.name.length && this.name[0] !== '#';
      this.members = ko.observableArray();
      this.is_system = false;
      this.color_index = 0;
	  this.images = "chat/res/tabicon/kanal.png";
	  if (name.charAt(0)!='#')
	  this.images = "chat/res/tabicon/ozel.png";
	   if (name=='Status')
	  this.images = "chat/res/tabicon/status.png";
      this.sender_color = [];
      this.messages = ko.observableArray();
      if (!this.is_private) {
        if (members) {
          for (_i = 0, _len = members.length; _i < _len; _i++) {
            member = members[_i];
            if (member.nickname) {
              this.members.push(new Member(member.nickname, member.date));
            } else {
              this.members.push(new Member(member));
            }
          }
        }
		var prefixes = {
		'~': '1','~': '2','&': '3','@': '4','%': '5','+': '6'
		};


		this.members.sort( function( right, left ) {
			var a,b;
		a = right.nickname();
		b = left.nickname();
        a = ( prefixes[ a.charAt(0) ] || '9' ) + a.toLowerCase();
        b = ( prefixes[ b.charAt(0) ] || '9' ) + b.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
		});

		
      }
    }

    Channel.prototype.join = function(nickname, date) {
      var m, _i, _len, _ref;

      _ref = this.members();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.nickname() === nickname) {
          return;
        }
      }
      return this.members.push(new Member(nickname, date));
    };

    return Channel;

  })();

  ViewModel = (function() {
    function ViewModel() {
      this.set_time_feeding = __bind(this.set_time_feeding, this);
      this.feed_now = __bind(this.feed_now, this);
      this.user_context = __bind(this.user_context, this);
      this.user_message = __bind(this.user_message, this);
      this.send_hit = __bind(this.send_hit, this);
      this.send = __bind(this.send, this);
      this.add_user_message = __bind(this.add_user_message, this);
      this.add_channel_message = __bind(this.add_channel_message, this);
      this.close = __bind(this.close, this);
      this.close_channel = __bind(this.close_channel, this);
      this.select_channel = __bind(this.select_channel, this);
      this.add_channel = __bind(this.add_channel, this);
      this.change_nickname = __bind(this.change_nickname, this);
      var status_channel;

      this.nickname = ko.observable();
	  this.ident = ko.observable();
      this.channels = ko.observableArray();
      this.active_channel = ko.observable();
      this.interval = null;
	  var Kanallar = new Array();

	       
	  Kanallar[0] = "!Önerilen Kanallar!";
	  Kanallar[1] = "#Klavye";
	  Kanallar[2] = "#islam";
	  Kanallar[3] = "#Yarisma";
	  Kanallar[4] = "#Siber";
	  Kanallar[5] = "#Help";
	  Kanallar[6] = "#Operhelp";
      status_channel = new Channel(status_channel_name,Kanallar);
      status_channel.is_system = true;
      this.channels.push(status_channel);
	  this.select_channel(status_channel);
   
    }

    ViewModel.prototype.change_nickname = function(name) {
      this.nickname(name);
      return this;
    };
	ViewModel.prototype.change_ident = function(name) {
      this.ident(name);
      return this;
    };
	
    ViewModel.prototype.add_channel = function(ident,name, members) {
	
	
      var ch, channel, _i, _len, _ref;
		//api.channel_message('#Status','Names',members);
      _ref = this.channels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        if (ch.name.toLowerCase() === name.toLowerCase()) {
          return null;
        }
      }
	   
	  
	 	 
      channel = new Channel(name, members);
      this.channels.push(channel);
	  if (name.charAt(0)==='#')
	  {
	  this.select_channel(channel);
	  } else if (name=='Status')
	  this.select_channel(channel);
	  else if (name.charAt(0)==='!')
	  this.select_channel(channel);
	  else if (ident=='ozel')
	  this.select_channel(channel);
	  else
      this.select_channel2(channel);
      return channel;
    };

	ViewModel.prototype.statussec = function() {
      
	 var ch, channel, _i, _len, _ref, sonuc;

      _ref = this.channels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        if (ch.name.toLowerCase() === 'Status'.toLowerCase()) {
			sonuc=1;
          break;
        }
      }
	  if (sonuc==1)
	  {
		
		  this.select_channel(ch);
	  }
	  
      return;
    };

   ViewModel.prototype.select_channel2 = function(channel) {
      var index;

      tab_bar.arrange_header_tabs();
      this.set_time_feeding();
      layout.arrange_layout();
     
	      $('#context_menu').css('display','none');
      return this;
    };
    ViewModel.prototype.select_channel = function(channel) {
      var index;

      this.active_channel(channel);
      tab_bar.arrange_header_tabs();
      this.set_time_feeding();
      layout.arrange_layout();
      index = this.channels.indexOf(channel);
      tab_bar.scroll_into_view(index);
      layout.scroll_messages();
		$(document).ready(function() {
		var c1 = 'black';
		$('.tab').each(function(){
		var str = $(this).text();
		///trim code
		str = str.replace(/^\s+/, '');
		for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
        }
		 if (str==view_model.active_channel().name)
           {
			$(this).css('color', c1);
			
           }
		   
		}
		
		////trim end///
          });
         });


	  $(document).ready(function() {
	  yantaraf(channel.name,channel.members().length);  
	  
	  });


      $('#context_menu').css('display','none');
      return this;
    };

 ViewModel.prototype.quit = function(name) {
      var ch, channel, _i, _len, _ref;
      _ref = this.channels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
       
		$(document).ready(function() {
		api.part(ch.name,name);
		});
      }
      return null;
    };
    ViewModel.prototype.close_channel = function(channel) {
      var _this = this;

      $('#context_menu').css('display','none');
      api.remove_channel(channel.name, function(result) {
        var index;

        if (show_result_error(result)) {
          index = _this.channels.indexOf(channel);
          if ((_this.channels()[index].is_system)) {
            return _this;
          }
          if (_this.channels()[index] === _this.active_channel()) {
            if (index > 0) {
              _this.active_channel(_this.channels()[index - 1]);
			   $(document).ready(function() {
				yantaraf(_this.channels()[index - 1].name,_this.channels()[index - 1].members().length);  
				});
            } else if (_this.channels().length > index + 1) {
              _this.active_channel(_this.channels()[index + 1]);
			   $(document).ready(function() {
				yantaraf(_this.channels()[index + 1].name,_this.channels()[index + 1].members().length);  
				});
            } else {
              _this.active_channel(null);
            }
          }
			
          _this.channels.remove(channel);
          layout.arrange_layout();
          return layout.scroll_messages();
        }
      });
      return this;
    };

    ViewModel.prototype.close = function() {
      if (this.active_channel()) {
        this.close_channel(this.active_channel());
      }
      return this;
    };

    ViewModel.prototype.add_channel_message = function(date, channel, sender, message) {
      var c, ch, color, member, msg, _i, _j, _len, _len1, _ref, _ref1;
		
      c = null;
      _ref = this.channels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        if (ch.name.toLowerCase() === channel.toLowerCase()) {
          c = ch;
          break;
        }
      }
      if (!c) {
        return this;
      }
      color = c.sender_color[sender];
	  if (sender==this.nickname())
			color=kendi_nickiniz;
      if (!color) {
	     color = colors[c.color_index];
        c.color_index++;
        if (c.color_index === colors.length) {
          c.color_index = 0;
        }
        c.sender_color[sender] = color;
        _ref1 = ch.members();
		if (sender==this.nickname())
			color=kendi_nickiniz;
	   for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          member = _ref1[_j];
          if (member.nickname() === sender) {
            member.color(color);
          }
        }
      }
	  
	  if  (sender =='Reklamlar')
	  message=message;
	  else if  (channel!='Status'&&sender!='')
		message=this.degistir(message);
	  else if  (channel=='Status')
		message=linkify(message);
		var minutes = new Date().getMinutes();
		var hour = new Date().getHours();
		if (parseInt(minutes)<10){
		minutes='0'+minutes;
		}
		if (parseInt(hour)<10){
		hour='0'+hour;
		}
		
      msg = new Message('['+hour+':'+minutes+']', sender, message, color);

		var sayi=250;
		var deger=c.messages().length;
	  if (sayi<deger)
	  {
		  c.messages.splice(0, 1);
	  }
      c.messages.push(msg);
      if (c === this.active_channel()) {
        layout.scroll_messages();
      }
      return this;
    };

    ViewModel.prototype.add_user_message = function(date, sender, message) {
      var c, ch, color, i, msg, time, _i, _len, _ref;

      ch = null;
      _ref = this.channels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        if (c.name === sender) {
          ch = c;
          break;

        }
      }
	   if (ch) {
          time = new Date().getTime();
          i = Math.floor(time % colors.length);
          color = colors[i];
		  message=this.degistir(message);
          msg = new Message(date, sender, message, color);
          ch.messages.push(msg);
        }
      if (!ch) {
        ch = this.add_channel(date,sender);
        if (ch) {
          time = new Date().getTime();
          i = Math.floor(time % colors.length);
          color = colors[i];
		  message=this.degistir(message);
          msg = new Message(date, sender, message, color);
          ch.messages.push(msg);
        }
      }
      return this;
    };
	ViewModel.prototype.mesajsil = function() {
	var c;
	c=this.active_channel();
	c.messages.splice(0, c.messages().length);
	}
    ViewModel.prototype.send = function(message) {
      var ch,
        _this = this;

      ch = this.active_channel().name;
      api.send_message(ch, message, function(result) {
        var msg;

        if (!result) {
          return add_channel_message(new Date(), ch,'[Sys]','Failed to send message to ' + ch + ' > ' + message);
        } else if (result.error) {
          msg = result.message;
          if (!msg) {
            msg = 'Failed to send message to ' + ch + ' > ' + message;
          }
          return _this.add_channel_message(new Date(), ch,'[Sys]', msg);
        } else {
			$(document).ready(function() {
			
		if (koyu==1)
		{
		message='<b>'+message+'</b>';	
		}
		switch (renkler)
		{
		case 1:
		message='<span style="color:'+kendi_mesajiniz+'">'+message+'</span>';
		break;
		case 2:
		message='<span style="color:blue">'+message+'</span>';
		break;
		case 3:
			message='<span style="color:green">'+message+'</span>';
		break;
		case 4:
			message='<span style="color:#243B0B">'+message+'</span>';
		break;
		case 5:
			message='<span style="color:red">'+message+'</span>';
		break;
		case 6:
			message='<span style="color:gray">'+message+'</span>';
		break;
		default:
			message='<span style="color:black">'+message+'</span>';

		}
		});
          return _this.add_channel_message(new Date(), ch, _this.nickname(), message);
        }
      });
      return this;
    };




  ViewModel.prototype.aktifkanal = function(nick,text) {
       var ch,
        _this = this;
	  ch = this.active_channel().name;
	  if (nick.toLowerCase()=="nickserv") {
	  if (text.indexOf("Bu kayitli")>0) {
	  $(document).ready(function() {
	bootbox.prompt("Nick Şifrenizi Giriniz", function(result) {     
		
  if (result === null) {                                             
    Example.show("Şifre Girmediniz");                              
  } else {
	  MesajGonder('/',' privmsg nickserv identify '+result);
                        
  }
	});


	});
	
	  }
  	if (text.indexOf("Sifre kabul")>0) {
	  $(document).ready(function() {
	bootbox.hideAll();


	});
	
	  }
	  }
	api.channel_message(ch,nick,text);
	return this;
  };

  
  
  ViewModel.prototype.kanallist = function(kanal) {
  
   var c, ch, color, member, msg, _i, _j, _len, _len1, _ref, _ref1;
   var list2=[];
   
   

    _ref1 = this.active_channel().members();
	
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          member = _ref1[_j];
		  list2[_j]=member.nickname();
        
        }
		
  
  }
  ViewModel.prototype.geticon = function(icon) {
     var body, text;

      body = $('body', $($('iframe.input').contents().get(0)));
      text = body.text();
      if (text) {
        body.text(text+icon);
        body.focus();
      } else {
        body.text(icon);
        body.focus();
      
	  }
      return this;
    };

    ViewModel.prototype.user_message = function(member) {
      var channel, _i, _len, _ref;

	
      if (member.nickname) {
        member = member.nickname();
      }
	   if (member.charAt(0)=='!') {
	   return;
	   }
	  if (member.charAt(0)=='#') {
	  
	   $(document).ready(function() {
		MesajGonder('/',' JOIN '+member); 
		});
		return;
	  
	  }
	   if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
	  {
	  member=member.substr(1,member.length)
	  }

     _ref = this.channels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        channel = _ref[_i];
        if (channel.name === member) {
          this.select_channel(channel);
          return;
        }
      }
      return this.add_channel("ozel",member);
  /* $(document).ready(function() {
		MesajGonder('/',' OZEL '+member); 
		});*/
		

    };
	ViewModel.prototype.ozelac = function(member,ident) {
      var channel, _i, _len, _ref;

		
	  if (member.charAt(0)=='!') {
	   return;
	   }
	  if (member.charAt(0)=='#') {
	  
	   $(document).ready(function() {
		MesajGonder('/',' JOIN '+member); 
		});
		return;
	  
	  }
	   if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
	  {
	  member=member.substr(1,member.length)
	  }
    _ref = this.channels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        channel = _ref[_i];
        if (channel.name === member) {
          this.select_channel(channel);
          return;
        }
      }
      return this.add_channel(ident,member);


    };
    ViewModel.prototype.user_context = function(user, event) {
      var menu;
      user23 = user.nickname();
      menu = $('#context_menu');
      menu.css('display','block');

      if (menu.width() + event.clientX > $(document).width()) {
        menu.css('left', event.clientX - menu.width());
      } else {
        menu.css('left', event.clientX);
      }
      if (menu.height() + event.clientY > $(document).height()) {
        menu.css('top', event.clientY - menu.height());
      } else {
        menu.css('top', event.clientY);
      }
    
	
      return false;
    };

    ViewModel.prototype.feed_now = function() {
      var member, now, _i, _len, _ref, _results;

      now = new Date().getTime();
      _ref = this.active_channel().members();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        member = _ref[_i];
        _results.push(member.now(now));
      }
      return _results;
    };

    ViewModel.prototype.set_time_feeding = function() {
      var _this = this;

      if (this.interval) {
        clearInterval(this.interval);
      }
      if (!this.active_channel() || this.active_channel().is_private) {
        return;
      }
      this.interval = setInterval(function() {
        return _this.feed_now();
      }, 1000);
      return this.feed_now();
    };



ViewModel.prototype.whois = function(x) {
	 $(document).ready(function() {
		var member=x;
				if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
				{
				
				member=member.substr(1,member.length);
			
				}
		MesajGonder('/',' WHOIS '+member); 
		});
	return;
}


ViewModel.prototype.islem = function(x,nick) {
	var komut;
	var member=nick;
	
		switch(x) {
			case 1:
				if (member.charAt(0)=='@')
				{
				member=member.substr(1,member.length);
				komut='mode '+this.active_channel().name+' -o '+member;
				} 
				else {
				komut='mode '+this.active_channel().name+' +o '+member;
				}
				break;
			case 2:
				if (member.charAt(0)=='+')
				{
				member=member.substr(1,member.length);
				komut='mode '+this.active_channel().name+' -v '+member;
				} 
				else {
				komut='mode '+this.active_channel().name+' +v '+member;
				}
				break;
			case 3:
				if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
				{
				member=member.substr(1,member.length);
				}
				komut='kick '+this.active_channel().name+' '+member;
				break;
			case 4:
					if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
				{
				member=member.substr(1,member.length);
				}
				komut='mode '+this.active_channel().name+' +b  '+member+'!*@*';
				break;
			default:
				komut='-';
				break;
		
		
		
		
		}
	 $(document).ready(function() {
		MesajGonder('/',' '+komut); 
		});
	return;
}
	ViewModel.prototype.degistir = function(x) {
x=x.replaceAll('(nj)','<img src="chat/res/icons/ninja.gif"  height="16">');
x=x.replaceAll('(lv)','<img src="chat/res/icons/luvvvvv.png"  height="16">');
x=x.replaceAll('^&','<img src="chat/res/icons/busted.png"  height="16">');
x=x.replaceAll('(pu)','<img src="chat/res/icons/punky.png"  height="16">');
x=x.replaceAll('%$','<img src="chat/res/icons/pirates.png"  height="16">');
x=x.replaceAll(':)','<img src="chat/res/icons/smile.gif"  height="16">');
x=x.replaceAll(':d','<img src="chat/res/icons/grin.gif"  height="16">');
x=x.replaceAll('*-)','<img src="chat/res/icons/mmm.gif"  height="16">');
x=x.replaceAll(":(",'<img src="chat/res/icons/sad.gif"  height="16">');
x=x.replaceAll(":'(",'<img src="chat/res/icons/cry2.gif"  height="16">');
x=x.replaceAll('(us)','<img src="chat/res/icons/dont-know.gif"  height="16">');
x=x.replaceAll('(a)','<img src="chat/res/icons/angel.gif"  height="16">');
x=x.replaceAll('^o)','<img src="chat/res/icons/ugh.gif"  height="16">');
x=x.replaceAll(':|','<img src="chat/res/icons/not-amused.gif"  height="16">');
x=x.replaceAll(':s','<img src="chat/res/icons/confused.gif"  height="16">');
x=x.replaceAll(':o','<img src="chat/res/icons/shock.gif"  height="16">');
x=x.replaceAll(':*','<img src="chat/res/icons/shock-shake.gif"  height="16">');
x=x.replaceAll('::(','<img src="chat/res/icons/snotty-sad.gif"  height="16">');
x=x.replaceAll(':^)','<img src="chat/res/icons/garth.gif"  height="16">');
x=x.replaceAll(':_)','<img src="chat/res/icons/smile-.gif"  height="16">');
x=x.replaceAll(':p','<img src="chat/res/icons/tounge-wiggle.gif"  height="16">');
x=x.replaceAll('~o','<img src="chat/res/icons/drool.gif"  height="16">');
x=x.replaceAll(';)','<img src="chat/res/icons/wink.gif"  height="16">');
x=x.replaceAll('(h)','<img src="chat/res/icons/kool.gif"  height="16">');
x=x.replaceAll('8o|','<img src="chat/res/icons/grr.gif"  height="16">');
x=x.replaceAll('ys)','<img src="chat/res/icons/yes.gif"  height="16">');
x=x.replaceAll('|n)','<img src="chat/res/icons/no.gif"  height="16">');
x=x.replaceAll('|^:','<img src="chat/res/icons/tart.gif"  height="16">');
x=x.replaceAll('8-)','<img src="chat/res/icons/roll_eyes.gif"  height="16">');
x=x.replaceAll('8-|','<img src="chat/res/icons/nerd.gif"  height="16">');
x=x.replaceAll(':@','<img src="chat/res/icons/angry.gif"  height="16">');
x=x.replaceAll('(6)','<img src="chat/res/icons/devil.gif"  height="16">');
x=x.replaceAll('|-)','<img src="chat/res/icons/sleep.gif"  height="16">');
x=x.replaceAll(':$','<img src="chat/res/icons/shy.gif"  height="16">');
x=x.replaceAll(':-#','<img src="chat/res/icons/shhh.gif"  height="16">');
x=x.replaceAll('(~)','<img src="chat/res/icons/shiner.gif"  height="16">');
x=x.replaceAll('+o(','<img src="chat/res/icons/sick.gif"  height="16">');
x=x.replaceAll(':~','<img src="chat/res/icons/wave.gif"  height="16">');
x=x.replaceAll(':g)','<img src="chat/res/icons/giggle.gif"  height="16">');
x=x.replaceAll(':h)','<img src="chat/res/icons/hysterics.gif"  height="16">');
x=x.replaceAll('(fl)','<img src="chat/res/icons/whistling.gif"  height="16">');
x=x.replaceAll('(i)','<img src="chat/res/icons/idea.gif"  height="16">');
x=x.replaceAll('(hf)','<img src="chat/res/icons/hearts.gif"  height="16">');
x=x.replaceAll(':rb','<img src="chat/res/icons/rabbling.gif"  height="16">');
x=x.replaceAll(':w:','<img src="chat/res/icons/wobble.gif"  height="16">');
x=x.replaceAll('#sp','<img src="chat/res/icons/spin.gif"  height="16">');
x=x.replaceAll('^^:','<img src="chat/res/icons/yay.gif"  height="16">');
x=x.replaceAll('|~','<img src="chat/res/icons/dance.gif"  height="16">');
x=x.replaceAll('(bs)','<img src="chat/res/icons/bull.gif"  height="16">');
x=x.replaceAll('(mo)','<img src="chat/res/icons/cow.gif"  height="16">');
x=x.replaceAll('(gh)','<img src="chat/res/icons/ghost.gif"  height="16">');
x=x.replaceAll('(dk)','<img src="chat/res/icons/drunk.gif"  height="16">');
x=x.replaceAll('(al)','<img src="chat/res/icons/alien.gif"  height="16">');
x=x.replaceAll('(g)','<img src="chat/res/icons/present.gif"  height="16">');
x=x.replaceAll(':br','<img src="chat/res/icons/brr.gif"  height="16">');
x=x.replaceAll('(brb)','<img src="chat/res/icons/brb.gif"  height="16">');
x=x.replaceAll('(as)','<img src="chat/res/icons/ass.gif"  height="16">');
x=x.replaceAll('({)','<img src="chat/res/icons/male-hug.gif"  height="16">');
x=x.replaceAll('(})','<img src="chat/res/icons/fem-hug.gif"  height="16">');
x=x.replaceAll('(ks)','<img src="chat/res/icons/kisses.gif"  height="16">');
x=x.replaceAll('(k)','<img src="chat/res/icons/lips.gif"  height="16">');
x=x.replaceAll('(l)','<img src="chat/res/icons/heart_beat.gif"  height="16">');
x=x.replaceAll('(u)','<img src="chat/res/icons/broken-heart.gif"  height="16">');
x=x.replaceAll('(au)','<img src="chat/res/icons/car.gif"  height="16">');
x=x.replaceAll('(@)','<img src="chat/res/icons/cat.gif"  height="16">');
x=x.replaceAll('(&)','<img src="chat/res/icons/dog.gif"  height="16">');
x=x.replaceAll('(tu)','<img src="chat/res/icons/turtle.gif"  height="16">');
x=x.replaceAll('(brb)','<img src="chat/res/icons/brb.gif"  height="16">');
x=x.replaceAll('(s)','<img src="chat/res/icons/moon.gif"  height="16">');
x=x.replaceAll('(r*)','<img src="chat/res/icons/rainbow-stars.gif"  height="16">');
x=x.replaceAll('(*)','<img src="chat/res/icons/stars.gif"  height="16">');
x=x.replaceAll('~#','<img src="chat/res/icons/peeky.gif"  height="16">');
x=x.replaceAll('|w','<img src="chat/res/icons/togetherness.gif"  height="16">');
x=x.replaceAll('(x)','<img src="chat/res/icons/female.gif"  height="16">');
x=x.replaceAll('(z)','<img src="chat/res/icons/male.gif"  height="16">');
x=x.replaceAll('(ff)','<img src="chat/res/icons/rosey.gif"  height="16">');
x=x.replaceAll('(tx)','<img src="chat/res/icons/texas.gif"  height="16">');
x=x.replaceAll('(f)','<img src="chat/res/icons/flower.gif"  height="16">');
x=x.replaceAll('(w)','<img src="chat/res/icons/wilting.gif"  height="16">');
x=x.replaceAll('(d)','<img src="chat/res/icons/cocktail-x2.gif"  height="16">');
x=x.replaceAll('(b)','<img src="chat/res/icons/beer.gif"  height="16">');
x=x.replaceAll('(c)','<img src="chat/res/icons/cuppa.gif"  height="16">');
x=x.replaceAll('(pi)','<img src="chat/res/icons/pizza.gif"  height="16">');
x=x.replaceAll('(%)','<img src="chat/res/icons/handcuffs.gif"  height="16">');
x=x.replaceAll('(mp)','<img src="chat/res/icons/mobile.gif"  height="16">');
x=x.replaceAll('(so)','<img src="chat/res/icons/football.gif"  height="16">');
x=x.replaceAll('(8)','<img src="chat/res/icons/music-note.gif"  height="16">');
x=x.replaceAll('(e)','<img src="chat/res/icons/email.gif"  height="16">');
x=x.replaceAll('(p)','<img src="chat/res/icons/camera.gif"  height="16">');
x=x.replaceAll('(ci)','<img src="chat/res/icons/ciggy.gif"  height="16">');
x=x.replaceAll('(m)','<img src="chat/res/icons/messenger.gif"  height="16">');
x=x.replaceAll('(?)','<img src="chat/res/icons/asl.gif"  height="16">');
x=x.replaceAll('(pl)','<img src="chat/res/icons/dinner.gif"  height="16">');
x=x.replaceAll('(yn)','<img src="chat/res/icons/fingers-crossed.gif"  height="16">');
x=x.replaceAll('(y)','<img src="chat/res/icons/thumb_up.gif"  height="16">');
x=x.replaceAll('(n)','<img src="chat/res/icons/thumb_down.gif"  height="16">');
x=x.replaceAll('(o)','<img src="chat/res/icons/clock.gif"  height="16">');
x=x.replaceAll('(st)','<img src="chat/res/icons/lightning2.gif"  height="16">');
x=x.replaceAll('(rn)','<img src="chat/res/icons/rain.gif"  height="16">');
x=x.replaceAll('(**)','<img src="chat/res/icons/snow2.gif"  height="16">');
x=x.replaceAll('(um)','<img src="chat/res/icons/umbrella.gif"  height="16">');
x=x.replaceAll('(#)','<img src="chat/res/icons/sun2.gif"  height="16">');
x=x.replaceAll('(ip)','<img src="chat/res/icons/palm-tree.gif"  height="16">');
x=x.replaceAll('(t)','<img src="chat/res/icons/telephone.gif"  height="16">');
x=x.replaceAll(':[','<img src="chat/res/icons/bat2.gif"  height="16">');
x=x.replaceAll('(ap)','<img src="chat/res/icons/plane.gif"  height="16">');
x=x.replaceAll('-sc','<img src="chat/res/icons/scrub.gif"  height="16">');
x=x.replaceAll('(r)','<img src="chat/res/icons/rainbow2.gif"  height="16">');
x=x.replaceAll('(bu)','<img src="chat/res/icons/butterfly.gif"  height="16">');
x=x.replaceAll('(^)','<img src="chat/res/icons/cake.gif"  height="16">');
x=x.replaceAll('-@)','<img src="chat/res/icons/hammering.gif"  height="16">');
x=x.replaceAll('(ed)','<img src="chat/res/icons/egg_dance.gif"  height="16">');
x=x.replaceAll('(eg)','<img src="chat/res/icons/easter-egg.gif"  height="16">');//
x=x.replaceAll('(b^)','<img src="chat/res/icons/bunny3.gif"  height="16">');
x=x.replaceAll('|>','<img src="chat/res/icons/chick-egg.gif"  height="16">');//

x = linkify(x);
return x
}

String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
return str;
};

    return ViewModel;

  })();

  $(document).ready(function() {
    window.view_model = new ViewModel();
    return ko.applyBindings(window.view_model);
  });

}).call(this);
