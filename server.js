require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const Guide = require('./models/guide');
/*
let guides = [ // sampleData
    {
        name: "Marcus",
        gender: "M",
        cities: ["Bali, Indonesia"],
        hourlyRate: ["SGD", 80],
        transport: 3,
        languages: ["English", "Chinese", "Indonesian"],
        intro: "Hi, my name is Marcus.",
        email: "marcus.nuschbe@gmail.com",
        mobile: "00000000",
    },
    {
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
]*/

const createGuide = (obj) => {
    let newObj = {};
    const keys = [ "name", "intro", "hourlyRate", "email", "mobile", "transport", "cities", "languages" ];
    for (let i = 0; i < keys.length; i++) {
        const prop = keys[i];
        newObj[prop] = obj[prop];
    }
    console.log(newObj);
    return newObj;

    /*const guide = new Guide({
        name: body.name,
        email: body.email,
        cities: body.cities,
        languages: body.languages,
        name: body.name,
        transport: body.transport,
        intro: body.intro,
        hourlyRate: body.hourlyRate
      });*/
}

app.get('/api/guides/list', (request, response, next) => {
    Guide
    .find({})
    .then(lst => {
        console.log(lst);
        response.json(lst);
    })
    .catch(err => next(err));
})

app.get('/api/guides/city/:city', (request, response, next) => {
    const city = request.params.city;
    Guide
    .find({})
    .then(lst => {
        const filtered = lst.filter(g => g.cities.includes(city));
        console.log(filtered);
        response.json(filtered);
    })
    .catch(err => next(err));
    //response.json(guides.filter(g => g.cities.includes(city)));
})

app.get('/api/guides/email/:email', (request, response, next) => {
    const email = request.params.email;
    Guide
    .find({email: email})
    .then(lst => {
        if (lst.length === 0) {
            return response.status(404).end();
        }
        console.log("user is ", lst[0]);
        response.json(lst[0]);
    })
    .catch(err => next(err));
    //const user = guides.filter(g => g.email === email);
    //user.length ? response.json(user[0]) : response.status(404).end();
})

app.get('/api/guides/cities', (request, response, next) => {
    Guide
    .find({})
    .then(lst => {
        const cities = new Set(lst.map(g => g.cities).reduce((a, b) => a.concat(b), []));
        response.json(Array.from(cities));
    })
    .catch(err => next(err));
    //const cities = new Set(guides.map(g => g.cities).reduce((a, b) => a.concat(b), []));
    //response.json(Array.from(cities));
});

app.get('/api/guides/languages', (request, response, next) => {
    Guide
    .find({})
    .then(lst => {
        const languages = new Set(lst.map(g => g.languages).reduce((a, b) => a.concat(b), []));
        response.json(Array.from(languages));
    })
    .catch(err => next(err));
    /*
    const languages = new Set(guides.map(g => g.languages).reduce((a, b) => a.concat(b), []));
    console.log("Languages are ", languages);
    response.json(Array.from(languages));
    */
})

app.get('/api/guides/currencies', (request, response, next) => {
    Guide
    .find({})
    .then(lst => {
        const curr = new Set(lst.map(g => g.hourlyRate[0]).reduce((a, b) => a.concat(b), []));
        response.json(Array.from(curr));
    })
    .catch(err => next(err));
    /*
    const curr = new Set(guides.map(g => g.hourlyRate[0]).reduce((a, b) => a.concat(b), []));
    console.log("Currencies are ", curr);
    response.json(Array.from(curr));*/
})

app.put('/api/guides/email/:email', (request, response, next) => {
    const requestEmail = request.params.email;
    const newProfile = createGuide(request.body);
    Guide
    .findOneAndUpdate({email: requestEmail}, newProfile, { runValidators: true, new: true, context: 'query' })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(err => next(err));

    /*
    console.log(newProfile);
    const hasSuchUser = guides.filter(g => g.email.toLowerCase() === newProfile.email.toLowerCase()).length !== 0;
    if (hasSuchUser) {
        guides = guides.map(g => g.email.toLowerCase() === newProfile.email.toLowerCase() ? newProfile : g);
        response.json(newProfile);
        console.log("guides updated, ", guides);
        return;
    }
    response.status(404).end();
    */
})

app.post('/api/guides/', (request, response, next) => {
    // const requestEmail = request.params.email;
    const newGuide = new Guide(createGuide(request.body));
    
    newGuide
    .save()
    .then(g => response.json(g))
    .catch(err => next(err));
    /*
    console.log(newProfile);
    const hasSuchUser = guides.filter(g => g.email.toLowerCase() === newProfile.email.toLowerCase()).length !== 0;
    if (!hasSuchUser) {
        guides = guides.concat(newProfile);
        response.json(newProfile);
        console.log("guides updated, ", guides);
        return;
    }
    response.status(400).end(); // bad request*/
})

app.delete('/api/guides/email/:email', (request, response, next) => {
    const requestEmail = request.params.email;
    Guide
    .findAndDelete({email: requestEmail})
    .then(res => response.status(204).end())
    .catch(err => next(err));
    //guides = guides.filter(g => g.email.toLowerCase() !== requestEmail);
    //response.status(204).end();    
})


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


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
