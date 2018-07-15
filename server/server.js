const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.static(publicPath));

// Web Socket
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.on('sendUserIsTyping', (message) => {
        socket.broadcast.emit('broadcastUserIsTyping', message.text);
    }); 

    socket.on('createMessage', (message) => {
        // emit event to all connections
        io.emit('newMessage', generateMessage(message));
    });
});

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

