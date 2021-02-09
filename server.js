const express = require('express');
const https = require('https');
const fs = require('fs');
const serverOptions = {
  key:  fs.readFileSync('ssl/cert.key'),
  cert: fs.readFileSync('ssl/cert.crt'),
};
const port = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/talk-quiz-en/', express.static('talk-quiz-en'));
const server = https.createServer(serverOptions, app);
server.listen(port);
// app.listen(port);

