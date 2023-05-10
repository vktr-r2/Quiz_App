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

module.exports = {getResultByQuizIdAndUserId}