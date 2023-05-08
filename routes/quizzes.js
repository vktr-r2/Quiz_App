const submitQuiz = require('../db/queries/quizzes');

const express = require('express');
const router  = express.Router();

router.get('/new', (req, res) => {
  res.render('new-quiz');
});

router.post('/new', (req, res) => {
  const { question, answer } = req.body;
  console.log(req.body);  //Confirmed working
  // INSERT data objects into DB HERE once queries are written
  res.render('new-quiz');  //Render new quiz page again so user can submit another question
});


module.exports = router;
