import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Views() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // useEffect(() => {
  //   displayOrdersInProgress().then(result => setOrderData(result));
  // }, []);

  return (
    <div>
      <h1>Views Page</h1>
      <button className="button" onClick={() => displayRoleDistribution().then(result => setTableData(result)) }>Role Distribution</button>
      <button className="button" onClick={() => displayCustomerCreditCheck().then(result => setTableData(result)) }>Customer Credit Check</button>
      <button className="button" onClick={() => displayDroneTrafficControl().then(result => setTableData(result)) }>Drone Traffic Control</button>
      <button className="button" onClick={() => displayMostPopularProducts().then(result => setTableData(result)) }>Most Popular Products</button>
      <button className="button" onClick={() => displayDronePilotRoster().then(result =>setTableData(result)) }>Drone Pilot Roster</button>
      <button className="button" onClick={() => displayStoreSalesOverview().then(result=>setTableData(result)) }>Store Sales Overview</button>
      <button className="button" onClick={() => displayOrdersInProgress().then(result => setTableData(result)) }>Orders In Progress</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      {tableData && displayTable(tableData)}
    </div>
  );
}

function displayTable (data) {
  console.log(data[0])
  var keys = [];
  for(var key in data[0]) keys.push(key);
  
  return  (<table>
    <thead>
      <tr>
        {(keys.map((header, index) => (
          <th> {header} </th>
        )))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr>
          {keys.map((header, index) => (
            <td> {row[header]} </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>)
}
function fetchData(sql) {
  return fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql }),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function displayRoleDistribution() {
  return fetchData('select * from role_distribution');
}

function displayCustomerCreditCheck() {
  return fetchData('select * from customer_credit_check');
}

function displayDroneTrafficControl() {
  return fetchData('select * from drone_traffic_control');
}

function displayMostPopularProducts() {
  return fetchData('select * from most_popular_products');
}

function displayDronePilotRoster() {
  return fetchData('select * from drone_pilot_roster');
}

function displayStoreSalesOverview() {
  return fetchData('select * from store_sales_overview');
}

function displayOrdersInProgress() {
  return fetchData('select * from orders_in_progress');
}

export default Views;