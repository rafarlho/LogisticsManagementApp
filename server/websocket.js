const {MongoClient} = require('mongodb')
const socketIO = require('socket.io')

const mongoUrl = 'mongodb://127.0.0.1:27017/logistic_app';

const startWebSocketServer = (server) => {
    const io = socketIO(server);
  
    const startChangeStream = async () => {
      const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db();
      const requestsCollection = db.collection('requests');
  
      const changeStream = requestsCollection.watch({ fullDocument: 'updateLookup' });
  
      changeStream.on('change', (change) => {
        io.sockets.emit('change', change.fullDocument);
      });
  
      io.on('connection', (socket) => {
        console.log('Client connected');
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });
    };
  
    startChangeStream();
  };
  
  module.exports = startWebSocketServer;