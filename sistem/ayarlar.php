<?php

	
	/* Tema Ayarlar� */
	echo !defined("GUVENLIK") ? die("Erisim Engellendi") : null;
	
	/* Oturum Ba�lat */
	session_start();
	
	/* OB S�k��t�rma */
	if(substr_count($_SERVER['HTTP_ACCEPT_ENCODING'],'gzip')){
		ob_end_clean();
        ob_start('ob_gzhandler');
	}else{
		ob_start();
	}
	
	/* Hatalar� Gizle */
	error_reporting(0);

	/* Tarih ve Saat Ayar� */
	date_default_timezone_set('Europe/Istanbul');
	putenv("TZ=Europe/Istanbul");
	@setlocale(LC_ALL, 'turkish'); 
	@setlocale(LC_TIME, 'tr_TR.UTF8');
	
	/* Sabitler */
	define("SITE_BAKIM", "1"); // aktif
	define("SITE_ADI", "");
	
	/* Ba�lant� Ayarlar� */
	$lisans ='';
	$ident='';
	$fullname=';
	$polport='8003';
	$port='7000';
	$portsifre='sifre:ceMEjpczjzjgjzcVhDjDMjc8M3cccmczMTjMcnM7jXcmcPc_cDjzhecqcCcqcmMChGjN09a38d4b833ddbc08522d88056fbec72d8d2f5a9db0e2ab2e9bd2a86e6369ab2h_MpcoMnhMcz';
	$yukseklik="0";
	$genislik="0";
	$otojoin ="0";
	
	/* Tema */ 
	$tema ='mirc';

	//renk ayarlar�
	$kendi_mesajiniz = 'red';
	$kendi_nickiniz = 'black';


	//Bilgi mesajlar�
	$giriscikis=1;
	$modlar=0;
?>