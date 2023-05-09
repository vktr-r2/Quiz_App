const submitQuiz = require('../db/queries/quizzes');
const questionQueries = require('../db/queries/questions')
const answerQueries = require('../db/queries/answers')
const { addPrivateId } = require("../helpers/new_quiz_helpers");

const express = require('express');
const router  = express.Router();

router.get('/new', (req, res) => {
  res.render('new-quiz');
});

router.post('/new', (req, res) => {
  // const { question, answer } = req.body;
  addPrivateId(req.body);
  console.log(req.body);

  //Confirmed working
  // INSERT data objects into DB HERE once queries are written
  res.render('new-quiz');  //Render new quiz page again so user can submit another question
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
