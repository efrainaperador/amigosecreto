const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    familia: {
        type: String,
        required: true
    },
    amigo: {
        type: String,
        required: false
    },
    ocupado: {
        type: Boolean,
        required: false
    },
    password: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);