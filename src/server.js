// Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'drone_dispatch',
});

// Initialize the Express app
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());
// app.listen(5000, () => console.log('Server is running on port 5000'));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/customers', (req, res) => {
  // Access the data in req.body, save it to the database, etc.
  // Send a response when done
  res.json({ message: 'Customer added' });
});

// Function to serve HTML files
function serveHtmlFile(route, filename) {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', filename));
  });
}

// Use the function to create routes
serveHtmlFile('/', 'index.html');
serveHtmlFile('/drones', 'drones.html');
serveHtmlFile('/orders', 'orders.html');
serveHtmlFile('/pilots', 'pilots.html');
serveHtmlFile('/products', 'products.html');
serveHtmlFile('/views', 'views.html');

// Other routes
app.get('/customers', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});



app.get('/db-check', (req, res) => {
  connection.query('SELECT 1', (err, results) => {
    if(err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
    } else {
      res.send('Database is connected');
    }
  });
});

