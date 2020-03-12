

function numeric_kontrol (no,mesaj) {

   if (no==367) {
   var res = mesaj.split(" ");
   addSampleRow(res[2],res[3]);
   }
   if (no==368) {
   var res = mesaj.split(" ");
  $(".ui-dialog-title").text(res[1]+" Kanalı Kontrol Merkezi"); 
  $( "#kanalMerkezi" ).dialog( "open" );
   }

}