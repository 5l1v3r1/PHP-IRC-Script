
//v1.7
// Flash Player Version Detection
// Detect Client Browser type
// Copyright 2005-2008 Adobe Systems Incorporated.  All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var koyu=0;
var renkler=1;
var ozel=0;

var yanyukseklik;
var aktif;
var kullanicilar;
var tiklanan=0;
var user23;

$(window).load(function(){

          document.getElementById('content').style.display = 'none';
			document.getElementById('bolumn').style.display = 'block';


});


function renleri_yukle () {
var secilen = $('.message_hover')
	secilen.style.backgroundColor=secilen_mesaj_arkaplani;

}

  $('#send_message').click(function() {
        view_model.user_message(user23);
      });
      $('#view_info').click(function() {
	    
		view_model.whois(user23);
      });
	  $('#op').click(function() {
		view_model.islem(1,user23);
      });
	  $('#voice').click(function() {
		view_model.islem(2,user23);
      });
	  $('#kick').click(function() {
		view_model.islem(3,user23);
      });
	  $('#ban').click(function() {
		 view_model.islem(4,user23);
      });
	  
function kanalaGir(kanal) {

MesajGonder('/',' join '+kanal);

}

function baglantiyikapat() {

MesajGonder('baglan',' ');

}
function kanallar()
{
  view_model.add_channel("ozel","!Kanallar");
	MesajGonder('/',' list');
}
function listtemizle()
{
  $("#tbodyid").empty();
}
function listekle(kanal,sayi,topic)
{
   var mytbody = document.getElementById('tbodyid');

    var row = document.createElement('tr');
    var cell1 = document.createElement('td');
	var cell2 = document.createElement('td');
	var cell3 = document.createElement('td');

	var e = document.createElement('div');
	e.innerHTML = topic;
	
	var e2 = document.createElement('div');
	e2.innerHTML = '<a href="#" onclick="kanalaGir(\''+kanal+'\');" >'+kanal+'</a>';
	
	var text2 = document.createTextNode(sayi);
	
	
	
    while(e2.firstChild) {
    cell1.appendChild(e2.firstChild);
	}
	cell2.appendChild(text2);
    row.appendChild(cell1);
	row.appendChild(cell2);
	while(e.firstChild) {
    cell3.appendChild(e.firstChild);
	}
	row.appendChild(cell3);
    mytbody.appendChild(row);

}	


function listbitti()
{
   view_model.user_message("!Kanallar");

}	
function openWindow( url )
{
  window.open(url, '_blank');
  window.focus();
}

function aktifkanalkapat () {

view_model.close();

}

function yukaricikar(gelen){
var kaka=document.getElementById("pencereler").style.top;
if (gelen==1) {
kaka-=200; $('#pencereler3').animate({top: kaka}, 500); 
}
else {
if(kaka!=0) {kaka+=200; $('#pencereler3').animate({top: kaka}, 500); }
}

}


	$('#sol').mousedown( function() {  kaka-=200; $('#pencereler').animate({top: kaka}, 500); });
	$('#sag').mousedown( function() { });


function boyutdegistir( gelen )
{



}

$("#font-size").on("change", function () {
    $("#messages *").css({
        "font-size": $(this).val()
    });
	
	layout.scroll_messages();
});
function whoiscek()
{
	   $(document).ready(function() {

		
	
	
	MesajGonder('/',' whois '+aktif);


		});
}
function nicksifre()
{
	
	  $(document).ready(function() {
	bootbox.prompt("Nick Şifrenizi Giriniz", function(result) {     
		
  if (result === null) {                                             
    Example.show("Şifre Girmediniz");                              
  } else {
	  MesajGonder('/',' privmsg nickserv identify '+result);
                        
  }
	}
	
);


	});

}
function nickdegistir()
{
  	  $(document).ready(function() {
	bootbox.prompt("Yeni Bir Nick Giriniz", function(result) {     
		
  if (result === null) {                                             
    Example.show("Rumuz Girmediniz");                              
  } else {
	  MesajGonder('/',' nick '+result);
                        
  }
	});


	});

}

function kanalagiris()
{
  	  $(document).ready(function() {
	bootbox.prompt("Bir Kanal Adı Giriniz", function(result) {     
		
  if (result === null) {                                             
    Example.show("Kanal Girmediniz");                              
  } else {
	  MesajGonder('/',' join #'+result);
                        
  }
	});


	});

}
function girismusic () {
//new Audio('sound/hosgeldiniz.mp3').play();

}
function ozelikapat () {

	if (ozel==0)
	  {
		  ozel=1;
		  	document.getElementById('ozel').innerHTML='&nbsp;Özel Mesajları Aç';
			view_model.aktifkanal('*','Şu andan itibaren size sadece sizin mesaj gönderdikleriniz, özel mesaj yazabileceklerdir.');
		  	MesajGonder('ozelkapat',' MODE -'+aktif);

		 
	  } else  {
		  ozel=0;
		  document.getElementById('ozel').innerHTML='&nbsp;&nbsp;Özel Mesajları Kapat';
		  			view_model.aktifkanal('*','Özel Mesaj koruması devredışı bırakıldı.');
					MesajGonder('ozelac',' MODE -'+aktif);

	  }
}
function engelle (e) {
	
	if (e==1){
	MesajGonder('/',' silence +'+aktif);
	}
	if (e==2){
	MesajGonder('/',' silence -'+aktif);
	}

}


function bilgiver (yazi) {
document.getElementById('butonbilgi').innerHTML=yazi;
}

function KomutDialogHW(Baslik, Gelen, Height, Width) {
	$("#AnaKomut").html(Gelen);
	$('#KomutDiyalog').dialog("option" , "title" , Baslik);
	$('#KomutDiyalog').dialog("option" , "height" , Height);
	$('#KomutDiyalog').dialog("option" , "width" , Width);
	$("#KomutDiyalog").dialog("open");
}
function nickkayitet () {

	var xHtml =
	"<form id='dlgfrm'><table align='center'>"+
	"<tr><td align='right'>Mail Adresiniz :</td> <td align='right'><input type='text' id='xMail'></td></tr>"+
	"<tr><td align='right'>Şifreniz : </td> <td align='right'><input type='password' id='xSifre'></td></tr>"+
	"<tr><td align='right'>Şifreniz (Tekrar) : </td> <td align='right'><input type='password' id='xSifre2'></td></tr>"+
	"</table></form>";
	$( "#KomutDiyalog" ).dialog( "option", "buttons", [
		{
	text: "  Vazgeç  ",
	click: function() {
		$("#KomutDiyalog").dialog( "close" );
	}
	},
	{
	text: "  Nicki Kaydet  ",
	click: function() {
		var mySifre = $("#xSifre").val();
		var mySifre2 = $("#xSifre2").val();
		var myMail = $("#xMail").val();
		if (mySifre.length == 0 || mySifre2.length == 0 || myMail.length == 0) {
			alert("Lütfen tüm alanları doldurunuz.");
		return;
		}
		if (mySifre != mySifre2) {
			alert("Yazdığınız şifreler uyuşmamaktadır.");
		return;
		}
		MesajGonder("/"," PRIVMSG NICKSERV :REGISTER " + mySifre + " " + myMail);
		$("#KomutDiyalog").dialog( "close" );
	}
	}
	] );
	KomutDialogHW("Nick Kaydı", xHtml, 250, 400);


}
function nicksifresigir () {

	
	
	bootbox.prompt("Nick Şifrenizi Giriniz", function(result) {                
  if (result === null) {                                             
    Example.show("Nick Şifresi Girmediniz");                              
  } else {
	Example.show("Nick Şifreniz Gönderildi");
    MesajGonder('/',' privmsg nickserv identify '+result);                      
  }
});

	 
                        
  


}


function limitiste () {
 $( "#kanalMerkezi" ).dialog( "close" );

var deger=prompt(aktif+" Kanalının kullanıcı limitiniz giriniz","+10");

if (deger!=null)
{
	if (deger.length<2) {
	Example.show("Eksik Parametre Girdiniz");
	} else if (deger.charAt(0) == '-' || deger.charAt(0) == '+') {
	
			Example.show(aktif+ " Kalanı Limiti "+deger+" olarak ayarlandı");
			MesajGonder('/',' mode '+aktif+' +l '+deger);                      

	
	} else {
		Example.show("Limit + veya - ile başlamalıdır.");
	}
  
}

}


function removeSampleRow(id) {
    /***We get the table object based on given id ***/
    var objTable = document.getElementById(id);
 
    /*** Get the current row length ***/
    var iRow = objTable.rows.length;
 
    /*** Initial row counter ***/
    var counter = 0;
 
    /*** Performing a loop inside the table ***/
    if (objTable.rows.length > 1) {
        for (var i = 0; i < objTable.rows.length; i++) {
 
             /*** Get checkbox object ***/
            var chk = objTable.rows[i].cells[0].childNodes[0];
            if (chk.checked) {
                /*** if checked we del ***/
				var sonuc =objTable.rows[i].cells[1].innerHTML;
				Example.show(sonuc + " Yasaklaması Kaldırıldı");
				MesajGonder('/',' mode '+aktif+' -b '+sonuc);  
                objTable.deleteRow(i);
                iRow--;
                i--;
                counter = counter + 1;
            }
        }
 
        /*** Alert user if there is now row is selected to be deleted ***/
        if (counter == 0) {
            alert("Lütfen kaldırmak istediğiniz yasaklamaları seçiniz.");
        }
    }else{
        /*** Alert user if there are no rows being added ***/
        alert("Zaten kanalın yasaklama listesi boş");
    }
}


function addSampleRow(host,nick) {
             
    /*** We get the table object based on given id ***/
    var objTable = document.getElementById('tablo2');
 
    /*** We insert the row by specifying the current rows length ***/
    var objRow = objTable.insertRow(objTable.rows.length);
 
    /*** We insert the first row cell ***/
    var objCell1 = objRow.insertCell(0);
 
    /*** We  insert a checkbox object ***/
    var objInputCheckBox = document.createElement("input");
    objInputCheckBox.type = "checkbox";
    objCell1.appendChild(objInputCheckBox);
 
     /*** We  insert the second row cell ***/
    var objCell2 = objRow.insertCell(1);
    objCell2.innerHTML = host;
	var objCell3 = objRow.insertCell(2);
    objCell3.innerHTML = nick;
}


$( ".body" ).dblclick(function() {
  if (aktif.charAt(0)!='#'&&aktif!='Status')
  MesajGonder('/',' whois '+aktif);
  
  if (aktif.charAt(0)=='#') {
  MesajGonder('/',' mode '+aktif+' +b');
  deleteRow();
  
  }
  if(aktif=='Status')
  MesajGonder('/',' lusers');
  
  return true;
});


function deleteRow() {
            try {
            var table = document.getElementById('tablo2');
            var rowCount = table.rows.length;
 
            for(var i=1; i<rowCount; i++) {
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                
 
 
            }
            }catch(e) {
                alert(e);
            }
}
		
function davetet2 () {

	bootbox.prompt("Kanala Davet Edilecek Rumuz?", function(result) {                
  if (result === null) {                                             
    Example.show("Bir Rumuz Girmediniz");                              
  } else {
	Example.show(result+" "+aktif+" Kanalına davet edildi");
    MesajGonder('/',' invite '+aktif+' '+result);                      
  }
});


}



function kisiara () {
if (aktif.charAt(0)=='#')
{
	bootbox.prompt("Rumuz Giriniz?", function(result) {                
  if (result === null) {                                             
    Example.show("Bir Rumuz Girmediniz");                              
  } else {
	Example.show(result+" Kişi Bilgileri Hazırlanıyor");
    MesajGonder('/',' whois '+result);                      
  }
});
	return;
} else if (aktif!='Status') {

MesajGonder('/',' whois '+aktif);
}

}

function yantaraf (kanal,sayi) {
aktif=kanal;

	
if (kanal=='!Kanallar') {
  document.getElementById('list').style.display = "inline";
  document.getElementById("messages").style.display = "none";
} else {
  document.getElementById('messages').style.display = "inline";
  document.getElementById("list").style.display = "none";

}
if (kanal.charAt(0)=='#')
document.getElementById('kanalbilgisi').innerHTML='&nbsp;'+kanal+'('+sayi+')';
else
document.getElementById('kanalbilgisi').innerHTML='&nbsp;'+kanal;


layout.scroll_messages();
d = document.getElementById("font-size").value;
 $("#messages *").css({
        "font-size": d
    });
	
}


function bolds () {

	  var body;

      body = $('body', $($('iframe.input').contents().get(0)));
		if (koyu==0) {
			koyu=1;	
			body.css('font-weight', 'bold');
		} else {
			body.css('font-weight', 'normal');
			koyu=0;   
		}
		
}

function renk (e) {
	 body = $('#yazi_alani2');
		switch(e) {
		case 1:
			renkler=1;
		body.css('color', 'black');
		break;
		case 2:
			renkler=2;
		body.css('color', 'blue');
		break;
		case 3:
			renkler=3;
		body.css('color', 'green');
		break;
		case 4:
			renkler=4;
		body.css('color', '#243B0B');
		break;
		case 5:
			renkler=5;
		body.css('color', 'red');
		break;
		case 6:
			renkler=6;
		body.css('color', 'gray');
		break;
		default:
			renkler=1;
		body.css('color', 'black');
		break;
		}

}
function ControlVersion()
{
	var version;
	var axo;
	var e;
	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry
	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}
	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";
			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";
			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}
// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}
// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];
        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}
function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}
function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '';
  if (isIE && isWin && !isOpera)
  {
    str += '<object ';
    for (var i in objAttrs)
    {
      str += i + '="' + objAttrs[i] + '" ';
    }
    str += '>';
    for (var i in params)
    {
      str += '<param name="' + i + '" value="' + params[i] + '" /> ';
    }
    str += '</object>';
  }
  else
  {
    str += '<embed ';
    for (var i in embedAttrs)
    {
      str += i + '="' + embedAttrs[i] + '" ';
    }
    str += '> </embed>';
  }
  document.write(str);
}
function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}
function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}
function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    
    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblclick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}
// -->


function MesajGonder( param1, param2) {
	
	if (param1==='/') {
	param2=alias(param2);
	}

	if (swfReady) {
			var currentStatus = getSWF("irc").MesajGonder(param1,param2);
			if (currentStatus==false) {
			api.channel_message('Status','Dikkat Bir Hata Oluştu',currentStatus)
			}
		}
    

}

function alias( gelen ){
	var gidecek;
	var ilk = gelen.indexOf(' ');
	if (ilk>-1) {
	var komut=gelen.substring(1,ilk);
	var devami=gelen.substring(ilk+1,gelen.length);

	if (komut == 'j') {
	if (devami.charAt(0)=='#')
	gidecek= '/join '+devami;
	else
	gidecek= '/join #'+devami;
	return gidecek;
	}
	if (komut == 'p') {
	if (devami.charAt(0)=='#')
	gidecek= '/part '+devami;
	else
	gidecek= '/part #'+devami;
	return gidecek;
	}
	
	if (komut == 'k') {
	if (devami.charAt(0)=='#')
	gidecek= '/kick '+devami;
	else
	gidecek= '/kick #'+devami;
	return gidecek;
	}
	
	if (komut == 'w') {
	gidecek= '/whois '+devami;
	return gidecek;
	}
	if (komut == 'msg') {
	gidecek= '/privmsg '+devami;
	return gidecek;
	}
	}
	
    return gelen;
}

	<!--
	// ------- Private vars -------
	var jsReady = false;
	var swfReady = false;

	// ------- functions called by ActionScript -------
	// called to check if the page has initialized and JavaScript is available
	function isReady() {
		return jsReady;
	}

	// called to notify the page that the SWF has set it's callbacks
	function setSWFIsReady() {
		// record that the SWF has registered it's functions (i.e. that JavaScript
		// can safely call the ActionScript functions)
		swfReady = true;
		
		updateStatus();
	}
	
	// called to notify the page of a new message
	function newMessage(value) {
		// append the message text to the end of the transcript
		document.forms["imForm"].transcript.value += "The Other Person: " + value + "\n";
	}

	// called to notify the page that the SWF user's availability (status) has changed
	function statusChange() {
		updateStatus();
	}

	function updateStatus() {
		
	}
	// ------- event handling -------
	// called by the onload event of the <body> tag
	function pageInit() {
		// record that JavaScript is ready to go.
		
		jsReady = true;
	
		view_model.statussec();
		//renkleri_yukle();
	}

	
	

	// Gets a reference to the specified SWF file by checking which browser is
	// being used and using the appropriate JavaScript.
	// Unfortunately, newer approaches such as using getElementByID() don't
	// work well with Flash Player/ExternalInterface.
	function getSWF(movieName) {
		if (navigator.appName.indexOf("Microsoft") != -1) {
			return window[movieName];
		} else {
			return document[movieName];
		}
	}
	//-->

  
function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
	
    return replacedText;
}
function justAddAdds(target_id, client, slot, width, height) {
  // ugly global vars :-P
  google_ad_client = client;
  google_ad_slot = slot;
  google_ad_width = width;
  google_ad_height = height;
  // inject script, bypassing same-source
  var target = document.getElementById(target_id);
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://pagead2.googlesyndication.com/pagead/show_ads.js';
  target.appendChild(script);
}


function validate1 () {
if (document.getElementById('ayar1').checked == 1){

          Example.show(aktif+ " Kalanı özel moda alındı");
		  MesajGonder('/',' mode '+aktif+' +p');   
		  
	}else{
	
		  Example.show(aktif+ " Kalanı özel modundan çıkartıldı");
		  MesajGonder('/',' mode '+aktif+' -p'); 
	}
}

function validate2 () {
if (document.getElementById('ayar2').checked == 1){

          Example.show(aktif+ " Kalanı +R moduna alındı");
		  MesajGonder('/',' mode '+aktif+' +R');   
		  
	}else{
	
		  Example.show(aktif+ " Kalanı +R  modundan çıkartıldı");
		  MesajGonder('/',' mode '+aktif+' -R'); 
	}
}

function validate3 () {
if (document.getElementById('ayar3').checked == 1){

          Example.show(aktif+ " Kalanı +m moduna alındı");
		  MesajGonder('/',' mode '+aktif+' +m');   
		  
	}else{
	
		  Example.show(aktif+ " Kalanı +m  modundan çıkartıldı");
		  MesajGonder('/',' mode '+aktif+' -m'); 
	}
}