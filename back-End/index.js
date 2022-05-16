// require('dotenv').config();
const databseApiKey=require("./dbKeyApi");
const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const routes=require("./routes/routes")

const mongoString = databseApiKey;

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(cors())
app.use('/api', routes);
app.use(express.json());

app.listen(2020, () => {
    console.log(`Server Started at ${2020}`)
})