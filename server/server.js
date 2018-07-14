const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.static(publicPath));

// Web Socket
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.on('userIsTyping', (message) => {
        console.log(message.message);
    }); 

    socket.on('createMessage', (message) => {
        socket.emit('newMessage', {
            sender: message.sender,
            receiver: message.receiver,
            body: message.body
        })
    });
});

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

