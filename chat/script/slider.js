	$(document).ready(function() {
		$(".topMenuAction").click( function() {
			if ($("#openCloseIdentifier").is(":hidden")) {
				$("#slider").animate({ 
					marginTop: "-2000px"
					}, 600 );
				//$("#topMenuImage").html('<img src="images/close.png" alt="open" />');
				$("#openCloseIdentifier").show();
			} else {
				$("#slider").animate({ 
					marginTop: "-200px"
					}, 600 );
				//$("#topMenuImage").html('<img src="images/close.png" alt="close" />');
				$("#openCloseIdentifier").hide();
			}
		});  
	});
	
		$(document).ready(function() {
		$(".topMenu-Action").click( function() {
			if ($("#openClose-Identifier").is(":hidden")) {
				$("#slider1").animate({ 
					marginTop: "-2000px"
					}, 600 );
				//$("#topMenu-Image").html('<img src="images/close.png" alt="open" />');
				$("#openClose-Identifier").show();
			} else {
				$("#slider1").animate({ 
					marginTop: "-200px"
					}, 600 );
				//$("#topMenu-Image").html('<img src="images/close.png" alt="close" />');
				$("#openClose-Identifier").hide();
			}
		});  
	});
