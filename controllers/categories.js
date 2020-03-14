const express = require('express');
const router = express.Router();
const Category = require("../models/categories.js");
const Contestant = require("../models/contestants.js")

///////////////////////////////////////////////
// Routes:

// NEW CATEGORY
router.get('/new', (req, res)=>{
    res.render('categories/new.ejs', {
        currentUser: req.session.currentUser
    });
});

// NEW Contestant
router.get('/:id/new-contestant', (req, res)=>{
  Category.findById(req.params.id, (err, foundCategory)=>{ //find the log
      res.render('contestants/new-contestant.ejs', {
          category: foundCategory,
          currentUser: req.session.currentUser
      });
    });
})

// CREATE Contestant
router.post('/:id/new-contestant', (req, res)=>{
  // first IF
  if(req.body.img == ''){
    req.body.img = "https://image.shutterstock.com/image-vector/no-image-available-sign-absence-260nw-373243873.jpg";
  } else {
  // do nothing
  }
  Category.findById(req.params.id, (error, foundCategory) => {
    req.body.parentCategory = foundCategory.name
    Contestant.create(req.body, (error, createdContestant)=>{
        console.log(createdContestant),
        res.redirect(`/categories/${foundCategory.id}`);
    });
  });
});

// CREATE / POST the CATEGORY
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
  
// SHOW Category & Contestants
router.get('/:id',(req,res)=>{
    Category.findById(req.params.id, (err, foundCategory) => {
      Contestant.find({parentCategory: foundCategory.name}, (err, foundContestant) => {
        res.render("categories/show.ejs", {
          category: foundCategory,
          contestant: foundContestant,
          currentUser: req.session.currentUser
        });
      });
    })
  })

// DELETE
router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/');//redirect back to store
    });
  });  

module.exports = router;