/************************************************************** 
 * 
 * A proof of concept program for remove an item 
 * in users collection of mongo DB
 * 
 **************************************************************/ 

var User = require('./model.js');

//remove by id
User.findByIdAndRemove("52e075dc2b08dd54206547d1", function(error, user){
	if(error){
		console.log(error);
	} else {
		console.log("user found and removed "+ user);
	}

} );
