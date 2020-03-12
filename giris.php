<?php 
	
	require_once "sistem/ayarlar.php";
	require_once "sistem/fonksiyon.php";

?>

<!DOCTYPE HTML>
<html lang="tr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="language" content="TR" />
	
	<title><?php echo SITE_ADI; ?> Giriş Sayfası</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	
	<!-- css -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="assets/css/style.css?<?php echo time(); ?>"/>
	
	<!-- js -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	
</head>
<body>

	<div class="container">    
        <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
            <div class="panel panel-info" >
                <div class="panel-heading">
                    <div class="panel-title text-center">Sohbete Şimdi Başlayın</div>
                </div>     

                <div style="padding-top:30px" class="panel-body" >
                    <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>
					<form id="loginform" class="form-horizontal" role="form" method="POST" action="sohbet.php">
						<div style="margin-bottom: 25px" class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
							<input id="login-username" type="text" class="form-control" name="nick" value="" placeholder="Nickiniz">                                        
						</div>
						
						<div style="margin-bottom: 25px" class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
							<input id="login-password" type="password" class="form-control" name="sifre" placeholder="Şifreniz">
						 </div>
						 
						<div class="input-group">
							<div class="checkbox">
								<label>
									<input id="login-remember" type="checkbox" name="remember_me" value="1"> Oto Giris Kanallarina Katil
								</label>
							</div>
						</div>
						
						<div style="margin-top:10px" class="form-group">
							<div class="col-sm-12 controls">
								<button id="btn-login" name="commit" class="btn btn-success">Giriş Yap</button>
							</div>
						</div>
						
						<div class="form-group">
							<div class="col-md-12 control">
								<div style="border-top: 1px solid#888; padding-top:15px; font-size:85%" >
										© 2016–2017 sohbet
								</div>
							</div>
						</div>    
                    </form>    
                </div>                     
            </div>  
        </div>    
    </div>
    
	
	
	
	
	<!-- js -->
	<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
	
</body>
</html>