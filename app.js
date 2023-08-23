const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
//const Gpio = require('onoff').Gpio;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//const ledRed = new Gpio(24, 'out');
//const ledGreen = new Gpio(25, 'out');
const temperaturaUmbral = 25.0;

let simulatedTemperatura = 20.0; // Initial simulated temperature

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Client connected');

  // Simulate sensor data
  setInterval(() => {
    // Fluctuate the simulated temperature slightly
    simulatedTemperatura += (Math.random() - 0.5) * 2; // Change range here

    socket.emit('temperature', simulatedTemperatura);

    // if (simulatedTemperatura > temperaturaUmbral) {
    //   ledRed.writeSync(1);
    //   ledGreen.writeSync(0);
    // } else {
    //   ledRed.writeSync(0);
    //   ledGreen.writeSync(1);
    // }
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
