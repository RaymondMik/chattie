const socket = io('http://localhost:3000');


const messageBoard = document.querySelector('div.message-board');
const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');

socket.on('connect', function() {
    //alert('Connected to server!');
});

socket.on('disconnect', function() {
    //alert('Disconnected to server!');
});

socket.on('newMessage', function(message) {
    const messageHtml = document.createElement('div');
    messageHtml.innerText = message.body;
    messageBoard.appendChild(messageHtml);
});

function userIsTypingSocketEVent() {
    socket.emit('userIsTyping', {
        message: 'user is typing...'
    });
}

function submitMessageSocketEvent(e) {
    e.preventDefault();
    const inputValue = input.value;
    socket.emit('createMessage', {
        sender: 'romualdo@bigul.com',
        receiver: 'jillie@poo.com',
        body: inputValue
    });
}

input.addEventListener('input', userIsTypingSocketEVent);
form.addEventListener('submit', submitMessageSocketEvent);