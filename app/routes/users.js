var express = require('express');
var router = express.Router();

var chatroomModule = require('../lib/chatroom.js');

module.exports = router;

router.route('/:username')
  .get(function (req, res) {

  });



// app.get('/users/:username', function (req, res) {

// });

// app.post('/users/:username/:chatroomName', function (req, res) {

// });