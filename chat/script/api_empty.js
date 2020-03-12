(function () {
    var API;

    API = (function () {
        function API() {
            // This is the constructor of the class
            // Do the initilization here (exp. set nickname)
        }

        // Called from flash
        // Use this function to initilize the user's nickname (only once! do not use this to change nickname)
        API.prototype.set_nickname = function (nickname) {
            return view_model.nickname(nickname);
        };

        // Called from GUI
        // This function is used to confirm the new nickname that the user has choosen
        // Check the new nickname (first argument) with the flash file and if it is valid (exp. not duplicated) declare it by the callback
        API.prototype.change_nickname = function (nickname, callback) {
            // TO DO
            // 1. Validate the nickname
            // 2. If it is valid invoke the callback like this: callback({error:false})
            // 3. If it is not valid invoke the callback like this: callback({error:true, message: 'The new nickname is not valid. <br /> please choose another one.'})
            return this;
        };

        // Called from GUI
        // this functions is used to fetch user info from the flash file
        API.prototype.user_info = function (nickname, callback) {
            // TO DO
            // 1. Use the provided nickname to fetch info about the user
            // 2. Use the callback argument to let the GUI know about the info
            // exp: callback({error: false, body: '<H1>John McDonald</H1><div>Member since: 2012/02/14</div>'})
            return this;
        };

        // Called from GUI
        // this function is used to confirm a channel name before adding it to the tab bar
           API.prototype.add_channel = function(name, callback) {
     
       
        $(document).ready(function() {
		if (name[0]=='#')
		{
		MesajGonder('/',' JOIN '+name); 
		}else
		MesajGonder('/',' JOIN #'+name); 
		});
       callback({
          error: true
        });
      return this;
    };

        // Called from GUI
        // this function is used to declare the closure of a channel
        API.prototype.remove_channel = function (name, callback) {
            // TODO
            // 1. use the provided channel name to check if the channel can be closed
            // 2. if you don't want to allow the user to close this channel use the callback like this: callback({error: true, message: 'You cannot close this channel'})
            // 3. if you want to let the user to close the channel use the callback like this: callback({error: false})
            callback({
          error: false
        });
			$(document).ready(function() {
		if (name.charAt(0)=='#')
		MesajGonder('/',' PART '+name); 
		});
			return this;
        };

        // Called from flash
        // Use this function when a message arrives for a channel
        API.prototype.channel_message = function (channel, sender, message, date) {
          
			if (modegoster==0) {
			if (message.indexOf("*[Mod]")>0)
			return;
			}
            view_model.add_channel_message(date, channel, sender, message);
			api.check_tab(channel);
            return this;
        };

        // Called from flash
        // Use this function when a message arrives for the user
        API.prototype.user_message = function (sender, message, date) {
         
			
            view_model.add_user_message(date, sender, message);
			api.check_tab(sender);
            return this;
        };
		

		API.prototype.check_tab = function (name) {
           		

		var c1 = 'red';
		$('.tab').each(function(){
		var str = $(this).text();
		///trim code
		str = str.replace(/^\s+/, '');
		for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
         
        }
		
		
		if (str!=aktif)
           {
		   if (str==name) {
		   			$(this).css('color', c1);
					break;
		   
		   }
		
           } else {
	
		   layout.scroll_messages();
		   
		   }
		   
		   
		}
		////trim end///
           });
            return this;
        };




        // Called from flash
        // Use this function when a new user joins a channel
        API.prototype.join = function (channel, nickname) {
            var ch, found, m, _i, _j, _len, _len1, _ref, _ref1;

            _ref = view_model.channels();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                ch = _ref[_i];
                if (ch.name === channel || ch.name === '#' + channel) {
                    if (ch.is_private) {
                        return;
                    }
                    found = 0;
                    _ref1 = ch.members();
                    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                        m = _ref1[_j];
                        if (m.nickname() === nickname) {
                            found = 1;
                            break;
                        }
                    }
                    if (!found) {
                        ch.join(nickname);
						if (giriscikis)
						
						var prefixes = {
		'~': '1','~': '2','&': '3','@': '4','%': '5','+': '6'
		};
		ch.members.sort( function( right, left ) {
			var a,b;
		a = right.nickname();
		b = left.nickname();
        a = ( prefixes[ a.charAt(0) ] || '9' ) + a.toLowerCase();
        b = ( prefixes[ b.charAt(0) ] || '9' ) + b.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    });
                    }
                    return this;
                }
            }
            return this;
        };

        // Called from flash
        // Use this function when a user leaves  a channel
        API.prototype.part = function (channel, nickname) {
            var ch, m, _i, _j, _len, _len1, _ref, _ref1;

            _ref = view_model.channels();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                ch = _ref[_i];
                if (ch.name === channel) {
                    if (ch.is_private) {
                        return this;
                    } else {
                        channel = ch;
                        break;
                    }
                }
            }
			
			
			

            _ref1 = channel.members();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                m = _ref1[_j];
				var member=m.nickname();
				if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
				{
				member=member.substr(1,member.length)
				}
                if (member === nickname) {
                    channel.members.remove(m);
					if (giriscikis)
					
					var prefixes = {
		'~': '1','~': '2','&': '3','@': '4','%': '5','+': '6'
		};
		channel.members.sort( function( right, left ) {
			var a,b;
		a = right.nickname();
		b = left.nickname();
        a = ( prefixes[ a.charAt(0) ] || '9' ) + a.toLowerCase();
        b = ( prefixes[ b.charAt(0) ] || '9' ) + b.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    });
                    return this;
                }
            }
            return this;
        };




    API.prototype.kick = function (channel, gonderen,nickname,sebeb) {
            var ch, m, _i, _j, _len, _len1, _ref, _ref1;
			
            _ref = view_model.channels();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                ch = _ref[_i];
                if (ch.name === channel) {
                    if (ch.is_private) {
                        return this;
                    } else {
                        channel = ch;
					
                        break;
                    }
                }
            }
			
			
			

            _ref1 = channel.members();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                m = _ref1[_j];
				var member=m.nickname();
				if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
				{
				member=member.substr(1,member.length)
				}
                if (member === nickname) {
                    channel.members.remove(m);
					if (giriscikis)
					this.channel_message(channel.name,'[*]','<font color="red">'+'<b>'+nickname+'</b> '+gonderen+' tarafindan salondan atildi('+sebeb+')</font>');
					var prefixes = {
		'~': '1','~': '2','&': '3','@': '4','%': '5','+': '6'
		};
		channel.members.sort( function( right, left ) {
			var a,b;
		a = right.nickname();
		b = left.nickname();
        a = ( prefixes[ a.charAt(0) ] || '9' ) + a.toLowerCase();
        b = ( prefixes[ b.charAt(0) ] || '9' ) + b.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
		 });
                    return this;
                } else {
				
				}
            }
            return this;
        };


		API.prototype.rename = function (nickname,newnick) {
            var ch, m, _i, _j, _len, _len1, _ref, _ref1;

            _ref = view_model.channels();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                ch = _ref[_i];
                    if (ch.is_private) {
                       continue;
                    } else {
    
				_ref1 = ch.members();
				for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                m = _ref1[_j];
				var member=m.nickname();
				if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
				{
				member=member.substr(1,member.length)
				}

                if (member === nickname) {
					ch.members.remove(m);

					if (m.nickname().charAt(0)=='~'|| m.nickname().charAt(0)=='&'|| m.nickname().charAt(0)=='@'|| m.nickname().charAt(0)=='%'|| m.nickname().charAt(0)=='+')
					{
					this.join(ch.name, m.nickname().charAt(0)+newnick);
				
					} else {
					this.join(ch.name, newnick);
					}
                    
				
					//this.channel_message(ch.name,'[*]','<font color="#D8D8D8">'+'<b>'+nickname+'</b>'+' Rumuzunu '+'<b>'+newnick+'</b>'+' olarak degistirdi.</font>');
					var prefixes = {
		'~': '1','~': '2','&': '3','@': '4','%': '5','+': '6'
		};
		ch.members.sort( function( right, left ) {
			var a,b;
		a = right.nickname();
		b = left.nickname();
        a = ( prefixes[ a.charAt(0) ] || '9' ) + a.toLowerCase();
        b = ( prefixes[ b.charAt(0) ] || '9' ) + b.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    });
                    continue;
                }
            }

                       
                    }
                
            }
			
			
			

           
            return this;
        };

		API.prototype.modedegis = function (gonderen,channel,isaret,mod,nickname) {
              var ch, m, _i, _j, _len, _len1, _ref, _ref1;
				nickname = nickname.replace(/^\s+/, '');
				for (var i = nickname.length - 1; i >= 0; i--) {
				if (/\S/.test(nickname.charAt(i))) {
				nickname = nickname.substring(0, i + 1);
				break;
				}
				}
				_ref = view_model.channels();
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                ch = _ref[_i];
                if (ch.name === channel) {
                    if (ch.is_private) {
                        return this;
                    } else {
                        channel = ch;
						
                        break;
                    }
                }
				}
			
			
			

				_ref1 = channel.members();
				for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                m = _ref1[_j];
				var member=m.nickname();
				if (member.charAt(0)=='~'|| member.charAt(0)=='~'|| member.charAt(0)=='&'|| member.charAt(0)=='@'|| member.charAt(0)=='%'|| member.charAt(0)=='+')
				{
				
				member=member.substr(1,member.length);
			
				}
                if (member.toLowerCase() == nickname.toLowerCase()) {
					channel.members.remove(m);
					if (isaret=='-') {
					this.join(channel.name, nickname);
					} else {
					if (mod=='q')
					this.join(channel.name, '~'+nickname);
					
					if (mod=='a')
					this.join(channel.name, '&'+nickname);
					
					if (mod=='o')
					this.join(channel.name, '@'+nickname);
					
					if (mod=='h')
					this.join(channel.name, '%'+nickname);
					
					if (mod=='v')
					this.join(channel.name, '+'+nickname);
					}
					
					if (modegoster)
					this.channel_message(channel.name,'[MODE]','<font color="#D8D000">'+'<b>'+gonderen+'</b>'+' Mod degistirdi '+isaret+mod+' '+nickname+'.</font>');
					var prefixes = {
		'~': '1','~': '2','&': '3','@': '4','%': '5','+': '6'
		};
					channel.members.sort( function( right, left ) {
			var a,b;
		a = right.nickname();
		b = left.nickname();
        a = ( prefixes[ a.charAt(0) ] || '9' ) + a.toLowerCase();
        b = ( prefixes[ b.charAt(0) ] || '9' ) + b.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    });
                    return this;
                } 
            }
            return this;
           
            return this;
        };

		API.prototype.removechan = function (channel_name) {
		for(var i=0; i<view_model.channels().length; i++)
		{
		if(view_model.channels()[i].name.toLowerCase() === channel_name.toLowerCase())
		{
		view_model.close_channel(view_model.channels()[i]);
		break;
		}
		}
		}
        // Called from GUI
        // This function is called when the user tries to send a message
         API.prototype.send_message = function(active_tab_title, message, callback) {
      if (message[0] === '/') {
		$(document).ready(function() {

		MesajGonder('/',message); 
		});
		return this;
      } else {
		 callback({
          error: false
        });

		$(document).ready(function() {
		if (koyu==1)
		{
		message=''+message;	
		}
		switch (renkler)
		{
		case 1:
			
		message=message;
		break;
		case 2:
		message='12'+message;
		break;
		case 3:
			message='3'+message;
		break;
		case 4:
			message='7'+message;
		break;
		case 5:
			message='4'+message;
		break;
		case 6:
			message='14'+message;
		break;
		default:
			message='1'+message;
		break;

		}


		MesajGonder(active_tab_title,message); 





		}
		
		
		);
		
      }
      return this;
    };

        return API;

    })();

    $(document).ready(function () {
        return window.api = new API();
    });

}).call(this);

 
