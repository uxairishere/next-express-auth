const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    occupation : {type: String},
    company : {type: String},
    profileImg: {type: String},
    createdAt: {type: Date, default: Date.now},
    role: {type: String, default: "user"},
    store_header: {
        public_id: {type: String, required: true},
        url: {type: String, required: true}
    }
},
{collection: 'user-data'})

const UserModel = mongoose.model('auth', UserSchema);

module.exports = UserModel;