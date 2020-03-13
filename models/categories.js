const mongoose = require('mongoose');

const contestantSchema = new mongoose.Schema(
    {
        name: String,
        img: String,
        votes: {type: Number, default:0},
    }
)

const categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true },
        img: String,
        leader: {type:String, default:"None"},
        totalVotes: {type:Number, default:0},
        contestants: [contestantSchema]
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;