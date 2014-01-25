/************************************************************** 
 * 
 * A proof of concept program for update an item 
 * in users collection of mongo DB
 * 
 **************************************************************/ //
var User = require('./model.js');

//update by id
User.findByIdAndUpdate("52df70119174d6f803fd90fc", {age: 40}, function(error, user){
	if(error){
		console.log(error);
	} else {
		console.log("user found "+ user);
	}

} );
