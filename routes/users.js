/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const cookieParser = require('cookie-parser')
const router  = express.Router();

router.use(cookieParser())

const quizQueries = require('../db/queries/quizzes')

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.cookie("userId", userId);

  quizQueries.getQuizzesByUserId(userId)
  .then((quizzes) => {
    const templateVars = {quizzes}
    res.render('home', templateVars);
  })
  .catch((err) => {
    res.send(err)
  })
});


module.exports = router;
