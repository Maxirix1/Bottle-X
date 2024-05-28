// server.js

import express from 'express';
const app = express();
const port = 3000;

// Define your API endpoints here
app.get('/api/users', (req, res) => {
  // Handle GET request for users
  res.json({ message: 'GET request for users' });
});

app.post('/api/users', (req, res) => {
  // Handle POST request for creating users
  res.json({ message: 'POST request for creating users' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
