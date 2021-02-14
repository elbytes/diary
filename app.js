//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const mongoose = require('mongoose');

const auth = {
  username: '',
  password: ''
};

mongoose.connect(`mongodb+srv://${auth.username}:${auth.password}@blogdb.bs9dj.mongodb.net/blogDB?retryWrites=true&w=majority/blogDB`, 
{useNewUrlParser: true, useUnifiedTopology: true});
const postSchema = {
  title: String,
  body: String
}
const Post = mongoose.model('Post', postSchema);

const homeStartingContent ="Galaxies are creatures of the cosmos colonies how far away tesseract Sea of Tranquility. Vangelis the carbon in our apple pies inconspicuous motes of rock and gas hearts of the stars muse about star stuff harvesting star light. Finite but unbounded hearts of the stars paroxysm of global death vanquish the impossible a mote of dust suspended in a sunbeam network of wormholes. The ash of stellar alchemy made in the interiors of collapsing stars brain is the seed of intelligence with pretty stories for which there's little good evidence the only home we've ever known the only home we've ever known and billions upon billions upon billions upon billions upon billions upon billions upon billions.";
const aboutContent = "Citizens of distant epochs astonishment Orion's sword radio telescope dream of the mind's eye cosmic fugue? A still more glorious dawn awaits take root and flourish stirred by starlight a still more glorious dawn awaits tingling of the spine star stuff harvesting star light. Shores of the cosmic ocean the sky calls to us of brilliant syntheses something incredible is waiting to be known paroxysm of global death at the edge of forever and billions upon billions upon billions upon billions upon billions upon billions upon billions.";
const contactContent = "Not a sunrise but a galaxyrise Hypatia worldlets intelligent beings Jean-François Champollion preserve and cherish that pale blue dot. Vanquish the impossible white dwarf vanquish the impossible extraplanetary descended from astronomers hundreds of thousands. Hydrogen atoms are creatures of the cosmos as a patch of light vastness is bearable only through love descended from astronomers hydrogen atoms. Sea of Tranquility take root and flourish a still more glorious dawn awaits emerged into consciousness the ash of stellar alchemy vastness is bearable only through love and billions upon billions upon billions upon billions upon billions upon billions upon billions.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res)=>{
  Post.find({}, (err, posts)=>{
    res.render('home', {homeStartingContent: homeStartingContent, posts: posts});
  });
});

app.get('/about', (req, res)=>{
  res.render('about', {aboutContent: aboutContent});
});

app.get('/contact', (req, res)=>{
  res.render('contact', {contactContent: contactContent});
});

app.get('/compose', (req, res)=>{
  res.render('compose');
});

app.get('/posts/:postId', (req, res)=>{
  const reqPost = req.params.postId;
  Post.findOne({_id: reqPost}, (err, post)=>{
        res.render('post', {title: post.title, body: post.body});
  });
});

app.post('/compose', (req, res)=>{
  const post = new Post( {
    title: req.body.postTitle,
    body: req.body.postBody
  });
  post.save(err=>{
    if(!err){
      res.redirect('/');
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
