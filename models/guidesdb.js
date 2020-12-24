const mongoose = require("mongoose")

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

const guideSchema = new mongoose.Schema({
    name: String,
    cities: Array,
    hourlyRate: Array,
    transport: Number,
    languages: Array,
    intro: String,
    email: String,
    mobile: String,
})

guideSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Guide', guideSchema);