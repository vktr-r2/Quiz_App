const publishResult = function (scorePercent) {
  if (scorePercent >= 50){
    $('#passed_quiz').show();
    $('failed_quiz').hide();
  } else {
    // if score < 50% render #failed_quiz div
    $('#passed_quiz').hide();
    $('failed_quiz').show();
  }
  // return;
};

$(document).ready(function () {
  publishResult();

});
