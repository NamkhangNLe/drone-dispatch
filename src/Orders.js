import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Orders Page</h1>
      <button className="add-button button" onClick={() => beginOrder()}>Begin Order</button>
      <button className="button" onClick={() => addOrderLine()}>Add Order Line</button>
      <button className="button" onClick={() => deliverOrder()}>Deliver Order</button>
      <button className="cancel-button" onClick={() => cancelOrder()}>Cancel Order</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function beginOrder() {
  // Grab the inputs to store into the database.
  const inputs = [];
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call begin_order(?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function addOrderLine() {
  // Grab the inputs to store into the database.
  const inputs = [];
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call add_order_line(?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function deliverOrder() {
  // Grab the inputs to store into the database.
  const inputs = [];
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call deliver_order(?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function cancelOrder() {
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call cancel_order(?,?)',
                           parameters: ['cjordan5','123']}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

export default Orders;