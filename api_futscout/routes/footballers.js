const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const FootballPlayer = require('../models/FootballPlayer')
const FootballerSeasonBySeason = require('../models/FootballerSeasonBySeason');
const { type } = require('express/lib/response');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource foot');
});

router.get('/get_football_players', async (req, res, next) => {
    const footballers = await FootballPlayer.find().sort({ "goals": -1 }).limit(40)

    res.status(200).json(
        { footballers }
    )
})

router.post('/get_player_by_id', async (req, res, next) => {
    const { id } = req.body

    const seasons = await FootballerSeasonBySeason.find({ 'id': id }).sort({ 'games': -1 })
    res.status(200).json(
        {
            seasons
        }
    )
})
module.exports = router;
