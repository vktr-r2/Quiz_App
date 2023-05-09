$(document).ready(function() {
  let clickCount = 0;

  $('#quizSubmitForm').on("submit",function(event) {
    event.preventDefault();
    console.log("Test first statement")
    clickCount++;
    if (clickCount === 1) {
      $.ajax({
        type: "POST",
        url: "/quizzes/new",
        data: $('#quizSubmitForm').serialize(),
        success: function() {
          $('#quizSubmitForm').hide();
          $('#submit_question_1').show();
        },
        error: function() {
          console.log("Error submitting quiz");
        }
      });
    }
  });


  $('#question_submit_button').on("click", function(event) {
    event.preventDefault();
    console.log("Test SECOND listener")
    clickCount += 1;
    console.log("Current clickCount =", clickCount);
    if (clickCount === 3) {
      $('#submit_question_1').hide();
      $('#submit_question_2').show();
    } else if (clickCount === 4) {
      $('#submit_question_2').hide();
      $('#submit_question_3').show();
    } else if (clickCount === 5) {
      $('#submit_question_3').hide();
      $('#submit_question_4').show();
    } else if (clickCount === 6) {
      $('#submit_question_4').hide();
      $('#submit_question_5').show();
    } else if (clickCount === 7) {
      $('#questionSubmitForm').submit();
    }
  });
});
