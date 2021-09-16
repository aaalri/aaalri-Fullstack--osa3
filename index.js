require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')


app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
app.use(express.json())

morgan.token('post-data', function (req, res) { 
    if (req.method === "POST") {
            return JSON.stringify(req.body)
        } else {
            return
        }    
    })


app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
})

const generateId = () => {
    return Math.floor(Math.random() * 999999) + 1
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }

    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }

    if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    note.save().then(person => {
        response.json(person)
    })
    
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})