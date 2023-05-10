const db = require('../connection');

const insertResultsByQuizId = (quizId, userId, result) => {
  return db.query((
    `INSERT INTO results (quiz_id, user_id, result) VALUES ($1, $2, $3)`), [quizId, userId, result])
}

module.exports = {insertResultsByQuizId}
