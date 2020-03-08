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

// EDIT -- N O T  D O N E  Y E T  !!
router.get('/:id/edit', (req, res)=>{
    Category.findById(req.params.id, (err, foundCategory)=>{ //find the log
        res.render('categories/edit.ejs',
        {
          category: foundCategory,
          currentUser: req.session.currentUser
        }
      );
    });
  });

// PUT Route for BUY BUTTON -- N O T  D O N E  Y E T  !!
router.put('/:id/bought', (req, res) => {
  Category.findByIdAndUpdate(
    req.params.id,
    { $inc: { votes: 1}},
    (err, updatedModel)=>{
      console.log(err)
    res.redirect(`/store/${req.params.id}`)
  });
});


// UPDATE / PUT Route -- N O T  D O N E  Y E T  !!
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
    Category.findById(req.params.id, (err, foundCategory) => {
        res.render("categories/show.ejs", {
          category: foundCategory,
          currentUser: req.session.currentUser
        });
      });
})

// DELETE -- N O T  D O N E  Y E T  !!
router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/store');//redirect back to store
    });
  });  


///////////////////////////////////////////////
// ROUTES
module.exports = router;