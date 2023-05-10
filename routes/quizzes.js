const { submitQuiz } = require("../db/queries/quizzes");
const questionQueries = require("../db/queries/questions");
const answerQueries = require("../db/queries/answers");
const { addPrivateId, addUserId } = require("../helpers/new_quiz_helpers");

const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("new-quiz");
});
////////////////////////////////////////////
//POST to '/new' endpoint where quiz will be submitted
router.post("/new", (req, res) => {
  //Adds private_id property to the submitted quiz object
  addPrivateId(req.body);

  //Adds user_id property to the submitted quiz object
  addUserId(req);

  //req.body assigned to quizOnj var
  const quizObj = req.body;

  //TEST log quizObj
  console.log("QUIZ OBJECT:", quizObj);

  //submitQuiz query promise function inserts row into quizzes table in db, and returns quiz_id as resolve
  submitQuiz(
    quizObj.user_id,
    quizObj.quiz_name,
    quizObj.private,
    quizObj.private_id
  ).then((quiz_id) => {
    //TEST log quiz_id
    console.log("QUIZ ID", quiz_id);

    //loop 5 times, once for each question
    for (let i = 1; i <= 5; i++) {
      //Use template literals to access key related to each question in quizObj
      let questionKey = `question${i}`;
      //questionText is the value of the questionKey property in quizObj
      let questionText = quizObj[questionKey];

      // submitQuestion query promise function inserts row for each question into questions table.  Will loop 5 times (once for each question)
      submitQuestion(quiz_id, i, questionText)
        .then((question_id) => {
          // TEST log question_id for each question
          console.log(`QUESTION ID for ${questionKey}`, question_id);
        })

        //Handle errors from promise chain
        .catch((err) => {
          console.error("Error: ", err);
        });
    }
  });

  res.render("new-quiz");
});

///////////////////////////////////////////
router.get("/submit_quiz", (req, res) => {
  res.render("quiz_submission");
});

router.post("/submit_quiz", (req, res) => {
  // should render results page.
  res.render("....");
});

router.get("/:id", (req, res) => {
  const quizId = req.params.id;

  questionQueries
    .getQuestionsByQuizId(quizId)
    .then((questions) => {
      answerQueries.getAnswersByQuizId(quizId).then((answers) => {
        const templateVars = { questions, answers };
        // console.log("templateVars", templateVars)
        res.render("questions", templateVars);
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/:id", (req, res) => {
  const { answer } = req.body;
  console.log(answer);
});

module.exports = router;
