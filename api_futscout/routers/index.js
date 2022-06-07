const express = require("express");
const router = express.Router();
const users = require('./users');
const players = require('./players');
const prediction = require('./prediction');

router.use("/users", users);
router.use('/players', players);
router.use('/prediction', prediction);

module.exports = router;