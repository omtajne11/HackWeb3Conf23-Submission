// app.js
const express = require('express');
const app = express();
const port = 3000; // Change this to the desired port number

// Serve static files from the "public" folder
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Stashit app listening at http://localhost:${port}`);
});