const express = require('express');
const http = require('http');
const path = require('path');
var router = express.Router();
const app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 3004;
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});
app.use(express.static(__dirname + '/dist/kidspro'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/dist/kidspro')});
});

const server = http.createServer(app);

server.listen(port, () => console.log('Acamy Kids is Running in port: ' + port));

module.exports = router;
