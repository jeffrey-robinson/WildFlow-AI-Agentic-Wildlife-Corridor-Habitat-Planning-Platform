const { Server } = require('socket.io');
const env = require('./env');

let io = null;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO Client Connected]: ${socket.id}`);

    socket.on('join_execution', (executionId) => {
      socket.join(`execution_${executionId}`);
      console.log(`Socket ${socket.id} joined execution room execution_${executionId}`);
    });

    socket.on('leave_execution', (executionId) => {
      socket.leave(`execution_${executionId}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO Client Disconnected]: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    console.warn('[Socket.IO]: Socket.IO not initialized yet');
  }
  return io;
};

const emitExecutionEvent = (executionId, eventName, payload) => {
  if (io) {
    io.to(`execution_${executionId}`).emit(eventName, payload);
    io.emit('global_agent_event', { executionId, eventName, payload });
  }
};

module.exports = {
  initSocket,
  getIO,
  emitExecutionEvent,
};
