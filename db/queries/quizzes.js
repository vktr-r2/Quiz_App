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

// submitQuiz takes user_id, name, private, and private_id
const submitQuiz = (user_id, name, private, private_id) => {

  // SQL query inserts a new row into 'quizzes' table
  //RETURNING id returned so it can be inserted as quiz_id when inserting questions
  const queryText = 'INSERT INTO quizzes(user_id, name, private, private_id) VALUES($1, $2, $3, $4) RETURNING id';

  //Values to be inserted into db
  const values = [user_id, name, private, private_id];

  // return db.query returns a promise that resolves to the result of query
  return db.query(queryText, values)
    //query result passed to callback function
    .then((res) => {
      //res.rows returns array of object.  First element in that array is our inserted object, so storing value of 'id' for that object
      const quiz_id = res.rows[0].id;
      //quiz_id returned
      return quiz_id;
    })
    //.catch captures any potential error and logs error for query if truthy
    .catch((err) => {
      console.error(`Error executing submitQuiz query:`, err);
    });
};


// submitQuestion takes quiz_id from submitQuiz implementation, and question_number, question from form submit
const submitQuestion = (quiz_id, question_number, question) => {

  //RETURNING id returned so it can be inserted as quiz_id when inserting answers
  const queryText = 'INSERT INTO questions(quiz_id, question_number, question) VALUES($1, $2, $3) RETURNING id';

  //Values to be inserted in db
  const values = [quiz_id, question_number, question];

  // return db.query returns a promise that resolves to the result of query
  return db.query(queryText, values)
    //query results passed to callback function
    .then((res) => {
      //res.rows returns array of object.  First element in that array is our inserted object, so storing value of 'id' for that object
      const question_id = res.rows[0].id;

      //question_id returned
      return question_id;
    })
    .catch((err) => {
      //.catch captures any potential error and logs error for query if truthy
      console.error(`Error executing submitQuestion query:`, err);
    });
};




module.exports = {getPublicQuizzes, getQuizzesByUserId, getQuestionsByQuizId, submitQuiz, submitQuestion};
