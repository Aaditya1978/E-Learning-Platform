const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    name: {
        type: String,
        required: true},
    password: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true,
        unique: true}
    }, {collection: 'admin-data'});

const model = mongoose.model('AdminData', Admin);

module.exports = model;