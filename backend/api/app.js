const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/roll', (req, res) => {
  const sides = req.body.sides; // número de lados do dado escolhido
  const result = Math.floor(Math.random() * sides) + 1; // rolagem do dado
  res.status(201).json({ result }); // retorna o resultado da rolagem para o front
});

module.exports = app;
