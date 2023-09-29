const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');

const router = require('./routes/auth');

const app = express();

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || '3000';

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(express.static('js'));


app.use('/', router);

app.listen(port, ()=>{
    console.log(`The server is running at http://${hostname}:${port}.`);
});

