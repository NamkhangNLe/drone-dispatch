import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Pilots() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Pilots Page</h1>

      <input type="text" id="username" placeholder="Enter Username"></input>
      <input type="text" id="first_name" placeholder="Enter First Name"></input>
      <input type="text" id="last_name" placeholder="Enter Last Name"></input>
      <input type="text" id="address" placeholder="Enter Address"></input>
      <input type="text" id="birthdate" placeholder="YYYY-MM-DD"></input>
      <input type="text" id="taxID" placeholder="Enter Tax ID"></input>
      <input type="text" id="service" placeholder="Enter Service"></input>
      <input type="text" id="salary" placeholder="Enter Salary"></input>
      <input type="text" id="licenseID" placeholder="Enter License ID"></input>
      <input type="text" id="experience" placeholder="Enter Experience"></input>

      <button className="add-button button" onClick={() => addDronePilot()}>Add Drone Pilot</button>
      <button className="cancel-button" onClick={() => removeDronePilot()}>Remove Drone Pilot</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function addDronePilot() {
  // Grab the inputs to store into the database.
  // Grab the inputs to store into the database.
  const inputs = [];
  inputs.push(document.getElementById("username").value);
  inputs.push(document.getElementById("first_name").value);
  inputs.push(document.getElementById("last_name").value);
  inputs.push(document.getElementById("address").value);
  inputs.push(document.getElementById("birthdate").value);
  inputs.push(document.getElementById("taxID").value);
  inputs.push(parseInt(document.getElementById("service").value));
  inputs.push(parseInt(document.getElementById("salary").value));
  inputs.push(parseInt(document.getElementById("licenseID").value));
  inputs.push(parseInt(document.getElementById("experience").value));
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call add_drone_pilot(?,?,?,?,?,?,?,?,?,?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function removeDronePilot() {
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call remove_drone_pilot(?)',
                           parameters: ['cjordan5']}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

export default Pilots;