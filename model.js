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

// export module to outside
// export mongoose model with name: User and schema userSchema.
module.exports = mongoose.model('User', userSchema);
