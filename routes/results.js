const resultQueries = require('../db/queries/results');

const express = require('express');
const router  = express.Router();

router.get('/:id/quiz_result', (req, res) => {
 const quizId = req.params.id;
 //const userId = req.session.userId; //assuming there is a user session


//  resultQueries.getTotalCorrectAnswers(userId, quizId)
 resultQueries.getTotalCorrectAnswers(quizId)
 .then((correctAnswers) => {
   resultQueries.getTotalQuestions(quizId)
     console.log('This is correct answers',correctAnswers)
   .then((totalQuestions) => {
      console.log('This is total questions', totalQuestions)
      let score = correctAnswers.result // becasue the results table already has the number and there is no need to calculate this again.
      //let score = correctAnswers.length; //number of questions answered correctly
      let total = totalQuestions[0].total_questions; //total number of questions in a quiz.
      let scorePercent = Math.floor((score / total)* 100);

      //  console.log(quiz_id);
      const templateVars = { score, total, scorePercent }
      res.render('results', templateVars);
    })
  })
  .catch((err) => {
    res.send(err)
  })
});


module.exports = router;
