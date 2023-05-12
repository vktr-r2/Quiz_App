$(document).ready(function () {

  // Declare variable to keep track of the number of questions
  let questionCount = 0;

  // Click event listener to 'next' button
  $("#next").on("click", function () {

    // Check if '#quiz-name' has value input, if true then hide this part of the form
    if ($("#quiz-name").val()) {

      $(".submit_quiz").hide();

      // Call 'addQuestion' function to append new questions to form
      addQuestion();
    }
  });

  //HELPER FUNCTION - addQuestion
  function addQuestion() {
    //questionCount controls question limit to be 5
    if (questionCount < 5) {
      //Increment questionCount each time addQuestion is called
      questionCount++;

     // Hide the previous question form (if one was already displayed on page)
     $(".question-div").hide();

     //Use JQuery to create div that wraps around question and answers input fields
      const questionDiv = $('<div>', { class: `question-div q${questionCount}` });

      //Append question label and question text input field to div
      const questionLabel = $('<label>', { for: `question${questionCount}`, text: `Question ${questionCount}:` });
      const questionInput = $('<input >', { class: "w-50", type: 'text', id: `question${questionCount}`, name: `question${questionCount}`, required: true });
      questionDiv.append(questionLabel, questionInput, $('<br><br><br>'));

      //Add 'correct'
      const header = $('<h6>', { text: 'Correct', class: 'header-margin' });
      questionDiv.append(header);

      //Use for loop to append 4 answer options and correctAnswerRadio button for each question
      for (let i = 1; i <= 4; i++) {
        const answerLabel = $('<label>', { for: `answer${questionCount}_${i}`, text: `Answer ${i}:` });
        const answerInput = $('<input>', { type: 'text', id: `answer${questionCount}_${i}`, name: `answer${questionCount}_${i}`, required: true });
        const correctAnswerRadio = $('<input>', { type: 'radio', name: `correctAnswer${questionCount}`, value: i, required: true, class: 'radio-margin' });
        questionDiv.append(answerLabel, answerInput, correctAnswerRadio, $('<br><br>'));
      }

      // Create button with type 'button' and text 'Add Question' (type 'button' prevents submit)
      const addButton = $('<button>', { type: 'button', text: 'Add Question' });

      // Add click event listener to the button that checks input validation
      addButton.on('click', function () {
        // Call the 'validateUserInputs' function with questionCount > questionCount tells the function which question it should be checking
        // If the inputs for the current question are valid, proceed to add a new question
        if (validateUserInputs(questionCount)) {
          addQuestion();
        }
      });
      //Append the button to the div
      questionDiv.append(addButton);

      //If user is on 5th question, remove 'addButton', add 'submitButton' and append to div
      if (questionCount === 5) {
        addButton.remove();
        const submitButton = $('<button>', { type: 'submit', text: 'Submit' });
        questionDiv.append(submitButton);
      }
      //Append div to form
      $("#quiz-form").append(questionDiv);
    }
  }

  //HELPER FUNCTION validateUserInputs
  //validate the inputs for the current question
  function validateUserInputs(questionCount) {
    const questionInput = $(`#question${questionCount}`);
    for (let i = 1; i <= 4; i++) {
      const answerInput = $(`#answer${questionCount}_${i}`);
      const radioInput = $(`input[name='correctAnswer${questionCount}']:checked`);

      // Remove previous error highlighting
      questionInput.removeClass("input-invalid");
      answerInput.removeClass("input-invalid");

      // Check if any of the fields are empty or radio button is not selected
      if (!questionInput.val()) {
        questionInput.addClass("input-invalid");
        alert("Please fill in the question field before proceeding.");
        return false;
      }

      if (!answerInput.val()) {
        answerInput.addClass("input-invalid");
        alert("Please fill in all answer fields before proceeding.");
        return false;
      }

      if (!radioInput.val()) {
        alert("Please select the correct answer before proceeding.");
        return false;
      }
    }
    return true;
  }
});
