const db = require('../connection');

const getPublicQuizzes = () => {
  return db.query(
    `SELECT * FROM quizzes WHERE private = false`
  )
  .then ((res) => {
    return res.rows;
  })
}

const getQuizzesByUserId = (id) => {
  return db.query((
    `SELECT * FROM quizzes WHERE user_id IN ($1)`),[id])
    .then ((res) => {
      return res.rows;
    })
}

const submitQuiz = () => {

}


module.exports = {getPublicQuizzes, getQuizzesByUserId, submitQuiz};
