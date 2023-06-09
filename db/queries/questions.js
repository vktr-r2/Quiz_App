const db = require('../connection');

const getQuestionsByQuizId = (id) => {
  return db.query((
    `SELECT quizzes.name, questions.* FROM quizzes
      JOIN questions ON questions.quiz_id = quizzes.id
      WHERE quizzes.id = $1
      ORDER BY questions.question_number`), [id])
    .then ((res) => {
      return res.rows;
    })
}

module.exports = {getQuestionsByQuizId}
