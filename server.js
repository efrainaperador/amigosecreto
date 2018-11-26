const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/dist')));

app.use('/api', apiRouter);

app.use(cors());

mongoose.connect('mongodb://localhost:27017/amigosecreto', {});

app.listen(8080, () => {
    console.log("Server up on port 8080");
});