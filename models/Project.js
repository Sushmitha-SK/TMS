const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedUser: {
        type: String,
        // required: true
    },
    createdBy: {
        type: String

    }

});

module.exports = mongoose.model('project', ProjectSchema)