const express = require('express');
const router = express.Router();
const { signUp, signIn, getUser, updateUser } = require('../controllers/users');

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/getUser', getUser);
router.post('/updateUser', updateUser);
module.exports = router;