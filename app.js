// require the installed express app
var express = require('express');
var bodyParser = require("body-parser");

// then we call express
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// set up the template engine
app.set('view engine', 'ejs');

//  Express does’ t allow access to the css file by default, so we need to expose it 
app.use(express.static("public"));

// the task array with initial placeholders for added task
var task = ["Packing", "practise with nodejs"];

// the completed task array with initial placeholders for removed task
var complete = ["finish Bootstrap4"];

// post route for adding new task
app.post('/addtask', function (req, res) {
  var newTask = req.body.newtask;
  
  // add the new task from the post route into the array
  task.push(newTask);
  
  // after adding to the array go back to the root route
  res.redirect("/");
});

app.post("/removetask", function(req, res) {
  var completeTask = req.body.check;
  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    
    // check if the completed task already exist in the task when checked,
    // then remove using the array splice method
    task.splice(task.indexOf(completeTask), 1);
  } 
  else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      // console.log(completeTask[i]);
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

// takes us to the root(/) URL
// render the ejs and display added task, task(index.ejs) = task(array)
app.get('/', (req, res) => {
  // when we visit the root URL express will respond with 'Hello World'
  // res.send('Hello World!');
  
  // res.render('index');
  // res.render("index", { task: task});
  res.render("index", { task: task, complete: complete });
});

// the server is listening on port 3000 for connections
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
