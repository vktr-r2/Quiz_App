
//Hide URL on document load, show on click of button
$(document).ready(function(){
  // event.preventDefault();
  $("#show_url").hide();

  $("#share").on("click",function(event){
    event.preventDefault();
    $("#show_url").show();
  });
});
