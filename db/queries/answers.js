const db = require('../connection');

const getAnswersByQuizId = (id) => {
  return db.query((
    `SELECT * FROM answers WHERE quiz_id = $1`), [id])
    .then ((res) => {
      return res.rows;
    })
}

module.exports = {getAnswersByQuizId}