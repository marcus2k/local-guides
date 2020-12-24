const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true})
    .then(result => console.log('connected to mongoDB'))
    .catch(error => console.log('error connecting to mongoDB: ', error.message));

const guideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cities: {
        type: Array,
        required: true,
    },
    hourlyRate: {
        type: Array,
        required: true,
    },
    transport: {
        type: Number,
        required: true,
        min: 0,
    },
    languages: {
        type: Array,
        required: true,
    },
    intro: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        validate: /^[0-9]+$/
    }
})

guideSchema.plugin(uniqueValidator);

guideSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Guide', guideSchema);