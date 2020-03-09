const mongoose = require('mongoose');

const contestantSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        img: String,
        votes: Number
    },
    { timestamps: true }
)

const categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true },
        img: String,
        contestants: [contestantSchema],
        votes: Number
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
const Contestant = mongoose.model('Contestant', categorySchema);

module.exports = Category;
module.exports = Contestant;