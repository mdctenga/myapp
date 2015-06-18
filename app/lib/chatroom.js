module.exports = {
	setDirectory: _setDirectory,
	getDirectory: _getDirectory,
	createRoom: _createRoom,
	readChatroom: _readChatroom,
	postMessage: _postMessage,
	getUserMessages: _getUserMessages
};

var fs = require ('fs');
var path = require ('path');

var _chatDirectory = null;

function _setDirectory ( directoryPath ) {
	var directory = null;
	var dirPath = path.resolve(directoryPath);

	try {
		directory = fs.statSync( dirPath );
	} catch (err) {
		fs.mkdirSync( dirPath);
		directory = fs.statSync( dirPath );
	}

	var isDirectory = directory.isDirectory();


	if (isDirectory === true){

		_chatDirectory = directoryPath;
	}

	return isDirectory;
}

function _getDirectory () {
	return _chatDirectory;
}

function _createRoom( roomName ){
	var messages = [];
	var filePath = path.resolve(_chatDirectory, roomName + '.json');

	fs.writeFileSync( filePath, JSON.stringify( messages ) );

	return messages;
}

function _readChatroom (roomName, userName) {
	var filepath = path.resolve(_chatDirectory, roomName + '.json');
	var fileString = null; //instanciation

	try {
		fileString = fs.readFileSync( filepath  ).toString();
	} catch (err) {
		return _createRoom( roomName );

	}

	if (userName === undefined) {
		// If userName didn't exist, then do our old code.
		return JSON.parse( fileString );
	} else {
		// If we now have a user name, the do this.
		// Array.prototype.filter
		return JSON.parse( fileString ).filter(function (message){

			if(userName === message.name){
				return true;
			}
		});
	}
}

function _postMessage ( message, roomName ) {
	var messages = _readChatroom(roomName);
	// var newMessage = {
	// 	name: message.name,
	// 	message: message.message,
	// 	id: messages.length + 1,
	// 	timestamp: new Date().toString()
	// };
	message.id = messages.length + 1;
	message.timestamp = new Date().toString();

	messages.push( message );

	var filepath =  path.resolve(_chatDirectory, roomName + '.json' );

	fs.writeFileSync( filepath, JSON.stringify( messages ) );

	return messages;
}

function _getUserMessages(userName){
	//The goal of this function is to get all of a single user's messages from all rooms.
	// console.log("userName: ", userName);
	// console.log("userName type: ", typeof userName);
	var fileNames = fs.readdirSync(_chatDirectory);
	var userMessagesArr = [];

	fileNames.forEach(function(file){
		var chatroomName = file.slice(0, -5);
		var datReturn = _readChatroom(chatroomName, userName);
		userMessagesArr = userMessagesArr.concat(datReturn);
	});

	console.log(userMessagesArr);

	return userMessagesArr;
}