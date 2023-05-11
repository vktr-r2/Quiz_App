const db = require('../connection');

const getResultByQuizIdAndUserId = (quizId, userId) => {
  return db.query((
    `SELECT * FROM results
      WHERE quiz_id = $1 AND user_id = $2`), [quizId, userId])
    .then ((res) => {
      // console.log(res.rows)
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
    `SELECT Count(*) AS total_questions
    FROM questions
    WHERE quiz_id = $1`), [quiz_id])
  .then((res) => {
    // return res.rows[0];
    return res.rows[0];
  })
};


module.exports = { getTotalCorrectAnswers, getTotalQuestions, getResultByQuizIdAndUserId }
