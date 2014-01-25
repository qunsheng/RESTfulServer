/************************************************************** 
 * 
 * An Express server exposes the RESTful API
 * 
 **************************************************************/ 
var express = require('express'), http = require('http');

var User = require('./model.js');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());
 
// Returns an array of user objects
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
app.all('*', function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  res.header("Content-Type", "application/json");
	  next();
});

// correct response options
app.options('*', function(req, res) {
    console.log('!OPTIONS');
    var headers = {};
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    res.writeHead(200, headers);
    res.end();
});

/************************************************************** 
 * GET /users - Returns an array of user objects e.g.
 * [{ age: 38,lastname: 'Chen',firstname: 'Quentin',
 *   _id: 52dfee3b03284ba8140ce3e9 }]
 **************************************************************/ 
app.get('/users', listUsers);

/************************************************************** 
 * GET /users/:id - _Returns a single user object e.g. 
 * { age: 38,lastname: 'Chen',firstname: 'Quentin',
 *   _id: 52dfee3b03284ba8140ce3e9 }
 **************************************************************/ 
app.get('/users/:id', userDetails);

/************************************************************** 
 * DELETE /users/:id - Deletes the given user from the server
 **************************************************************/ 
app.del('/users/:id', deleteUser);

/************************************************************** 
 * POST /users - Creates a user based off the payload
 * and returns the new user object e.g. 
 * { age: 38,lastname: 'Chen',firstname: 'Quentin',
 *   _id: 52dfee3b03284ba8140ce3e9 }
 **************************************************************/ 
app.post('/users', createUser);

/************************************************************** 
 * PUT /users/:id - Updates the given user 
 * with the given payload 
 * and returns the newly updated user object
 **************************************************************/ 
app.put('/users/:id', updateUser);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
