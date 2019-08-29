const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const regSchema = new Schema({
    username: String,
    email: String,
    password: String,
    image:String,
});

module.exports = mongoose.model('Register', regSchema);  