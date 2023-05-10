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

const getQuestionsByQuizId = (id) => {
  return db.query((
    `SELECT * FROM questions WHERE quiz_id IN ($1)`),[id])
    .then ((res) => {
      return res.rows;
    })
}

//ADDED BY VIK - NOT COMPLETE
// submitQuiz takes user_id, name, private, and private_id
const submitQuiz = (user_id, name, private, private_id) => {

  // SQL query inserts a new row into 'quizzes' table
  //'RETURNING id' returned so it can be inserted as quiz_id when inserting questions
  const queryText = 'INSERT INTO quizzes(user_id, name, private, private_id) VALUES($1, $2, $3, $4) RETURNING id';

  //Values to be inserted into db
  const values = [user_id, name, private, private_id];

  // db.query returns a promise that resolves to the result of query
  return db.query(queryText, values)
    //query result passed to callback function
    .then((res) => {
      //res.rows returns just one row (array) because only one row was inserted.  First element of rows array will be id to retrieve
      const quiz_id = res.rows[0].id;
      //TEST console.log quiz_id to see if it is being returned properly
      return quiz_id;
    })
    //.catch captures any potential error and logs error for query if truthy
    .catch((err) => {
      console.error(`Error executing submitQuiz query`);
    });
};



module.exports = {getPublicQuizzes, getQuizzesByUserId, getQuestionsByQuizId, submitQuiz};
