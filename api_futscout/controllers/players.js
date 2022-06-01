const FootballPlayer = require('../models/FootballPlayer')
const FootballerSeasonBySeason = require('../models/FootballerSeasonBySeason');

const getAllPlayers = async (req, res, next) => {
    const footballers = await FootballPlayer.find().sort({ "goals": -1 }).limit(40)

    res.status(200).json(
        { footballers }
    )
}

const getPlayerById = async (req, res, next) => {
    const { id } = req.body

    const seasons = await FootballerSeasonBySeason.find({ 'id': id }).sort({ 'games': -1 })
    res.status(200).json(
        {
            seasons
        }
    )
}


module.exports = {
    getAllPlayers,
    getPlayerById
};