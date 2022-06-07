const express = require('express');
const router = express.Router();
const { getAllPlayers, getPlayerById, getPlayerByName, getPlayerByCluster } = require('../controllers/players');

router.get('/get_football_players', getAllPlayers);
router.post('/get_player_by_id', getPlayerById);
router.post('/getPlayerByName', getPlayerByName);
router.post('/getPlayerByCluster', getPlayerByCluster)
module.exports = router;