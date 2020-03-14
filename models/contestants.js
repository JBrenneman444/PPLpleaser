const mongoose = require('mongoose');

const contestantSchema = new mongoose.Schema(
    {
        name: String,
        img: String,
        votes: {type: Number, default:0},
        parentCategory: String
    }
)

const Contestant = mongoose.model('Contestant', contestantSchema);

module.exports = Contestant;