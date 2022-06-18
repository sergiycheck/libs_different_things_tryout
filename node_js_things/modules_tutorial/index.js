//https://www.sitepoint.com/understanding-module-exports-exports-node-js/

const user = require('./helperUser_with_exports');

console.log(
	`User: ${user.userGetter()}, 
	Location ${user.getLocation()}
	BirthDate ${user.dateOfBirth}`);

const {userGetter,getLocation, dateOfBirth} = require('./helperUser_shorter_exports');

console.log(
	`User: ${userGetter()}, 
	Location ${getLocation()}
	BirthDate ${dateOfBirth}`);

const User = require('./user_class');
const userObject = new User('UserName1','34','email1@domain.com');

console.log(userObject.getUserInto());

console.log(module)

//As module.exports and exports both point to the same object, it doesn’t 
//normally matter which you use.
//import are permitted to be used only in 
//ES modules and the specifier of this statement 
//can either be a URL-style relative path or a package name
//CommonJS
// {
//require, module.exports
// }

// ES6
// {
		//import, export
// }

//You can't selectively load only the pieces 
//you need with require but with imports, you can selectively 
//load only the pieces you need. That can save memory.
//Loading is synchronous(step by step) for require 
//on the other hand import can be asynchronous(without waiting 
//for previous import) so it can perform a little better than require.

