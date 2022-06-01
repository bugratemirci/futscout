const express = require("express");
const router = express.Router();
const users = require('./users');
const players = require('./players');


router.use("/users", users);
router.use('/players', players);

module.exports = router;