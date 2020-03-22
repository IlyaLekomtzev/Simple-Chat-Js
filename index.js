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
    console.log('Подключён успешно');
    
    connections.push(socket);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Отключён успешно');
        
    });

    socket.on('sendMes', (data) => {

        const object = {
            name: data.name,
            msg: data.msg,
            class: data.class
        }
        
        io.sockets.emit('addMes', object);
    });
});

