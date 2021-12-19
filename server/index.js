require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://codeclub:'+process.env.MONGO_PASSWORD+'@cluster0.m0mam.mongodb.net/codeclub', {useNewUrlParser: true});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});