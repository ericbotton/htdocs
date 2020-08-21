const port = '3002';

const bodyParser = require("body-parser");
const express    = require("express");
const request    = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//


// "/'" route
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName  = req.body.lName;
  var email     = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status:        "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/b81eee618f",
    method: "POST",
    headers: {
      "Authorization": "edb 9b5cb02c0be1042b94d0a201e184cc9b-us17"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      };
    }
  });
  console.log(firstName + " " + lastName + " " + email);
});

app.post("/failure", function(req, res){
  res.redirect("/");
})

//
app.listen(process.env.PORT || port, function(){
  console.log("express server started listening to localhost:" + port);
});

// 9b5cb02c0be1042b94d0a201e184cc9b-us17 api-key
// b81eee618f list-id
