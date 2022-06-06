const express = require('express');
const router = express.Router();
const { getAllPlayers, getPlayerById, getPlayerByName } = require('../controllers/players');

router.get('/get_football_players', getAllPlayers);
router.post('/get_player_by_id', getPlayerById);
router.post('/getPlayerByName', getPlayerByName);

module.exports = router;