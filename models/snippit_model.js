const mongoose = require('mongoose');

const snippitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Snippit', snippitSchema);