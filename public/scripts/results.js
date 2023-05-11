
//Hide URL on document load, show on click of button
$(document).ready(function(){
  $("#show_url").hide();

  $("#share").on("click",function(){
    $("#show_url").show();
  });
});
