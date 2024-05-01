import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [orderID, setOrderID] = useState('');

  useEffect(() => {
    getOrderInformation().then(result => setOrderData(result));
  }, []);


  return (
    <div>
      <h1>Orders Page</h1>
      <input type="text" id="orderID" placeholder="Enter Order ID"></input>
      <input type="text" id="sold_on" placeholder="YYYY-MM-DD"></input>
      <input type="text" id="purchased_by" placeholder="Enter Username"></input>
      <input type="text" id="carrier_store" placeholder="Enter Store ID"></input>
      <input type="text" id="carrier_tag" placeholder="Enter Drone Tag"></input>
      <input type="text" id="barcode" placeholder="Enter Barcode"></input>
      <input type="text" id="price" placeholder="Enter Price"></input>
      <input type="text" id="quantity" placeholder="Enter Quantity"></input>

      <button className="add-button button" onClick={() => beginOrder()}>Begin Order</button>
      <button className="button" onClick={() => addOrderLine()}>Add Order Line</button>
      <select className="select-dropdown" onChange={e => setOrderID(e.target.value)}>
        {orderData.map((order, index) => (
          <option key={index} value={order.orderID}>{order.orderID}</option>
        ))}
      </select>
      <button className="button" onClick={() => deliverOrder(orderID)}>Deliver Order</button>
      <select className="select-dropdown" onChange={e => setOrderID(e.target.value)}>
        {orderData.map((order, index) => (
          <option key={index} value={order.orderID}>{order.orderID}</option>
        ))}
      </select>
      <button className="cancel-button" onClick={() => cancelOrder(orderID)}>Cancel Order</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function getOrderInformation() {
  
  return fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({ sql: 'select distinct orderID from orders'}),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function cancelOrder(orderID) {
  const inputs = [];
  inputs.push(orderID);
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call cancel_order(?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function beginOrder() {
  // Grab the inputs to store into the database.
  const inputs = [];
  inputs.push(document.getElementById("orderID").value);
  inputs.push(document.getElementById("sold_on").value);
  inputs.push(document.getElementById("purchased_by").value);
  inputs.push(document.getElementById("carrier_store").value);
  inputs.push(parseInt(document.getElementById("carrier_tag").value));
  inputs.push(document.getElementById("barcode").value);
  inputs.push(parseInt(document.getElementById("price").value));
  inputs.push(parseInt(document.getElementById("quantity").value));
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call begin_order(?, ?, ?, ?, ?, ?, ?, ?)',
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

function deliverOrder(orderID) {
  const inputs = [];
  inputs.push(orderID)
  
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

export default Orders;