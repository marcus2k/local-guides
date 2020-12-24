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
    cities: Array,
    hourlyRate: Array,
    transport: {
        type: Number,
        required: true,
    },
    languages: Array,
    intro: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
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