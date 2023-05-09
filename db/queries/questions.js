const db = require('../connection');

const getQuestionsByQuizId = (id) => {
  return db.query((
    `SELECT quizzes.name, questions.* FROM quizzes
      JOIN questions ON questions.quiz_id = quizzes.id
      WHERE quizzes.id = $1`), [id])
    .then ((res) => {
      // console.log(res.rows);
      return res.rows;
    })
}

module.exports = {getQuestionsByQuizId}