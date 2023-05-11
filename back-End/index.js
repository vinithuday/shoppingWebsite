// require('dotenv').config();
const envVariables=require("./envVariables");
const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const routes=require("./routes/routes")

const mongoString = envVariables.mongoString


let port =envVariables.port
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
app.use('/', routes);
app.use(express.json());

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})