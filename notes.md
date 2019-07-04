----
## Add Task Setup: 
We have just one route now. However, for our application to work, we need a post route as well. If you look at our index.ejs file, we can see that our form is submitting a post request to the /addtask route:

    <form action="/addtask" method="POST">

Now that we know where our form is posting, we can set up the route. A post request looks like a get request, but with one minor change:

    app.post('/addtask', function (req, res) {
       res.render('index')
    });

But instead of just responding with the same html template, we have to access the name of the newtask typed in by the user as well. 

For this we need to use an Express Middleware. Middlewares are functions that have access to the req and res bodies in order to preform more advanced tasks.

We’re going to make use of the body-parser middleware. body-parser allows us to make use of the key-value pairs stored on the req-body object. In this case, we’ll be able to access the name of the newtask typed in by the user on the client side and save it into an array on the server side.

Once installed, we can require it, and then make use of our middleware with the following line of code in our index.js

    var bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: true }));

Finally, we can now update our post request to store the value of newtask in an array while also adding a loop to our index.ejs file to display a list of all the newtask added by the user.

----
## Delete Task Setup:
After adding a new task, we need to be able to remove the task from the added task section after its been completed and move it into the complete task array on the server side. 

We can achieve this by checking the completed task and using the remove button in our EJS file.

    <button formaction="/removetask" type="submit"> Remove </button>
