const db = require('../connection');
// get result by quizId and userId
const getResultByQuizIdAndUserId = (quizId, userId) => {
  return db.query((
    `SELECT * FROM results
      WHERE quiz_id = $1 AND user_id = $2`), [quizId, userId])
    .then ((res) => {
      return res.rows[0];
    })
}

// need to get results for a particular user for a particular quiz.
const getTotalCorrectAnswers = (user_id, quiz_id) => {
  return db.query((
    `SELECT result FROM results
    WHERE user_id = ($1)
    AND quiz_id = ($2)`), [user_id, quiz_id])
  .then((res) => {
    return res.rows[0];
    // return res.rows[0].result;
  })
};

const getTotalQuestions = (quiz_id) => {
  return db.query((
    `SELECT Count(*) AS total_questions, quizzes.name
    FROM questions
    JOIN quizzes ON quizzes.id = questions.quiz_id
    WHERE quiz_id = $1
    GROUP BY quizzes.name;`), [quiz_id])
  .then((res) => {
    // return res.rows[0];
    return res.rows[0];
  })
};


module.exports = { getTotalCorrectAnswers, getTotalQuestions, getResultByQuizIdAndUserId }
