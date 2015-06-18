// Stretch goals:
// Getting messages is not dependent on pressing submit
// Display messages on the DOM
//

// Currently not working:
// my object is not going through



//create an input field on a form that people can use to submit stuff

// var loginForm = document.createElement("form");
// document.body.appendChild(loginForm);

// var selectRoom = document.createElement('input');
// loginForm.appendChild(selectRoom);

// var enterRoom = document.createElement('button');
// enterRoom.innerHTML = "Login";
// loginForm.appendChild(enterRoom);

var form = document.createElement("form");
document.body.appendChild(form);

var inputMsg = document.createElement('input');
form.appendChild(inputMsg);
inputMsg.name = "message";

var button = document.createElement('button');
form.appendChild(button);

// var inputUserName = document.createElement('input');
// inputUserName.innerHTML = "User Name";
// form.appendChild(inputUserName);

button.innerHTML = 'Submit';
button.type = 'submit';
form.appendChild(button);

var divBox = document.createElement('div');
divBox.innerHTML = "Your divBox is working";
document.body.appendChild(divBox);

// var pBox = document.createElement('p');
// divBox.appendChild(pBox);

var list = document.createElement('ul');
list.innerHTML = "Your list is still working";
divBox.appendChild(list);

var currentlyDisplayedMsgs = null;

// var interval;

window.onload = function showMeMsgs(){
  submitItem("http://localhost:8080/chatrooms/matt");
};

// setInterval(window.onload = function showMeMsgs(){
//   submitItem("https://stormy-wildwood-8254.herokuapp.com/Matt");
// }, 10000);

// loginForm.onsubmit = function (event){
//   var userLogin = inpu
// };



//Send a request to the server
//action that gets submitted
form.onsubmit = function (event) {
  //make it so that when you get something back, it doesn't reload. Gotta be ajax
  event.preventDefault();
  var userInput = inputMsg.value;// Has to be at least 12 characters long.
  postData(userInput);
};

function postData(userInput){
  var request = new XMLHttpRequest();

  request.reponseType = 'json';
  request.open('POST', "http://localhost:8080/chatrooms/matt", true);

  request.setRequestHeader("Content-Type", "application/json");

  var object = {
    name: "Matt",
    message: userInput
  };

  request.onload = function (){
    var messages = JSON.parse(this.response);
    //Clear out the old messages
    list.innerHTML = null;
    appendUsersList(messages);
  };

  request.send(JSON.stringify(object));

}


//actually submit the thing
function submitItem(serverURL){
  var request = new XMLHttpRequest();

//When the server actually gives a response, be prepared to receive what is
  request.responseType = 'json';
  request.open('GET', serverURL, true);
  request.send();

//When the server sends something back from your last reqest, put it in a variable so you can use it
  request.onload = function() {
    var chatHistory = this.response;
    currentlyDisplayedMsgs = chatHistory;

//Trigger the function that says what you're gonna do with the server's response and pass the sever's response as an argument
  appendUsersList(chatHistory);
  };
}

//Define what actually happens to the server response
function appendUsersList (chatHistory){
  if (!(chatHistory instanceof Array)) {
    chatHistory = [chatHistory];
  }
  chatHistory.forEach(function(userPost){
    list.innerHTML += "<li>" + userPost.name + ": " + userPost.message + "</li>";
  });
}