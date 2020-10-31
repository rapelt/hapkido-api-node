let io: any;

module.exports = {
    init: (httpServer: any) => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIo: () => {
        if(!io) {
            throw new Error('Socket not initialised');
        }

        return io;
    }
}
