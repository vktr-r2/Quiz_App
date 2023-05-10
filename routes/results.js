const resultQueries = require('../db/queries/results');

const express = require('express');
const router  = express.Router();

router.get('/:id/:userId/quiz_result', (req, res) => {
 const quizId = req.params.id;
 console.log('this is quizID:', quizId)

 const userId = req.params.userId;
 console.log('this is userID:', userId)

 resultQueries.getTotalCorrectAnswers(userId, quizId)
 .then((correctAnswers) => {
   console.log('This is the number of correct answers:',correctAnswers)
   resultQueries.getTotalQuestions(quizId)
   .then((totalQuestions) => {
    console.log('This is the number of total questions:', totalQuestions)
     let score = correctAnswers.result // becasue the results table already has the number and there is no need to calculate this again.
     console.log(score)
      let total = Number(totalQuestions.total_questions); //total number of questions in a quiz.
      console.log(total)
      let scorePercent = Math.floor((score / total)* 100);
      console.log('This is the score percentage:', scorePercent)

      const templateVars = { score, total, scorePercent }
      res.render('results', templateVars);
    })
  })
  .catch((err) => {
    res.send(err)
  })
});


module.exports = router;
