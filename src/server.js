// Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'drone_dispatch',
});

// Initialize the Express app
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());
app.use(express.json());
// app.listen(5000, () => console.log('Server is running on port 5000'));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

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

app.post('/', (req, res) => {
  // Access the data in req.body, save it to the database, etc.
  // Send a response when done

  console.log(req.body['sql'])
  res.contentType('application/json');
  connection.query(req.body['sql'], function (err, result) {
    if (result  == null) {
      res.json({status: 'Success'})
    } else {
      result = JSON.parse(JSON.stringify(result))
      if (err) throw err;
      console.log(result);
      res.json(result)
    };
  });
});

app.post('/procedure', (req, res) => {
  // Access the data in req.body, save it to the database, etc.
  // Send a response when done

  console.log(req.body['sql'])
  console.log(req.body['parameters'])
  res.contentType('application/json');
  connection.query(req.body['sql'], req.body['parameters'], function (err, result) {
    if (result  == null) {
      res.json({status: 'Success'})
    } else {
      result = JSON.parse(JSON.stringify(result))
      if (err) throw err;
      console.log(result);
      res.json(result)
    };
  });
});