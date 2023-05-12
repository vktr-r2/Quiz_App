const {
  submitQuiz,
  submitQuestion,
  submitAnswer,
} = require("../db/queries/quizzes");
const questionQueries = require("../db/queries/questions");
const answerQueries = require("../db/queries/answers");
const resultQueries = require("../db/queries/results");
const insertResultQueries = require("../db/queries/insertResult");
const updateResultQueries = require("../db/queries/updateResult");
const { addPrivateId, addUserId } = require("../helpers/new_quiz_helpers");

const express = require('express');
const cookieParser = require('cookie-parser')
const router  = express.Router();

router.use(cookieParser())

router.get('/new', (req, res) => {
  res.render('new-quiz');
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

      //Set session for quiz_id
      req.session.quiz_id = quiz_id;

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
      res.redirect("confirm");
    })
    //Handle errors from promise chain
    .catch((err) => {
      console.error("Error: ", err);
    });
});

//GET confirm page (after submitting quiz)
router.get('/confirm', (req, res) => {
  //Retrieve quiz_id from session
  console.log('logging anything')
  const quiz_id = req.session.quiz_id;

  console.log('this is quiz id:', quiz_id)

  const quizURL = req.protocol + '://' + req.headers.host + '/quizzes/' + quiz_id;
  console.log('this is quiz url:', quizURL)

  const templateVars = { quizURL }
  //Delete quiz_id from session
  // delete req.session.quiz_id;
  res.render('confirm', templateVars);
});

///////////////////////////////////////////
router.get("/submit_quiz", (req, res) => {
  res.render("quiz_submission");
});

router.post("/submit_quiz", (req, res) => {
  // should render results page.
  res.render("....");
});

//////////////////////////////////////////////////
// get questions page using quizId
router.get("/:id", (req, res) => {
  const quizId = req.params.id;
  const qNum = req.query.qNum || 1
  // get questions objects of array from questions table
  questionQueries.getQuestionsByQuizId(quizId)
  .then((questions) => {
    // get answers objects of array from answers table
    answerQueries.getAnswersByQuizId(quizId)
    .then((answers) => {
      // make question to choose index 0 from questions array
      const question = questions[qNum - 1]
      const templateVars = {question, answers}
      res.render('questions', templateVars);
    })
    .catch((err) => {
      res.send(err);
    });
  });
});

router.post('/:id', (req, res) => {
  const quizId = req.params.id;
  const userId = req.cookies.userId;
  const {answer, nextQ} = req.body;

  resultQueries.getResultByQuizIdAndUserId(quizId, userId)
  .then((result) => {
    // check if result exists, giving userId, QuizId
    if(!result) {
      // If result does not exist and answer is false, create result with at 0 or answer is true, create result with at 1
      insertResultQueries.insertResultsByQuizIdAndUesrId(quizId, userId, answer === "true" ? 1 : 0)
    } else {
      let newResult = result.result + (answer === "true" ? 1 : 0);
      updateResultQueries.updateResultsByQuizIdAndUesrId(quizId, userId, newResult)
    }
    if(nextQ === undefined) {
      res.redirect(`/results/${quizId}/${userId}/quiz_result`)
    } else {
      res.redirect(`/quizzes/${quizId}?qNum=${nextQ}`)
    }
  })
});


module.exports = router;
