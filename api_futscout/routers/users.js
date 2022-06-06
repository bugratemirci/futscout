const express = require('express');
const router = express.Router();
const { signUp, signIn, getUser } = require('../controllers/users');

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/getUser', getUser);

module.exports = router;