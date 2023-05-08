const submitQuiz = require('../db/queries/quizzes');

const express = require('express');
const router  = express.Router();

router.get('/new', (req, res) => {
  res.render('new-quiz');
});

router.post('/new', (req, res) => {
  const { question, answer } = req.body;
  //console.log(req.body);  //Confirmed working
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


module.exports = router;
