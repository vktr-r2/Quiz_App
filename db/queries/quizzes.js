const db = require("../connection");

// get all public quizzes
const getPublicQuizzes = () => {
  return db.query(`SELECT * FROM quizzes WHERE private = false`).then((res) => {
    return res.rows;
  });
};

// get all public quizzes and private using userId quizzes
const getQuizzesByUserId = (id) => {
  return db
    .query(`SELECT * FROM quizzes WHERE private = false OR private = true AND user_id = $1`, [id])
    .then((res) => {
      return res.rows;
    });
};

// get all questions by quizId
const getQuestionsByQuizId = (id) => {
  return db
    .query(`SELECT * FROM questions WHERE quiz_id IN ($1)`, [id])
    .then((res) => {
      return res.rows;
    });
};

// submitQuiz takes user_id, name, private, and private_id
const submitQuiz = (quizObj) => {
  //Destructure necissary variables from quizObj
  const { user_id, quiz_name, private, private_id } = quizObj;
  // SQL query inserts a new row into 'quizzes' table
  //RETURNING id returned so it can be inserted as quiz_id when inserting questions
  const queryText =
    "INSERT INTO quizzes(user_id, name, private, private_id) VALUES($1, $2, $3, $4) RETURNING id";

  //Values to be inserted into db
  const values = [user_id, quiz_name, !!private, private_id];

  // return db.query returns a promise that resolves to the result of query
  return (
    db
      .query(queryText, values)
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
      })
  );
};

const submitQuestion = (quiz_id, question_number, question) => {
  //RETURNING id and quiz_id returned so they can be used when inserting answers
  const queryText =
    "INSERT INTO questions(quiz_id, question_number, question) VALUES($1, $2, $3) RETURNING id, quiz_id";

  //Values to be inserted in db
  const values = [quiz_id, question_number, question];

  // return db.query returns a promise that resolves to the result of query
  return (
    db
      .query(queryText, values)
      //query results passed to callback function
      .then((res) => {
        //res.rows returns array of object.  First element in that array is our inserted object,
        //so storing values of 'id' (as question_id) and 'quiz_id' for that object
        const { id: question_id, quiz_id } = res.rows[0];

        //question_id and quiz_id returned
        return { question_id, quiz_id };
      })
      .catch((err) => {
        //.catch captures any potential error and logs error for query if truthy
        console.error("Error executing submitQuestion query:", err);
      })
  );
};

// submitAnswer takes question_id from submitQuestion promise, and answer and is_correct from form
const submitAnswer = (question_id, answer, is_correct, quiz_id) => {
  //Insert values into the answers table
  const queryText =
    "INSERT INTO answers(question_id, answer, is_correct, quiz_id) VALUES($1, $2, $3, $4)";
  //Values to be inserted
  const values = [question_id, answer, is_correct, quiz_id];

  // return db.query returns a promise that resolves to success message
  return db
    .query(queryText, values)
    .then((res) => {
      //Do nothing for now...we submitted everything we needed to successfully.
    })

    .catch((err) => {
      //.catch captures any potential error and logs error for query if truthy
      console.error("Error executing submitAnswer query:", err);
    });
};

module.exports = {
  getPublicQuizzes,
  getQuizzesByUserId,
  getQuestionsByQuizId,
  submitQuiz,
  submitQuestion,
  submitAnswer,
};
