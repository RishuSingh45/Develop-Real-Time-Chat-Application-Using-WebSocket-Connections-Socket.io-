import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors()); 

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('sendMessage', (messageData) => {
    io.emit('receiveMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});