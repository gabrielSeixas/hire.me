// Application main start
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./app/routes');
const app = express();

mongoose.connect('mongodb://shortenerjs_db_1:shortener/shortener');

app.use(morgan('combined'));
app.use(cors());
router(app);

const port = process.env.PORT || 8888;
const server = http.createServer(app);
server.listen(port);
console.log('Server running on port: ' + port);

module.exports = app;