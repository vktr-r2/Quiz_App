const express = require('express');
const router  = express.Router();

router.get('/quiz_result', (req, res) => {
  // res.set('Content-Type', 'text/css');
  res.render('results');
});






module.exports = router;
