const express = require("express");
const app = express();
const morgan = require('morgan');

morgan.token('body', (req, res) => JSON.stringify(req.body));

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.use(express.json());

app.use(express.static('build'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get("/api/persons", (req, res) => {
  console.log(persons);
  res.send(persons);
});

app.get('/info', (req, res) => {
  res.status(200).send(
      `<p>Phonebook has info for ${persons.length}</p> 
       <p>${new Date()}</p> 
      `
  );
});

app.get('/api/person/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if(person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const generateNewId = Math.floor(Math.random() * 1000);
  const { name, number } = req.body;

  if(name === undefined || number === undefined) {
    return res.status(400).json({error: "name or number must required"});
  }
  if(persons.find(person => person.name === name)) {
    return res.status(400).json({error: 'name must be unique'});
  }

  const newPerson = {
    id: generateNewId,
    name: name,
    number: number
  }

  persons = persons.concat(newPerson);

  res.status(200).json(persons);

})


const PORT = process.env.PORT || 8080;

app.listen(PORT,  () => {

  console.log(`Server running on port http://localhost:${PORT}`);
});