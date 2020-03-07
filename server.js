const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

// MIDDLEWARE
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: "feedmeseymour", //some random string
  resave: false,
  saveUninitialized: false
}));
app.use(methodOverride('_method'));
app.use(express.static('public'))

// MONGOOSE
mongoose.connect("mongodb://localhost:27017/PPLpleaser", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("Mongo CONNECTED!");
});

// ROUTES
app.get('/', (req, res)=>{
  res.render('index.ejs', {
      currentUser: req.session.currentUser
  });
});

app.get('/app', (req, res)=>{
  if(req.session.currentUser){
      res.send('the party');
  } else {
      res.redirect('/sessions/new');
  }
});

app.post('/articles', (req, res)=>{
  req.body.author = req.session.currentUser.username;
  Article.create(req.body, (err, createdArticle)=>{
      res.redirect('/articles');
  });
});

// SET UP to USE USERS.JS CONTROLLER
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

// WEB SERVER
app.listen(3000, ()=>{
    console.log('listening...');
});

// test