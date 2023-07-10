const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    assignedto: {
        type: String,
        // default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    duedate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "New"
    },

});

module.exports = mongoose.model('task', TaskSchema);