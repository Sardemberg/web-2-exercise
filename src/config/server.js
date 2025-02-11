const { Server } = require('socket.io');

let io;

function configureSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Novo cliente conectado: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.IO não foi inicializado!");
    }
    return io;
}

module.exports = { configureSocket, getIO };
