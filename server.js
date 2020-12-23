const express = require('express');
const app = express();
app.use(express.json())

const guides = [ // sampleData
    {
        id: "0",
        name: "Marcus",
        gender: "M",
        cities: ["Singapore, Singapore", "Bali, Indonesia"],
        hourlyRate: ["SGD", 80],
        transport: 3,
        languages: ["English", "Chinese", "Indonesian"],
        intro: "Hi, my name is Marcus.",
        email: "marcus@u.nus.edu",
        mobile: "00000000",
    },
    {
        id: "1",
        name: "Ivanka",
        gender: "F",
        cities: ["Singapore, Singapore"],
        hourlyRate: ["SGD", 70],
        transport: 0,
        languages: ["English"],
        intro: "Hi, my name is Ivanka",
        email: "ivanka@example.com",
        mobile: "6589482193",
    },
    {
        id: "2",
        name: "Budi",
        gender: "M",
        cities: ["Bali, Indonesia"],
        hourlyRate: ["IDR", 100000],
        transport: 3,
        languages: ["English", "Indonesian"],
        intro: "Hi, my name is Budi",
        email: "budi@example.com",
        mobile: "628189482193",
    },
    {
        id: "3",
        name: "Chen Long", // yes
        gender: "M", 
        cities: ["Melbourne, Australia"],
        hourlyRate: ["AUD", 400], // yes
        transport: 0, // yes
        languages: ["Chinese", "English"],
        intro: "Hi, my name is Chen Long, call me Jackie!",
        email: "jackie@example.com",
        mobile: "6139482193",
    },
    {
        id: "4",
        name: "Albert Pozowski", // yes
        gender: "M", 
        cities: ["Melbourne, Australia"],
        hourlyRate: ["AUD", 400], // yes
        transport: 0, // yes
        languages: ["Chinese", "English"],
        intro: "Hi, my name is Chen Long, call me Jackie!",
        email: "albert@example.com",
        mobile: "6139482193",
    },
    {
        id: "5",
        name: "Pauline Meadows", // yes
        gender: "M", 
        cities: ["Melbourne, Australia"],
        hourlyRate: ["AUD", 400], // yes
        transport: 0, // yes
        languages: ["Chinese", "English"],
        intro: "Hi, my name is Chen Long, call me Jackie!",
        email: "pauline@example.com",
        mobile: "6139482193",
    },
    {
        id: "6",
        name: "Mike Blackbeard", // yes
        gender: "M", 
        cities: ["Melbourne, Australia"],
        hourlyRate: ["AUD", 400], // yes
        transport: 0, // yes
        languages: ["Chinese", "English"],
        intro: "Hi, my name is Chen Long, call me Jackie!",
        email: "paul@example.com",
        mobile: "6139482193",
    },
    {
        id: "7",
        name: "Billie",
        gender: "F",
        cities: ["Bangkok, Thailand"],
        hourlyRate: ["THB", 40],
        transport: 3,
        languages: ["English", "Thai"],
        intro: "Hi, my name is Billie",
        email: "billie@example.com",
        mobile: "6139482193",
    }
]

app.get('/api/guides/list', (request, response, next) => {
    response.send(guides);
    /*Person
    .find({})
    .then(persons => response.json(persons))
    .catch(err => next(err));*/
})

app.get('/api/guides/cities', (request, response, next) => {
    const cities = new Set(guides.map(g => g.cities).reduce((a, b) => a.concat(b), []));
    response.send(Array.from(cities));
});

app.get('/api/guides/languages', (request, response, next) => {
    const languages = new Set(guides.map(g => g.languages).reduce((a, b) => a.concat(b), []));
    response.send(Array.from(languages));
})

/*
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
// handler of requests with unknown endpoint
app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
}
  
app.use(errorHandler)
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
