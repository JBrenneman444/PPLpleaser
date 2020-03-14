const express = require('express');
const router = express.Router();
const Contestant = require("../models/contestants.js");

///////////////////////////////////////////////
// Routes:

// PUT OR POST Route for VOTE BUTTON
    // make it hit Contestants controller
        // pass it id of the contestant        
// router.put('/:id/vote', (req, res) => {
//   Contestants.findByIdAndUpdate(
//     req.params.id,
//     { $inc: { "votes" : 1}}, // update only particular contestants votes
//     (err, updatedModel)=>{
//       console.log(err)
//     res.redirect(`/categories/${req.params.id}`)
//   });
// });


module.exports = router;