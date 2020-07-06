//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//can start off empty as well
let items = ["Buy food", "Cook Food", "Eat Food"];

//Use ejs as our view engine
app.set('view engine', 'ejs');
//to parse user input into code we can pass through to manipulate
app.use(bodyParser.urlencoded({extended: true}));
//applies our css styles to public path
app.use(express.static("public"));

app.get("/", function(req, res){

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today .toLocaleDateString("en-US", options);

  //render a file callled list and pass a variable called kindofday and value of variable day.
  res.render('list', {kindOfDay: day, newListItems: items});


});

app.post("/", function(req, res){
  let item = req.body.newItem

  items.push(item);
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
})
