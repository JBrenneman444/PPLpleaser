const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true },
        img: String,
        leader: {type:String, default:"None"},
        totalVotes: {type:Number, default:0},
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;