<?php

	echo !defined("GUVENLIK") ? die("Erisim Engellendi.") : null;

	## IP Adresi ##
	function IP(){
		if(getenv("HTTP_CLIENT_IP")) {
			$ip = getenv("HTTP_CLIENT_IP");
		} elseif(getenv("HTTP_X_FORWARDED_FOR")) {
			$ip = getenv("HTTP_X_FORWARDED_FOR");
			if (strstr($ip, ',')) {
				$tmp = explode (',', $ip);
				$ip = trim($tmp[0]);
			}
		} else {
		$ip = getenv("REMOTE_ADDR");
		}
		return $ip;
	}
	
	## Curl Bağlantısı ##
	function _CurlBaglan ( $URL, $ssl = false, $iconv = false ) {
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_URL, $URL);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER["HTTP_USER_AGENT"]);
			if ($ssl){
				curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
			}
			$cikti = (curl_exec($curl));
			curl_close($curl);
			return str_replace(array("\n", "\t", "\r"), null, $cikti);
	}
	
	function p($par, $st = false){
		if ($st){
			return htmlspecialchars(addslashes(trim($_POST[$par])));
		}else {
			return addslashes(trim($_POST[$par]));
		}
	}
	
	function g($par){
		return strip_tags(trim(addslashes($_GET[$par])));
	}
	
	function kisalt($par, $uzunluk = 50){
		if (strlen($par) > $uzunluk){
			$par = mb_substr($par, 0, $uzunluk, "UTF-8")."..";
		}
		return $par;
	}
	
	function go($par, $time = 0){
		if ($time == 0){
			header("Location: {$par}");
		}else {
			header("Refresh: {$time}; url={$par}");
		}
	}
	
	function session($par){
		if ($_SESSION[$par]){
			return $_SESSION[$par];
		}else {
			return false;
		}
	}
	
	function cookie($par){
		if ($_COOKIE[$par]){
			return $_COOKIE[$par];
		}else {
			return false;
		}
	}
	
	function ss($par){
		return stripslashes($par);
	}
	
	function session_olustur($par){
		foreach ($par as $anahtar => $deger){
			$_SESSION[$anahtar] = $deger;
		}
	}
	
	function sef_link($baslik){
		$bul = array('Ç', 'Ş', 'Ğ', 'Ü', 'İ', 'Ö', 'ç', 'ş', 'ğ', 'ü', 'ö', 'ı', '-');
		$yap = array('c', 's', 'g', 'u', 'i', 'o', 'c', 's', 'g', 'u', 'o', 'i', ' ');
		$perma = strtolower(str_replace($bul, $yap, $baslik));
		$perma = preg_replace("@[^A-Za-z0-9\-_]@i", ' ', $perma);
		$perma = trim(preg_replace('/\s+/',' ', $perma));
		$perma = str_replace(' ', '-', $perma);
		return $perma;
	}
	
	function query($query){
		return mysql_query($query);
	}
	
	function row($query){
		return mysql_fetch_array($query);
	}
	
	function rows($query){
		return mysql_num_rows($query);
	}
	
	function getAy($ay){
		if ($ay == "1"){
			$ay = "Ocak";
		} elseif ($ay == "2"){
			$ay = "Şubat";
		} elseif ($ay == "3"){
			$ay = "Mart";
		} elseif ($ay == "4"){
			$ay = "Nisan";
		} elseif ($ay == "5"){
			$ay = "Mayıs";
		} elseif ($ay == "6"){
			$ay = "Haziran";
		} elseif ($ay == "7"){
			$ay = "Temmuz";
		} elseif ($ay == "8"){
			$ay = "Ağustos";
		} elseif ($ay == "9"){
			$ay = "Eylül";
		} elseif ($ay == "10"){
			$ay = "Ekim";
		} elseif ($ay == "11"){
			$ay = "Kasım";
		} elseif ($ay == "12"){
			$ay = "Aralık";
		}
		return $ay;
	}
	
?>