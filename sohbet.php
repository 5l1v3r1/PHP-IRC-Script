<?php 

	/* Ayarlar */
	define("GUVENLIK", true);
	require_once "sistem/ayarlar.php";
	require_once "sistem/fonksiyon.php";
	@error_reporting(E_ALL & ~E_NOTICE);
	@ini_set('error_reporting', E_ALL & ~E_NOTICE); 
	
	
	/* Post veriler */
	$n = p("nick");
	$s = p("sifre");
	$kanal2 = p("kanal");
	
	
	/* Oto giriş formu */
	if ($n==null){
		if ($otojoin=="0") {
			include "index.php";
			exit();
		}
	}
	
	
	/* Site versiyon bilgileri */
	$version = 3;
	preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT'], $matches);
	if (count($matches)>1){
	  $version = $matches[1];
	  switch(true){
		case ($version<=8):
			$version=1;
			break;
		case ($version>8):
			$version=2;
			break;
		default :
			$version=3;
	  }
	}
	if($version<2){
		echo 'Tarayiciniz Desteklenmiyor!';
		exit();
	}

	
	/* Kanal Ayarları */
	if($n==null){
		$n = 'Sohbet'.rand(10,100);
		$nick23 = 1;
	}else{
		$nick23 = 0;
	}
	if ($s==null){
		$s = 'Sifre';
	}		
	if ($check==null){
		$check = '#Zurna';
	}	
	if ($i==null){
		$i = '0';
	}
	
	
?>


<!DOCTYPE HTML>
<html lang="tr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="language" content="TR" />
	<meta name="robots" content="index, follow">
		
	<title><?php echo SITE_ADI; ?> Sohbet Sayfası</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	
	<!-- css -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
	<link href="chat/stylesheets/<?php echo $tema;?>.css?<?php echo time(); ?>" rel="stylesheet" />
	<link href="chat/stylesheets/messi.css" rel="stylesheet" />
	<link href="chat/stylesheets/ie.css" rel="stylesheet" />
	<link href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" rel="stylesheet" />
	<link href="chat/stylesheets/son.css" rel="stylesheet" />
	<link rel="stylesheet" href="assets/css/style.css?<?php echo time(); ?>"/>
	
	
	<!-- js -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script>
		function launchFullscreen(element) {
			if(element.requestFullScreen) {
				element.requestFullScreen();
			} else if(element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if(element.webkitRequestFullScreen) {
				element.webkitRequestFullScreen();
			}
		}

		function cancelFullscreen() {
			if(document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}

		function dumpFullscreen() {
			console.log("document.fullScreenElement is: ", document.fullScreenElement || document.mozFullScreenElement || document.webkitFullScreenElement);
			console.log("document.fullScreenEnabled is: ", document.fullScreenEnabled || document.mozScreenEnabled || document.webkitScreenEnabled);
		}

		<?php 
			if ($version==3)
			echo '
				document.addEventListener("fullscreenchange", function(e) {
				  console.log("fullscreenchange event! ", e);
				});
				document.addEventListener("mozfullscreenchange", function(e) {
				  console.log("mozfullscreenchange event! ", e);
				});
				document.addEventListener("webkitfullscreenchange", function(e) {
				  console.log("webkitfullscreenchange event! ", e);
				});
			';
		?>
	</script>
	
	<script>
		var yukseklik = <?php echo $yukseklik;?>;
		var genislik = <?php echo $genislik;?>;
		var kendi_mesajiniz = "<?php echo $kendi_mesajiniz;?>";
		var kendi_nickiniz = "<?php echo $kendi_nickiniz;?>";
		var tema = "<?php echo $tema;?>";
		var tarayici = <?php echo $version;?>;
		var modegoster = <?php echo $modlar;?>;
		var giriscikis = <?php echo $giriscikis;?>;
	</script>
  
</head>
<body onload="pageInit()">

<!-- row -->
<div class="row">
	
	
	<!-- header -->
	<header id="header">
		
		<!-- kanal bilgisi -->
		<div id="kanalbilgisi" class="col-md-12"></div>
		
		<div class="clear"></div>
		
		<!-- özellikler -->
		<div class="ozellikler col-md-12">
			<?php if($version > 2 ) { ?>

			<a href="#" onclick="MesajGonder('/', ' silence +');" class="btn btn-success">ÖM Kapat</a>
			<a href="#" onclick="MesajGonder('/', ' silence -');"class="btn btn-success">ÖM Aç</a>
			<a href="#" onclick="nickkayitet();" class="btn btn-success">Nick Kayıt</a>
			<a href="#" onclick="nicksifresigir();" class="btn btn-success">Tanıt</a>
			<a href="#" onclick="kanallar();" class="btn btn-success">Kanallar</a>
			<a href="#" onclick="view_model.mesajsil();"class="btn btn-success">Temizle</a>

			<?php } ?>
		</div>
		
		<div class="clear"></div>
		
		<!-- mesaj/kanallar -->
		<div class="header col-md-12">
			<div class="mesaj col-md-4">
				<strong>Karşılaşma Mesajı</strong>>| <span style="color:#08088A">  <b>L   </b></span><b> <span style="color:green">  </span></b>A    <span style="color:red">  <b>K   </b></span><b> <span style="color:#8A0868">  </span></b>L   <span style="color:#243B0B">  </span> <span style="color:#243B0B">  <b>A   </b></span><b> <span style="color:teal">  </span></b>K   <span style="color:fuchsia"> .  </span> <span style="color:lime"> N   </span> <span style="color:gray">  <b>E   </b> </span> <span style="color:aqua"> T </span>
			</div>
			<div class="tab-bar2 col-md-8">
				<div class="tabs" data-bind="foreach: channels" id="pencereler3">
					<div id="tab" class="tab" data-bind="click: $parent.select_channel, css: { active: $parent.active_channel() == $data }">
						<div class="mid btn btn-danger">
							<img width="16px" height="16px" data-bind="attr:{src: images}" />
							<span data-bind="text: name"></span>
						</div>
						<a title="Kapat" class="icons-close" data-bind="click: $parent.close_channel, visible: !is_system"></a>
					</div>
				</div>
			</div>
		</div>
		
		<div class="clear"></div>
	</header>

	
	<!-- main -->
	<main id="main">
	
		<!-- Sohbet penceresi -->
		<div class="body sohbet-penceresi col-md-10 col-xs-12 col-sm-12">
		
			<div class="chrome" id="chrome">
				<div class="list" id="list">	
					<table class="sortable" id="sortable">
						<thead>
							<tr>
								<th data-sort="string" width="299px">Kanal</th>
								<th width="99px" data-sort="int">Kullanıcı Sayısı</th>
								<th data-sort="string" width="100%">[Modlar] Giriş Mesaji</th>
							</tr>
						</thead>
						<tbody id="tbodyid">

						</tbody>
					</table>

				</div>
				
				<div class="messages" data-bind="with: active_channel" id="messages">
					<div class="yazialani" data-bind="foreach: messages" id="yazialani">
						<div class="message" data-bind="attr: { sender: sender }" >
							<div class="parantez">
								<span data-bind="text: parantez1"></span>
							</div>
							<div class="member" data-bind="text: sender, style:{color:color}"></div>
							<div class="parantez">
								<span data-bind="text: parantez2">
							</div>
							<div class="text" id="text" data-bind="html: message"></div>
						</div>
					</div>
				</div>
			</div>
		
		</div>
		
		<!-- Kullanıcılar -->
		<div class="kullanicilar col-md-2 col-xs-12 col-sm-12">
			
			<div class="members" data-bind="with: active_channel(), visible: active_channel() && !active_channel().is_private">

				<div id="box" class="box" data-bind="foreach: members">
					<div class="member" data-bind="click: $root.user_message, event: { contextmenu: $root.user_context }, text: nickname, style: { color: color }">					
							</div>
				</div>
						
			</div>
		
		</div>
		
		<div class="body">
			
		</div>
		
	</main>




</div>








<div id="bolumn" class="Sayfa"> 




    
	
    <div class="editor">
	 <div id="sliderWrap" style="background-color:#E6E6FA;position: absolute; left: 30px;">
        <div style="display: block;" id="openCloseIdentifier">
        </div>
        <div style="margin-top: -1000px;" id="slider">
            <div id="sliderContent">
                <div id="wndEmotsWindowContainerSub" style="padding: 10 10 10 10;">
                    <iframe id="wndFEmots" src="chat/res/wndEmoticons.htm" style="height: 165px;
                        width: 295px; margin: 0px;" frameborder="0"></iframe>
                    <table style="padding-top: 2px;
                        padding-bottom: 10px; border-top: 1px solid #ccc;" border="0" cellpadding="0" cellspacing="0" width="295" bgcolor="#E6E6FA">
                        <tbody><tr>
                          
                            <td style="color: #000; font-weight: normal; font-family: Tahoma;
                                font-size: 10pt; font-weight: bold; width: 100%;" bgcolor="#E6E6FA" align="left" valign="middle">
                                &nbsp;Gülücükler
                            </td>
                            <td style="width: 28px; text-align: right;" bgcolor="#E6E6FA">
                                <div id="openCloseWrap">
                                    <a href="#" class="topMenuAction" id="topMenuImage"><img src="chat/images/close.png" alt="open"></a>
                                </div>
                            </td>
                          
                        </tr>
                    </tbody></table>
                </div>
            </div>
        </div>
    </div>
	
	    <div class="chatarea">
      <iframe class="input" id="mesaj_alani" scrolling="no"  style="width:375px; height: 50px; margin: 0px; overflow: auto; font-style: normal; font-weight: normal;"></iframe>
      <div class="ust3">
	  
	  
   
	  </div>
	  <div class="ust2">
      <div class="pad">
		<a class="topMenuAction" id="topMenuImage"></a>
      <span class="txtbold">
	  
	  <a class="bold" id="bold" href="#" onclick="bolds();"></a>
	  &nbsp;&nbsp;
	    <select data-mini="true" data-inline="true" class="ui-btn-left" id="font-size">
        <option value="14px">14</option>
        <option value="10px">10</option>
        <option value="12px">12</option>
        <option value="13px">13</option>
        <option value="15px">15</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
    </select></span>
	
        <div class="clrPad">
          <input id="button1" type="button" onclick="renk(1)" style="background:black" />
          </input>
          <input id="button1" type="button" onclick="renk(2)" style="background:blue" />
          </input>
          <input id="button1" type="button" onclick="renk(3)" style="background:green" />
          </input>
          <input id="button1" type="button" onclick="renk(4)" style="background:orange" />
          </input>
          <input id="button1" type="button" onclick="renk(5)" style="background:red" />
          </input>
          <input id="button1" type="button" onclick="renk(6)" style="background:#848484" />
          </input>
          <div class="mclear"></div>
        </div>
        <div class="mclear"></div>
      </div>
      </div>
    </div>
    </div>
   

 
  <div id="context_menu">
        <a id="send_message">Özel Mesaj</a>
        <a id="view_info">Profil</a>
		<a id="sep">-------</a>
        <a id="op">Op Ver/Al</a>
		<a id="voice">Voice Ver/Al</a>
		<a id="sep">-------</a>
        <a id="kick">Kanaldan At</a>
		<a id="ban">Banla</a>
	

</div>

</div>


	<?php 
	if ($version>2) {
	echo '<script src="chat/script/jquery-2.0.3.min.js"></script>
    <script src="chat/script/knockout-3.0.0.js"></script>';
	}
	if($version<3) {
	echo '<script src="chat/script/jquery-1.11.0.min.js"></script>
    <script src="chat/script/knockout-2.2.1.js"></script>';
	}
	?>
    <script src="chat/script/tab_bar.js"></script>
    <script src="chat/script/layout.js"></script>
    <script src="chat/script/view_model.js"></script>
    <script src="chat/script/api_empty.js"></script>
	<script src="chat/script/ek-min.js"></script>
	<script src="chat/script/slider.js"></script>
	<script src="chat/script/popup.js"></script>
	<script src="chat/script/bootbox.min.js"></script>
	<script src="chat/script/jquery-ui.js"></script>
	<script src="chat/script/stupidtable.js"></script>
	<script src="chat/script/example.js"></script>
	<script src="chat/script/numeric.js"></script>
	<script>

	$("#mesaj_alani2").keydown(function(e){
		if (e.keyCode == 13)
		{
		   var mesaj = jQuery("textarea#mesaj_alani2").val();
		   if (mesaj.length>0)
		   view_model.send(mesaj);
			document.getElementById("mesaj_alani2").value = "";
			 $('#reply_message').focus();
			return false;
		}
	}); 
	</script>
 
	<script language="JavaScript" type="text/javascript">

	var deger ='nick='+"<?php echo $n; ?>"+'&nicksifre='+"<?php echo $s; ?>"+'&otojoin='+"<?php echo $kanal2; ?>"+'&ident='+"<?php echo $ident; ?>"+'&port='+"<?php echo $port; ?>"+'&polityport='+"<?php echo $polport; ?>"+'&fullname='+"<?php echo $fullname; ?>"+'&portsifre='+"<?php echo $portsifre; ?>"+'&lisans='+"<?php echo $lisans; ?>";
			
		AC_FL_RunContent(
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
			'width', '1',
			'height', '1',
			'src', 'irc',
			'quality', 'high',
			'pluginspage', 'http://www.adobe.com/go/getflashplayer',
			'align', 'middle',
			'play', 'true',
			'loop', 'true',
			'scale', 'showall',
			'wmode', 'window',
			'devicefont', 'false',
			'flashvars', deger,
			'id', 'irc',
			'bgcolor', '#ffffff',
			'name', 'irc',
			'menu', 'false',
			'allowFullScreen', 'false',
			'allowScriptAccess','sameDomain',
			'movie', 'irc',
			'salign', ''
			); //end AC code

	 $(function() {
		$( "#dialog" ).dialog({
		  title: "ChatV2 Hakkında",
		  autoOpen: false,
		  width: 375,
		  height: 280,
		  resizable: false,
		  buttons: {
			Kapat: function() {
			  $( this ).dialog( "close" );
			}
		  }
		 });
	  
		$( "#about" ).click(function() {
		  $(".ui-dialog-titlebar").hide();
		  $( "#dialog" ).dialog( "open" );
		});
		
		
		  $( "#kanalMerkezi" ).dialog({
		  title: aktif+" Kanalı Kontrol Merkezi",
		  autoOpen: false,
		  width: 375,
		  height: 280,
		  resizable: false,
		  buttons: {
			Kapat: function() {
			  $( this ).dialog( "close" );
			}
		  }
		 });
	  });
	  
	  $(function() {
	 
		$( "#color" ).click(function() {
		yazirenkleri();
		});
	  });
	 
	 
	</script>
	<script language="javascript">
	function CopyText(){

		var txt = '';
		// props to Sabarinathan Arthanari for sharing with the world how to get the selected text on a page, cheers mate!
			if (window.getSelection) { txt = window.getSelection(); }
			else if (document.getSelection) { txt = document.getSelection(); }
			else if (document.selection) { txt = document.selection.createRange().text; }
			else alert('Something went wrong and I have no idea why - please contact me with your browser type (Firefox, Safari, etc) and what you tried to copy and I will fix this immediately!');

		// If the user has nothing selected after pressing Ctrl/Meta, they might want to copy what you want them to copy. 
			if(txt=='') {
					copyBox.select();
			}
		// They also might have manually selected what you wanted them to copy! How unnecessary! Maybe now is the time to tell them how silly they are..?!
			else if (txt == copyBox.get('value')) {
			alert('This site uses advanced copy/paste technology, possibly from the future.\n \nYou do not need to select things manually - just press Ctrl+C! \n \n(Ctrl+V will always paste to the main box too.)');
					copyBox.select();
			} else {
					// They also might have selected something completely different! If so, let them. It's only fair.
			}

	}


	  $(function() {
	 
	 $("#KomutDiyalog").dialog({
			modal: true,
			autoOpen: false,
			height: 200,
			width: 400,
			closeOnEscape: false
		});
		

	  });
	  
	  
	  $("#sortable").stupidtable();
	</script>
   <script>
        $(function() {
            Example.init({
                "selector": ".bb-alert"
            });
        });
    </script>
	<div style="display:none;">
		<noscript>
			<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="650" height="400" id="irc" align="middle">
			<param name="allowScriptAccess" value="sameDomain" />
			<param name="allowFullScreen" value="false" />
			<param name="movie" value="irc.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="irc.swf" quality="high" bgcolor="#ffffff" width="650" height="" name="irc" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" />
			</object>
		</noscript>
	</div>

	<div id="dialog" title="Basic dialog">
		<div class="hakkimizda3">
			<div class="yazi">Bu sistem <a href="http://laklak.net" target="_blank">laklak.net</a></br>tarafından hazırlanmıştır.</div>
		</div>
	</div>

	<div id="kanalMerkezi" class="kanalMerkezi" >
		<div class="banlar" >


			<TABLE id="tablo2" style="width: 100%;height: 100%;">

				<THEAD>
					<TR>
						<TH>-</TH>
						<TH>Yasaklanan Adres</TH> 
						<TH>Yasaklayan</TH> 
					</TR>
				</THEAD>

				<TBODY>


				</TBODY>
			</TABLE>
		</div>

		 <div class="kanalayar" >
			</br>
			<input type="button" id="btnDelete" value="Secilen yasakları Kaldır" onclick="removeSampleRow('tablo2')"></input>
			</br>
			<div class="right2">
				<input type="checkbox" id="ayar1" onclick="validate1()">Özel Moda Al<br>
				<button onclick="limitiste()">Limit Koy</button>
			</div>
			<div class="left2">
				<input type="checkbox" id="ayar2" onclick="validate2()">Sadece Kayıtlı Nickler<br>
				<input type="checkbox"  id="ayar3" onclick="validate3()">Konusmaya Kapat
			</div>
		 </div>
		 
	</div>

	<div id="KomutDiyalog" title="Komut Girişi">
		<p id="AnaKomut" class="validateTips">&nbsp;</p>
	</div>

	<div class="bb-alert alert alert-info" style="display:none;">
        <span>The examples populate this alert with dummy content</span>
    </div>
	
</div>
	 
	<div class="content" id="content" >
		<div class="ball"></div>
		<div class="ball1"></div>
		<div><center><span style="color:white">Lütfen Bekleyiniz!</br> Chat Sayfası Yükleniyor...</span></center></div>
	</div>
 
 
	<!-- js -->
	<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="assets/js/script.js"></script>
	
	
			
</body>
</html>
