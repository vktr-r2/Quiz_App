const db = require('../connection');

const getAnswersByQuizId = (id) => {
  return db.query((
    `SELECT answers.* FROM answers
      JOIN questions ON questions.id = answers.quiz_id
      WHERE questions.quiz_id = $1`), [id])
    .then ((res) => {
      // console.log(res.rows)
      return res.rows;
    })
}

module.exports = {getAnswersByQuizId}