const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const sensor = require('node-dht-sensor'); // Import the DHT sensor library

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const temperaturaUmbral = 25.0;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Client connected');

  // Read sensor data
  setInterval(() => {
    // Read sensor values
    sensor.read(11, 4, (err, temperature, humidity) => {
      if (!err) {
        socket.emit('temperature', temperature.toFixed(2));
        socket.emit('humidity', humidity.toFixed(2));

        // Example LED control based on temperature threshold
        // if (temperature > temperaturaUmbral) {
        //   ledRed.writeSync(1);
        //   ledGreen.writeSync(0);
        // } else {
        //   ledRed.writeSync(0);
        //   ledGreen.writeSync(1);
        // }
      }
    });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
