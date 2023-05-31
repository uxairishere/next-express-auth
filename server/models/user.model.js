const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    occupation : {type: String},
    company : {type: String},
    profileImg: {type: String},
    createdAt: {type: Date, default: Date.now},
    role: {type: String, default: "user"}
},
{collection: 'user-data'})

const UserModel = mongoose.model('auth', UserSchema);

module.exports = UserModel;