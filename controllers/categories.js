const express = require('express');
const router = express.Router();
const Category = require("../models/categories.js");

///////////////////////////////////////////////
// Routes:

// NEW-CATEGORY
router.get('/new', (req, res)=>{
    res.render('categories/new.ejs', {
        currentUser: req.session.currentUser
    });
});

// CREATE / POST
router.post('/',(req,res)=>{
    // first IF
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
        res.render('categories/edit.ejs',
        {
          category: foundCategory,
          currentUser: req.session.currentUser
        }
      );
    });
  });

  
// EDIT --- NEW-CONTESTANT
router.get('/:id/new-contestant', (req, res)=>{
  Category.findById(req.params.id, (err, foundCategory)=>{ //find the log
      res.render('categories/new-contestant.ejs',
      {
        category: foundCategory,
        currentUser: req.session.currentUser
      }
    );
  });
});

// PUT Route for VOTE BUTTON
router.put('/:id/vote', (req, res) => {
  Category.findByIdAndUpdate(
    req.params.id, // CATEGORY id
    { $inc: { "contestants.$[].votes" : 1}}, // update only particular contestants votes
    (err, updatedModel)=>{
      console.log(err)
    res.redirect(`/categories/${req.params.id}`)
  });
});

// UPDATE / PUT Route for CONTESTANTS
router.put('/:id/new-contestant', (req, res)=>{

  // MONGOOSE COMMANDS
  Category.findByIdAndUpdate(
    req.params.id, 
    { $push: { contestants: req.body}},
    {new:true},
    (err, updatedModel) => {
        res.redirect(`/categories/${req.params.id}`)
      });
  });

// UPDATE / PUT Route for CATEGORIES
router.put('/:id', (req, res)=>{
if(req.body.img == ''){
    req.body.img = "https://image.shutterstock.com/image-vector/no-image-available-sign-absence-260nw-373243873.jpg";
} else {
// do nothing
}
    Category.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
      res.redirect(`/categories/${req.params.id}`)
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

// DELETE
router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/');//redirect back to store
    });
  });  

module.exports = router;