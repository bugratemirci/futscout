const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FootballerSeasonBySeasonSchema = new Schema({
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
    id: {
        type: String
    }
});

module.exports = mongoose.model('FootballerSeasonBySeason', FootballerSeasonBySeasonSchema, 'FootballerSeasonBySeason');
