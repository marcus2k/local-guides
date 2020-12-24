require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const Guide = require('./models/guide');

const createGuide = (obj) => {
    let newObj = {};
    const keys = [ "name", "intro", "hourlyRate", "email", "mobile", "transport", "cities", "languages" ];
    for (let i = 0; i < keys.length; i++) {
        const prop = keys[i];
        newObj[prop] = obj[prop];
    }
    console.log(newObj);
    return newObj;
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
})

app.get('/api/guides/cities', (request, response, next) => {
    Guide
    .find({})
    .then(lst => {
        const cities = new Set(lst.map(g => g.cities).reduce((a, b) => a.concat(b), []));
        response.json(Array.from(cities));
    })
    .catch(err => next(err));
});

app.get('/api/guides/languages', (request, response, next) => {
    Guide
    .find({})
    .then(lst => {
        const languages = new Set(lst.map(g => g.languages).reduce((a, b) => a.concat(b), []));
        response.json(Array.from(languages));
    })
    .catch(err => next(err));
})

app.get('/api/guides/currencies', (request, response, next) => {
    Guide
    .find({})
    .then(lst => {
        const curr = new Set(lst.map(g => g.hourlyRate[0]).reduce((a, b) => a.concat(b), []));
        response.json(Array.from(curr));
    })
    .catch(err => next(err));
})

app.put('/api/guides/email/:email', (request, response, next) => {
    const requestEmail = request.params.email;
    const newProfile = createGuide(request.body);
    Guide
    .findOneAndUpdate({email: requestEmail}, newProfile, { runValidators: true, new: true, context: 'query' })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(err => next(err));
})

app.post('/api/guides/', (request, response, next) => {
    const newGuide = new Guide(createGuide(request.body));
    
    newGuide
    .save()
    .then(g => response.json(g))
    .catch(err => next(err));
})

app.delete('/api/guides/email/:email', (request, response, next) => {
    const requestEmail = request.params.email;
    Guide
    .findAndDelete({email: requestEmail})
    .then(res => response.status(204).end())
    .catch(err => next(err));
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
