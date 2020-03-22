//ПОДКЛЮЧЕНИЕ
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

//

let users = [];
let connections = [];

io.sockets.on('connection', (socket) => {
    console.log('ok');
    
    connections.push(socket);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('off');
        
    });

    socket.on('sendMes', (name, msg) => {

        const object = {
            name: name,
            msg: msg
        }
        
        io.sockets.emit('addMes', object);
    });
});

