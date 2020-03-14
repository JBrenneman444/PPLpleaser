const express = require('express');
const router = express.Router();
const Contestant = require("../models/contestants.js");

///////////////////////////////////////////////
// Routes:

// PUT Route for VOTE BUTTON
router.put('/:id/vote', (req, res) => {
    Contestant.findByIdAndUpdate(
          req.params.id,
          { $inc: { "votes" : 1}}, // update only particular contestants votes
          (err, updatedModel)=>{
            console.log(err)
          res.redirect('back')
      });
    });

module.exports = router;