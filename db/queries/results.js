const db = require('../connection');

// need to get results for a particular user for a particular quiz.
const getTotalCorrectAnswers = (user_id, quiz_id) => {
  return db.query((
    `SELECT result FROM results
    WHERE user_id = ($1)
    AND quiz_id = ($2)`), [user_id, quiz_id])
  .then((res) => {
    return res.rows[0];
  })
};

const getTotalQuestions = (quiz_id) => {
  return db.query((
    `SELECT Count(*) AS total_questions
    FROM questions
    WHERE quiz_id = $1`), [quiz_id])
  .then((res) => {
    return res.rows[0];
  })
};


module.exports = { getTotalCorrectAnswers, getTotalQuestions }
