const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
// const session = require('express-session') possibly need for 

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username },(err, foundUser) => {
        if (err) { 
            console.log(err); 
        } else if (!foundUser) {
            console.log("user not found")
            res.redirect('back'); // REDIRECTS to CURRENT PAGE
        } else if ( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentUser = foundUser;
            console.log("correct user and pass")
            res.redirect('back'); // REDIRECTS to CURRENT PAGE
        } else {
            // have it say "WRONG PASSWORD"
            console.log('wrong pass')
            res.redirect('back'); // REDIRECTS to CURRENT PAGE
        }
    },
);
});

router.delete('/', (req, res) => {
    req.session.destroy(()=>{ // ENDS the session (aka, Logs Out)
        res.redirect('back'); // REDIRECTS to CURRENT PAGE
    });
})

module.exports = router;