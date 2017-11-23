var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser());
var mongo = require('./models/connect').mongo;
var { User } = require('./models/User');
var { sendSMS } = require('./sendSMS');
//http.createServer(function(req,res){res.write("hello world")}).listen(8080);
console.log("hello world");
app.get('/', function (req, res) { res.send("server working with express and user logged in") });
app.post('/login', function (req, res) {
    var { username } = req.body;
    var { role } = req.body;
    User.find({ name: username }, (err, success) => {
        if (err) {
            console.log("username doesnt exist");
            console.log("error is :", err);
            responseJson(200, "user doesnt exist", res);
        }
        else {
            console.log("User exist");
            generateOTP(username, res);
        }
    });
});

app.post('/signup', (req, res) => {
    var { name } = req.body;
    var { phoneno } = req.body;
    var { username } = req.body;
    var { password } = req.body;
    var { role } = req.body;
    checkUsername(username, (flag) => {
        console.log("Got flag as :  ", flag);
        if (flag == 1) {
            console.log("Name: ", name, " phoneno: ", phoneno, " username: ", username, " password:", password, " role:", role);
            var user = new User({
                name: name,
                phoneno: phoneno,
                username: username,
                password: username,
                role: role,
                token: 0
            });
            user.save((err, response) => {
                if (err)
                    responseJson(200, "New user not created" + err, res);
                else
                    responseJson(200, "New user created", res);
            });
            // responseJson(200, "Nothing new", res);}
        }
        else {
            responseJson(200, "Username already exists", res)
        }
    });
})
app.listen(8080);


function responseJson(code, message, response) {
    response.send(JSON.stringify({
        code,
        message
    }));
}

function generateOTP(username, response) {
    let rand = Math.random().toString().substring(5, 10);
    console.log("Sending ", rand, "to username: ", username);
    User.update({ username }, { $set: { token: rand } }, (error, result) => {
        if (error) {
            console.log("Error");
        }
        else {
            sendSMS(rand);
            // console.log("sendSMS is: ", sendSMS);
            console.log("Result is: ", result)
        }
    });

    responseJson(200, rand, response);

}
checkUsername = (username, callback) => {
    User.find({ username }, (err, result) => {
        console.log("result is : ", result.length);
        if (err || result.length !== 0) {
            callback(0);
        } else {
            callback(1);
        }
    })
}