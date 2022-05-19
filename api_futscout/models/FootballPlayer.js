const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FootballPlayerSchema = new Schema({
    player_name: {
        type: String
    },
    goals: {
        type: Number
    },
    assists: {
        type: Number
    },
    xG: {
        type: Number
    },
    games: {
        type: Number
    },
    team_title: {
        type: String
    }
});

module.exports = mongoose.model('FootballPlayers', FootballPlayerSchema, 'FootballPlayers');
