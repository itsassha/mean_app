const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require("./config/db");
const { error } = require("console");
const account = require('./routes/account')

const app = express();

const port = 3000;

// Connectned Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


// Connected other API
app.use(cors()); 

// Connected bodyParser
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect db.js
mongoose.connect(config.db);

// Status connect to db.js
mongoose.connection.on('connected', () => {
    consloe.log("Подключение к БД выполнено успешно")
});
mongoose.connection.on('error', (err) => {
    consloe.log("Подключение к БД не выполнено: " + err)
});

// Main page
app.get('/', (req, res) => {
    res.send("Main page site");
});

// Connect files account.js
app.use('/account', account);

// Start server
app.listen(port, () => {
    console.log ("Сервер успешно запущен по порту: " + port);
});