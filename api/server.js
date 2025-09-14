const express = require('express');
const { logger } = require('./middleware/middleware');
const useRouter = require("./users/users-router");

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', useRouter);
// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});
server.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});
module.exports = server;
