import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Views() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    displayOrdersInProgress().then(result => setOrderData(result));
  }, []);

  console.log(orderData);
  
  // document.querySelector("#myTable tbody").innerHTML = orderData.map(user => `<tr><td>${user['orderID']}</td><td>${user['cost']}</td><td>${user['num_products']}</td><td>${user['payload']}</td><td>${user['contents']}</td></tr>`).join('')
  createTable(orderData);

  function createTable(data) {
    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);
  
    var y = document.createElement("TR");
    y.setAttribute("id", "myTr");
    document.getElementById("myTable").appendChild(y);
  
    var z = document.createElement("TD");
    var t = document.createTextNode("orderID");
    z.appendChild(t);
    document.getElementById("myTr").appendChild(z);
    t = document.createTextNode("cost");
    z = document.createElement("TD");
    z.appendChild(t);
    document.getElementById("myTr").appendChild(z);

    data.forEach((da) => {
      var row = document.createElement("TR");
      row.setAttribute("id", da['orderID']);
      document.getElementById("myTable").appendChild(row);

      var d = document.createElement("TD");
      var text = document.createTextNode(da['orderID']);
      var cost = document.createTextNode(da['cost']);
      d.append(text)
      document.getElementById(da['orderID']).appendChild(d);
      d = document.createElement("TD");
      d.append(cost);
      document.getElementById(da['orderID']).appendChild(d);
    });
  }

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
  return fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'select * from orders_in_progress'}),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}


export default Views;