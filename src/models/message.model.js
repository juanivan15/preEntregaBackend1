const mongoose = require("mongoose");

const messageScheam = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const MessageModel = mongoose.model("messages", messageScheam);

module.exports = MessageModel;