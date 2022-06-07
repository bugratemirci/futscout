const express = require('express');
const router = express.Router();
const { prediction } = require('../controllers/prediction');

router.post('/prediction', prediction);


module.exports = router;