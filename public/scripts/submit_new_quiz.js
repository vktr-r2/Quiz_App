$(document).ready(function () {
  let questionCount = 0;

  $("#next").on("click", function () {
    if ($("#quiz-name").val()) {
      $("#quiz-info").hide();
      addQuestion();
    }
  });

});
