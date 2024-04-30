import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Customers() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Customers Page</h1>
      <button className="max" onClick={() => test()}>max</button>
      <button className="add-button button" onClick={() => console.log('Add Customer')}>Add Customer</button>
      <button className="cancel-button" onClick={() => console.log('Remove Customer')}>Remove Customer</button>
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

function addCustomer() {
  fetch('http://localhost:5000/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'New Customer' }),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

export default Customers;