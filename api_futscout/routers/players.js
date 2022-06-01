const express = require('express');
const router = express.Router();
const { getAllPlayers, getPlayerById } = require('../controllers/players');

router.get('/get_football_players', getAllPlayers);
router.post('/get_player_by_id', getPlayerById)


module.exports = router;