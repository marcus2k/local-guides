const mongoose = require("mongoose")

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true})
    .then(result => console.log('connected to mongoDB'))
    .catch(error => console.log('error connecting to mongoDB: ', error.message));

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