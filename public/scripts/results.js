$(document).ready(function(){
  $("#show_url").hide();

  $("#share").on("click",function(){
    console.log("Jquery here")
    $("#show_url").show();
  });
});
