require('dotenv').config()

const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

// PORT -- Allows use of Heroku's port or local port
const PORT = process.env.PORT || 3000;

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
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connection path: ', process.env.MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.once('open' , ()=>{ // might need to change to "ON" instead of "ONCE"
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
          name: "stuff",
          img: "https://image.shutterstock.com/image-vector/no-image-available-sign-absence-260nw-373243873.jpg",
          votes: 439
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
app.listen(process.env.PORT, ()=>{
    console.log('listening...');
});