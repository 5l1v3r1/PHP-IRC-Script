<?php

	define("GUVENLIK", true);

	require_once "sistem/ayarlar.php";
	
	// 0 kapalı - 1 açık
	
	// kontrol
	if (SITE_BAKIM == 1){
		// site açık
		require("/giris.php");
	}else {
		// site kapalı
		echo "Sitemizde bakım çalışması yapılmaktadır..";
	}

?>