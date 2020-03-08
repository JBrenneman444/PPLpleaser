const express = require('express');
const router = express.Router();
const Category = require("../models/categories.js");

///////////////////////////////////////////////
// Routes:

// NEW
router.get('/new', (req, res)=>{
    res.render('categories/new.ejs', {
        currentUser: req.session.currentUser
    });
});

// CREATE / POST
router.post('/',(req,res)=>{
    if(req.body.img == ''){
      req.body.img = "https://image.shutterstock.com/image-vector/no-image-available-sign-absence-260nw-373243873.jpg";
    } else {
    // do nothing
    }
    Category.create(req.body, (error, createdCategory)=>{
        console.log(createdCategory);
        res.redirect('/');
    });
});

// EDIT
router.get('/:id/edit', (req, res)=>{
    Category.findById(req.params.id, (err, foundCategory)=>{ //find the log
        res.render(
        'edit.ejs',
        {
          category: foundCategory //pass in found log
        }
      );
    });
  });

// PUT Route for BUY BUTTON
router.put('/:id/bought', (req, res) => {
  Category.findByIdAndUpdate(
    req.params.id,
    { $inc: { votes: 1}},
    (err, updatedModel)=>{
      console.log(err)
    res.redirect(`/store/${req.params.id}`)
  });
});


// UPDATE / PUT Route
router.put('/:id', (req, res)=>{
if(req.body.img == ''){
    req.body.img = "https://image.shutterstock.com/image-vector/no-image-available-sign-absence-260nw-373243873.jpg";
} else {
// do nothing
}
    Category.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
      res.redirect(`/store/${req.params.id}`)
    });
});
  
// SHOW
router.get('/:id',(req,res)=>{
    Category.findById(req.params.id, (err, foundCategory) => { // CALLBACK name don't matter
        res.render("show.ejs", {
          category: foundCategory // doesn't matter what you call the KEY TITLE
        });
      });
})

// DELETE
router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/store');//redirect back to store
    });
  });  


///////////////////////////////////////////////
// ROUTES
module.exports = router;