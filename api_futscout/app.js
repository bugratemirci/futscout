const express = require('express');
const app = express();
const routers = require('./routers/index');
const path = require('path');
const cors = require('cors');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const dotenv = require('dotenv').config({
    path: "./config/env/config.env"
});
const connectDatabase = require('./helpers/database/connectDatabase');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


connectDatabase();

app.use("/api", routers);

// Static file
app.use(express.static(path.join(__dirname,"public")));
app.listen(port, () => {
    console.log(`listening on ${port} : ${process.env.NODE_ENV}`);
});