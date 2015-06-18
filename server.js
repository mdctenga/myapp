// require statements run a bunch of code from
// somewhere else so you don't have to have it all here
var config = require('./config.json');
var express = require('express');
var app = express();

var bodyParser = require ('body-parser');

var chatroomModule = require('./app/lib/chatroom.js');
chatroomModule.setDirectory(config.chatroomFilepath);

var counter = 1;

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.render('index');
});

//Require the chatroome routes
app.use('/chatrooms', require('./app/routes/chatrooms.js'));

//Require the user routes
app.use('/users', require('./app/routes/users.js'));


// app.get('/greet/:name', function (req, res) {
// 	var name = req.params.name;
// 	res.render('index', {name: name});
// });



app.listen(config.port);















// app.get('/', function (request, response){
// 	response.send('Hello, World!');
// });

// app.get('/greet/:name', function (request, response){
// 	var name = request.params.name;
// 	response.json({ message: "Hello, " + name});
// });

// var users = [];

// app.get('/create/users/:username', function (request, response){
// 	var username = request.params.username;

// 	if(users.index)f(username) < 0) {
// 	}

// 	var index = users.indexOf(username);

// 	res.json({id: index, username: username});

// })

// app.get('/users', function (req, res){
// 	res.json(users);
// })


// app.get('/add/:x/:y', function (request, response){
// 	var x = request.params.x;
// 	var y = request.params.y;

// 	response.json({ answer: x + y});
// })

// var server = app.listen(config.port, displayServerInfo);

// function displayServerInfo() {
// 	var host = server.address().address;
// 	var port = server.address().port;
// 	console.log('Listening. at http://%s:%s', host, port);
// }