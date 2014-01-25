/************************************************************** 
 * 
 * A mongoose user model.
 * Commends to check in Mongo DB:
 * 		C:\mongodb\bin>mongo
 *  	> use contacts
 *		> db.users
 *		> db.users.find();
 *		> exit
 * 
 **************************************************************/ 
var mongoose = require('mongoose');

mongoose.connect('localhost', 'contacts');
 
var userSchema = new mongoose.Schema({
	firstname    : String,
	lastname     : String,
	age          : Number
});
  
// userSchema save to User model
module.exports = mongoose.model('User', userSchema);
