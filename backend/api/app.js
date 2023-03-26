const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/roll', (req, res) => {
  const sides = req.body.sides;
  const result = Math.floor(Math.random() * sides) + 1;
  res.status(201).json({ result });
});

module.exports = app;
