const {
  submitQuiz,
  submitQuestion,
  submitAnswer,
} = require("../db/queries/quizzes");
const questionQueries = require("../db/queries/questions");
const answerQueries = require("../db/queries/answers");
const { addPrivateId, addUserId } = require("../helpers/new_quiz_helpers");

const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("new-quiz");
});

////////////////////////////////////////////
//POST to '/new' endpoint where quiz will be submitted
router.post("/new", (req, res) => {
  //Adds private_id + userId properties to the submitted quiz object + store req.body in quizObj
  addPrivateId(req.body);
  addUserId(req);
  const quizObj = req.body;

  //submitQuiz query promise function inserts row into quizzes table in db, and returns quiz_id as resolve
  submitQuiz(quizObj)
    .then((quiz_id) => {

      //OUTER loop 5 times, once for each question
      for (let i = 1; i <= 5; i++) {
        //Use template literals to access key related to each question in quizObj
        let questionKey = `question${i}`;
        //questionText is the value of the questionKey property in quizObj
        let questionText = quizObj[questionKey];

        // submitQuestion query promise function inserts row for each question into questions table.  Will loop 5 times (once for each question)
        submitQuestion(quiz_id, i, questionText)
          .then(({ question_id, quiz_id }) => {
          //INNER loop loops through answers submitted for each answer
          for (let j = 1; j <= 4; j++) {
            //Use incrementation of i and j vars to find proper key in quizObj for each answer
            let answer = `answer${i}_${j}`;
            //Use incrementation of i to find proper correct answer
            let correctAnswer = `correctAnswer${i}`;
            //Text submitted for answer stored in variable
            let answerText = quizObj[answer];
            //Compare correctAnswer value from quizObj to the current value of j through this loop iteration.  If true, set isCorrect to true, else set isCorrect to false
            if (quizObj[correctAnswer] === j.toString()) {
              isCorrect = true;
            } else {
              isCorrect = false;
              }
            // Submit the answer to the answers table and end promise chain
            submitAnswer(question_id, answerText, isCorrect, quiz_id)
          }
        });
      }
    })
    //Handle errors from promise chain
    .catch((err) => {
      console.error("Error: ", err);
    });

  console.log('Quiz submitted successfully!!')
  res.render("new-quiz");
});

///////////////////////////////////////////
router.get("/submit_quiz", (req, res) => {
  res.render("quiz_submission");
});

router.post("/submit_quiz", (req, res) => {
  // should render results page.
  res.render("....");
});

router.get("/:id", (req, res) => {
  const quizId = req.params.id;

  questionQueries
    .getQuestionsByQuizId(quizId)
    .then((questions) => {
      answerQueries.getAnswersByQuizId(quizId).then((answers) => {
        const templateVars = { questions, answers };
        // console.log("templateVars", templateVars)
        res.render("questions", templateVars);
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/:id", (req, res) => {
  const { answer } = req.body;
  console.log(answer);
});

module.exports = router;
