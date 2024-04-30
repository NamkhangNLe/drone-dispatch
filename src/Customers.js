import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Customers() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [uname, setUname] = useState('');
 // <button className="max" onClick={() => test()}>max</button>
  
 useEffect(() => {
    getCustomerInformation().then(result => setCustomerData(result));
  }, []);

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
      <select className="select-dropdown" onChange={e => setUname(e.target.value)}>
        {customerData.map((customer, index) => (
          <option key={index} value={customer.uname}>{customer.uname}</option>
        ))}
      </select>
      <button className="cancel-button" onClick={() => removeCustomer(uname)}>Remove Customer</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function getCustomerInformation() {
  
  return fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({ sql: 'select distinct uname from customers'}),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function removeCustomer(uname) {
  const inputs = [];
  inputs.push(uname);
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call remove_customer(?)',
                           parameters: inputs}),
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