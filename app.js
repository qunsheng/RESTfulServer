/************************************************************** 
 * 
 * An Express server exposes the RESTful API
 * 
 **************************************************************/ 
// import global packages: express and http module
var express = require('express'), http = require('http');

// import local module
var User = require('./model.js');

// express is callable
var app = express();

// set port
app.set('port', process.env.PORT || 3000);

// use middleware bodyParser.
// middleware is a special function.
// whenever a request come in, it goes to middleware.
// middleware receives the request, and manipulate the 
// request and response objects
// and pass to next function.
app.use(express.bodyParser());
 
// Returns an array of user objects
// no need to pass the next parameter
// because it will be the end point
var listUsers = function (req, res) {
	
	User.find({}, function(error, dbUsers){
		if(error){
			console.log(error);
			res.send([]);
		} else {
			console.log("user found "+ dbUsers);
			res.send(dbUsers);
		}

	});
    
};

// Returns a single user object
//no need to pass the next parameter
//because it will be the end point
var userDetails = function (req, res) {
	// query by id
	User.findById(req.params.id, function(error, user){
		if(error){
			res.send(404);
		} else {
			console.log("user found "+ user);
			res.send(user);
		}

	} );
};

// Deletes the given user from the server
//no need to pass the next parameter
//because it will be the end point
var deleteUser = function (req, res) {
	//remove by id
	User.findByIdAndRemove( req.params.id, function(error, user){
		if(error){
			console.log(error);
		} else {
			console.log("user found and removed "+ user);
		}
		res.send(204);

	} );
};

// Creates a user based off the payload and returns the new user object 
//no need to pass the next parameter
//because it will be the end point
var createUser = function (req, res) {

	var user = new User();

	user.firstname=req.body.firstname;
	user.lastname=req.body.lastname;
	user.age=req.body.age;
	user.save(function(error, user){
		if(error){
			console.log(error);
			res.send({});
		} else {
			console.log("user saved "+ user);
			res.send(user);
		}
		
	});

};

// Updates the given user with the given payload and returns the newly updated user object
//no need to pass the next parameter
//because it will be the end point
var updateUser = function (req, res) {

	var covUser = {

		"firstname" : req.body.firstname,
		"lastname" : req.body.lastname,
		"age" : req.body.age
			
	}
	
	
	console.log("user for update: " + covUser);
	console.log("id for update: " +req.params.id);
	
	//update by id
	User.findByIdAndUpdate(req.params.id, covUser, function(error, user){
		if(error){
			console.log(error);
		} else {
			console.log("user found "+ user);
			res.send(user);
		}

	} );

};

// fill in common headers
// need pass the next parameter
// because it is not the end point
app.all('*', function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  res.header("Content-Type", "application/json");
	  // pass to next step
	  next();
});

// correct response options
//no need to pass the next parameter
//because it will be the end point
app.options('*', function(req, res) {
    console.log('!OPTIONS');
    var headers = {};
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    res.writeHead(200, headers);
    // it is end point, no need to call next step
    res.end();
});

/************************************************************** 
 * Http get request:
 * GET /users - Returns an array of user objects e.g.
 * [{ age: 38,lastname: 'Chen',firstname: 'Quentin',
 *   _id: 52dfee3b03284ba8140ce3e9 }]
 **************************************************************/ 
// register the way how express handle http get for string /users
app.get('/users', listUsers);

/************************************************************** 
 * Http get request:
 * GET /users/:id - _Returns a single user object e.g. 
 * { age: 38,lastname: 'Chen',firstname: 'Quentin',
 *   _id: 52dfee3b03284ba8140ce3e9 }.
 * A word preceded by colon :id means the :id can be replaced 
 * by any word and become a variable I can access to.
 **************************************************************/ 
//register the way how express handle http get for string /users/*
app.get('/users/:id', userDetails);

/************************************************************** 
 * Http delete request:
 * DELETE /users/:id - Deletes the given user from the server
 * A word preceded by colon :id means the :id can be replaced 
 * by any word and become a variable I can access to.
 **************************************************************/ 
//register the way how express handle http delete for string /users/*
app.del('/users/:id', deleteUser);

/************************************************************** 
 * Http post request:
 * POST /users - Creates a user based off the payload
 * and returns the new user object e.g. 
 * { age: 38, lastname: 'Chen',firstname: 'Quentin',
 *   _id: 52dfee3b03284ba8140ce3e9 }
 **************************************************************/ 
//register the way how express handle http post for string /users
app.post('/users', createUser);

/************************************************************** 
 * Http put request:
 * PUT /users/:id - Updates the given user 
 * with the given payload 
 * and returns the newly updated user object.
 * A word preceded by colon :id means the :id can be replaced 
 * by any word and become a variable I can access to.
 **************************************************************/ 
//register the way how express handle http put for string /users/*
app.put('/users/:id', updateUser);

// create web server and listen on port
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
