const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true },
        img: String,
        votes: Number
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;