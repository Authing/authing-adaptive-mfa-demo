const path = require('path');
const express = require('express');
const apiRouter = require('./api');
const apiFilter = require('./api-filter');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const static = path.join(__dirname, '../client/dist')

app.use(express.static(static));
app.use(apiFilter);

app.get('/hello', function (req, res) {
  res.send('Hello, world!');
});

app.use('/api', apiRouter);

app.listen(3099, function () {
  console.log('Listening on 3099');
});