const resultQueries = require('../db/queries/results');

const express = require('express');
const router  = express.Router();

router.get('/:id/:userId/quiz_result', (req, res) => {
 const quizId = req.params.id;

 const userId = req.params.userId;

 resultQueries.getTotalCorrectAnswers(userId, quizId)
 .then((correctAnswers) => {
   resultQueries.getTotalQuestions(quizId)
   .then((totalQuestions) => {

     let score = correctAnswers.result // because the results table already has the number and there is no need to calculate this again.

      let total = Number(totalQuestions.total_questions); //total number of questions in a quiz. i an changing the datatype to Number as it returns the count as a string.

      let scorePercent = Math.floor((score / total)* 100);

      let quizName = totalQuestions.name

      //Get URL from req and save in url variable
      const currentURL = req.protocol + '://' + req.headers.host + req.originalUrl;
      const templateVars = { score, total, scorePercent, currentURL, quizName }
      res.render('results', templateVars);
    })
  })
  .catch((err) => {
    res.send(err)
  })
});


module.exports = router;
