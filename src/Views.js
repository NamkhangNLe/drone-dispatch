import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Views() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  
  useEffect(() => {
    displayOrdersInProgress().then(result => setOrderData(result));
  }, []);
  
  document.querySelector("#myTable tbody").innerHTML = orderData.map(user => `<tr><td>${user['orderID']}</td><td>${user['cost']}</td><td>${user['num_products']}</td><td>${user['payload']}</td><td>${user['contents']}</td></tr>`).join('')

  return (
    <div>
      <h1>Views Page</h1>
      <button className="button" onClick={() => console.log('Role Distribution')}>Role Distribution</button>
      <button className="button" onClick={() => console.log('Customer Credit Check')}>Customer Credit Check</button>
      <button className="button" onClick={() => console.log('Drone Traffic Control')}>Drone Traffic Control</button>
      <button className="button" onClick={() => console.log('Most Popular Products')}>Most Popular Products</button>
      <button className="button" onClick={() => console.log('Drone Pilot Roster')}>Drone Pilot Roster</button>
      <button className="button" onClick={() => console.log('Store Sales Overview')}>Store Sales Overview</button>
      <button className="button" onClick={() => displayOrdersInProgress()}>Orders In Progress</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>

    <h1 class="display-3">Orders in Progress</h1>
    <table class="table table-dark table-striped" id="myTable">
      <thead>
        <tr>
          <th scope="col">orderID</th>
          <th scope="col">cost</th>
          <th scope="col">num_products</th>
          <th scope="col">payload</th>
          <th scope="col">contents</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
  );
}

function displayOrdersInProgress () {
  return fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call orders_in_progress(?)',
                           parameters: ['cjordan5']}),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default Views;