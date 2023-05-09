$(document).ready(function () {

  // Declare variable to keep track of the number of questions
  let questionCount = 0;

  // Click event listener to 'next' button
  $("#next").on("click", function () {

    // Check if '#quiz-name' has value input, if true then hide this part of the form
    if ($("#quiz-name").val()) {

      $("#quiz-info").hide();

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
      const questionInput = $('<input>', { type: 'text', id: `question${questionCount}`, name: `question${questionCount}`, required: true });
      questionDiv.append(questionLabel, questionInput, $('<br><br><br>'));

      //Use for loop to append 4 answer options and correctAnswerRadio button for each question
      for (let i = 1; i <= 4; i++) {
        const answerLabel = $('<label>', { for: `answer${questionCount}_${i}`, text: `Answer ${i}:` });
        const answerInput = $('<input>', { type: 'text', id: `answer${questionCount}_${i}`, name: `answer${questionCount}_${i}`, required: true });
        const correctAnswerRadio = $('<input>', { type: 'radio', name: `correctAnswer${questionCount}`, value: i, required: true });
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
  function validateUserInputs(questionNumber) {
    // Loop through the answer inputs for current question
    for (let i = 1; i <= 4; i++) {
      // Check if the answer input has a value, if not return false
      if (!$(`#answer${questionNumber}_${i}`).val()) {
        return false;
      }
    }
    // Check if the question input has a value and if a correct answer radio button is selected
    // If either condition is not met, return false
    if (!$(`#question${questionNumber}`).val() || !$(`input[name=correctAnswer${questionNumber}]:checked`).val()) {
      return false;
    }
    // If all inputs are valid, return true
    return true;
  }
});
