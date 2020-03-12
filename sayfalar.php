<?php

$giris_ekrani = '<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>LakLak.Net : SOHBET</title>
  <link rel="stylesheet" href="chat/css/stylelogin.css">
  <!--[if lt IE 9]><script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body>
  <section class="container">
    <div class="login">
      <h1>Sohbete Şimdi Başlayın</h1>
      <form method="post" action="sohbet.php">
        <p><input type="text" name="nick" value="" placeholder="Rumuzunuz"></p>
        <p><input type="password" name="sifre" value="" placeholder="Varsa Sifreniz"></p>
        <p class="remember_me">
          <label>
            <input type="checkbox" name="remember_me" id="remember_me">
            Oto Giris Kanallarina Katil
          </label>
        </p>
        <p class="submit"><input type="submit" name="commit" value="Giris"></p>
      </form>
    </div>

    <div class="login-help">
      <p> <a href="index.html"></a>.</p>
    </div>
  </section>

  <section class="about">
      <p class="about-author">
      &copy; 2016&ndash;2017 <a href="http://laklak.net" target="_blank">sohbet</a>
    
  </section>
</body>
</html>
';


?>