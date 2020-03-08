const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const Category = require("./models/categories.js");


// MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: "feedmeseymour", //some random string
  resave: false,
  saveUninitialized: false
}));

// MONGOOSE
mongoose.connect("mongodb://localhost:27017/PPLpleaser", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("Mongo CONNECTED!");
});

// INDEX
app.get('/', (req, res)=>{
  Category.find({}, (error, allCategories)=>{
      res.render('index.ejs', {
          category: allCategories,
          currentUser: req.session.currentUser
      });
  });
});

app.get('/seed', async (req, res) => {
  const newCategories =
    [
      {
          name: {type: String, required: true },
          img: String,
          votes: Number
      }, {
          name: {type: String, required: true },
          img: String,
          votes: Number
      }, {
          name: {type: String, required: true },
          img: String,
          votes: Number
      }, {
          name: {type: String, required: true },
          img: String,
          votes: Number
      }, {
          name: {type: String, required: true },
          img: String,
          votes: Number
      }, {
          name: {type: String, required: true },
          img: String,
          votes: Number
      }, {
          name: {type: String, required: true },
          img: String,
          votes: Number
      }, {
          name: {type: String, required: true },
          img: String,
          votes: Number
      }
    ]

  try {
    const sendCategories = await Category.create(newCategories)
    res.send(sendCategories)
  } catch (err) {
    res.send(err.message)
  }
})

// USE THIS SET UP to set up USER-ONLY pages
app.get('/app', (req, res)=>{
  if(req.session.currentUser){
      res.send('the party');
  } else {
      res.redirect('/');
  }
});



// SET UP to USE USERS.JS CONTROLLER
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
const categoriesController = require('./controllers/categories.js');
app.use('/categories', categoriesController);

// WEB SERVER
app.listen(3000, ()=>{
    console.log('listening...');
});