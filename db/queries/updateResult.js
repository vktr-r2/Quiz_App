const db = require('../connection');

//update score result when answer is ture
const updateResultsByQuizIdAndUesrId = (quizId, userId, result) => {
  return db.query((
    `UPDATE results SET result = $3 WHERE quiz_id = $1 AND user_id = $2`), [quizId, userId, result])
}

module.exports = {updateResultsByQuizIdAndUesrId}