import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Customers() {
  const navigate = useNavigate();
 // <button className="max" onClick={() => test()}>max</button>
  return (
    <div>
      <h1>Customers Page</h1>
      
      <input type="text" id="username" placeholder="Enter Username"></input>
      <input type="text" id="first_name" placeholder="Enter First Name"></input>
      <input type="text" id="last_name" placeholder="Enter Last Name"></input>
      <input type="text" id="address" placeholder="Enter Address"></input>
      <input type="text" id="birthdate" placeholder="YYYY-MM-DD"></input>
      <input type="text" id="rating" placeholder="Enter Rating"></input>
      <input type="text" id="credit" placeholder="Enter Credit"></input>
      <button className="add-button button" onClick={() => addCustomer()}>Add Customer</button>
      <button className="cancel-button" onClick={() => removeCustomer()}>Remove Customer</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function test() {
  console.log('max gets yummy food')
  fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({sql: 'select * from customers'}),
  })
    .then(res => res.json()) // Parse the JSON from the response
    .then(result => console.log(result)) // Log the data
    .catch(err => console.error(err)); // Log any errors
}

function removeCustomer() {
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call remove_customer(?)',
                           parameters: ['cjordan5']}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function addCustomer() {
  // Grab the inputs to store into the database.
  const inputs = [];
  inputs.push(document.getElementById("username").value);
  inputs.push(document.getElementById("first_name").value);
  inputs.push(document.getElementById("last_name").value);
  inputs.push(document.getElementById("address").value);
  inputs.push(document.getElementById("birthdate").value);
  inputs.push(parseInt(document.getElementById("rating").value));
  inputs.push(parseInt(document.getElementById("credit").value));
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call add_customer(?,?,?,?,?,?,?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

export default Customers;