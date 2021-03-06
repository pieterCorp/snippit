const mongoose = require('mongoose');

const snippitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('Snippit', snippitSchema);