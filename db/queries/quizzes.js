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
//ADDED BY VIK
// const submitQuiz = () => {
// const query = {
//   text: 'INSERT INTO users (username, password) VALUES ($1, $2)',
//   values: [username, password],
// };

// pool.query(query)
//   .then(() => {
//     console.log('Data inserted successfully');
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// };


module.exports = {getPublicQuizzes, getQuizzesByUserId, submitQuiz};
