import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Views() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  
  useEffect(() => {
    displayOrdersInProgress().then(result => setOrderData(result));
  }, []);

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