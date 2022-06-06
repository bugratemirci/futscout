const FootballPlayer = require('../models/FootballPlayer')
const FootballerSeasonBySeason = require('../models/FootballerSeasonBySeason');

const getAllPlayers = async (req, res, next) => {
    const footballers = await FootballPlayer.find().sort({ "goals": -1 }).limit(5)

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
const getPlayerByName = async (req, res, next) => {
    const { name } = req.body
    const footballers = await FootballPlayer.find({ "player_name": { $regex: name, $options: "i" } }).sort({ "goals": -1 }).limit(5)

    res.status(200).json(
        {
            footballers
        }
    )
}

module.exports = {
    getAllPlayers,
    getPlayerById,
    getPlayerByName
};