require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

const dbUrl = 'mongodb+srv://codeclub:'+process.env.MONGO_PASSWORD+'@cluster0.m0mam.mongodb.net/codeclub';

mongoose.connect(dbUrl, {useNewUrlParser: true});

app.use("/api/user", userRoute);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});