const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.post('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Handling a POST request' });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
