const express = require('express');
const cors = require('cors')
const path = require('path');

const apiRouter = require('./routes/api');
const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

module.exports = app;
