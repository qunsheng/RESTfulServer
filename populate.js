/************************************************************** 
 * 
 * A proof of concept program for insert an item 
 * in users collection of mongo DB
 * 
 **************************************************************/ 

var User = require('./model.js');

// populate
var user = new User();

user.firstname="Katie";
user.lastname="Jin";
user.age=38;         

user.save(function(error, user){
	if(error){
		console.log(error);
	} else {
		console.log("user saved "+ user);
	}
	
});

