var express = require('express');
var router = express.Router();

var chatroomModule = require('../lib/chatroom.js');

module.exports = router;

router.use(function(req, res, next){
  console.log('Chatroom Router');
  next();
});

router.route('/:chatroom')
  .get(function (req, res) {
  // TODO:
    // check if directory does not exists
    // create chatroom

    // return readDirectory (use: res.json)
    console.log(req.body);
    var chatroomName = req.params.chatroom;
    var messages = chatroomModule.readChatroom(chatroomName);
    // console.log(messages);
    res.json(messages);
  })

  .post(function (req, res) {

    var newMessage = {
      name: req.body.name,
      message: req.body.message
    };

    var messages = chatroomModule.postMessage(newMessage, req.params.chatroom);
    res.json(messages);
  });