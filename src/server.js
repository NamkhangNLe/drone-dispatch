const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'drone_dispatch',
  port: 3306
});

const path = require('path');
const app = express();
const port = 5000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/customers', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'customers.html'));
});

app.get('/drones', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'drones.html'));
});

app.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'orders.html'));
});

app.get('/pilots', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pilots.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'products.html'));
});

app.get('/views', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
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