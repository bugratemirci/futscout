const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signUp', (req, res, next) => {
  const { userreq } = req.body;
  console.log(userreq)
  const user = new User({
    username: userreq.username,
    password: userreq.password,
    team: userreq.team,
    mail: userreq.mail,
    tel: userreq.tel
  });
  
  user.save((err, data) => {
    if (err)
      res.json({ status: false })
    else
      res.json({ status: true });
  })
});

router.post('/logIn', (req, res, next) => {
  const { userreq } = req.body;
  console.log(userreq)
  User.findOne({ username: userreq.username, password: userreq.password }, (err, data) => {
    if (data)
      res.json({ status: true, user: data });
    else
      res.json({ status: false })
  });

});
module.exports = router;
