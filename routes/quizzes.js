const { submitQuiz } = require('../db/queries/quizzes');
const questionQueries = require('../db/queries/questions')
const answerQueries = require('../db/queries/answers')
const { addPrivateId, addUserId } = require("../helpers/new_quiz_helpers");

const express = require('express');
const router  = express.Router();

router.get('/new', (req, res) => {
  res.render('new-quiz');
});

router.post('/new', (req, res) => {
  addPrivateId(req.body);
  addUserId(req);
  const quizObj = req.body;
  console.log("QUIZ OBJECT:", quizObj);

  submitQuiz(quizObj.user_id, quizObj.quiz_name, quizObj.private, quizObj.private_id)
    .then((quiz_id) => {
      console.log("QUIZ ID", quiz_id);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });

  res.render('new-quiz');
});

router.get('/submit_quiz', (req, res) => {
  res.render('quiz_submission');
});

router.post('/submit_quiz', (req, res) => {
  // should render results page.
  res.render('....');
});


router.get('/:id', (req, res) => {
  const quizId = req.params.id;

  questionQueries.getQuestionsByQuizId(quizId)
  .then((questions) => {
    answerQueries.getAnswersByQuizId(quizId)
    .then((answers) => {
      const templateVars = {questions, answers}
      // console.log("templateVars", templateVars)
      res.render('questions', templateVars);
    })
  })
  .catch((err) => {
    res.send(err)
  })
});

router.post('/:id', (req, res) => {
  const {answer} = req.body;
  console.log(answer);
})


module.exports = router;
