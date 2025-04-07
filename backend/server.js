// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

let equipos = [
  {
    name: 'BrightBloom',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_Glow.png' }
  },
  {
    name: 'SmartPet Solutions',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_Meow.jpg' }
  },  
  {
    name: 'XicoWeb',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_Ixaya.jpeg' }
  },
  {
    name: 'BDMatrix',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_Gym.png' }
  },  
  {
    name: 'Violet',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_Dimen.png' }
  },
  {
    name: 'Xicolab',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_Xicolab.png' }
  },
  {
    name: 'MediTech',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_PillBox.png' }
  },
  {
    name: 'Virtall',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_iHome.png' }
  },
  {
    name: 'DreamStudios',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_Iris.png' }
  },
  {
    name: 'SabeRed',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_Sabores.png' }
  },
  {
    name: 'MedikOS',
    puntaje: 0,
    pictureSettings: { src: 'http://10.10.62.17:3000/images/Logo_MedikOS.jpg' }
  }
];

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.emit('conexionInicial', equipos);

  socket.on('aumentarPuntaje', ({ index, puntaje }) => {
    if (equipos[index]) {
      equipos[index].puntaje += puntaje; // Se suma el puntaje recibido
      io.emit('puntajeActualizado', equipos); // Se emite la lista actualizada
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});
