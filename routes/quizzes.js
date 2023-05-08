const express = require('express');
const router  = express.Router();

router.get('/new', (req, res) => {
  res.render('new-quiz');
});

router.post('/new', (req, res) => {
  const { question, answer } = req.body;
  console.log(req.body);
  // INSERT data objects into DB HERE
  res.render('new-quiz');
});


module.exports = router;
