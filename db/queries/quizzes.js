const db = require('../connection');

const getQuizzesByUserId = (id) => {
  return db.query((
    `SELECT * FROM quizzes WHERE user_id IN ($1, NULL)`),[id])
    .then ((res) => {
      return res.rows;
    })
}


module.exports = {getQuizzesByUserId};
