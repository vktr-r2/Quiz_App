const db = require('../connection');

const insertResultsByQuizIdAndUesrId = (quizId, userId, result) => {
  return db.query((
    `INSERT INTO results (quiz_id, user_id, result) VALUES ($1, $2, $3)`), [quizId, userId, result])
}

module.exports = {insertResultsByQuizIdAndUesrId}
