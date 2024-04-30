import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Drones() {
  const navigate = useNavigate();
  const [droneData, setDroneData] = useState([]);
  const [storeID, setStoreID] = useState('');
  
  useEffect(() => {
    getDroneInformation().then(result => setDroneData(result));
  }, []);
  
  return (
    <div>
      <h1>Drones Page</h1>
      <select className="select-dropdown" onChange={e => setStoreID(e.target.value)}>
        {droneData.map((drone, index) => (
          <option key={index} value={drone.storeID}>{drone.storeID}</option>
        ))}
      </select>

      <input type="text" id="capacity" placeholder="Enter Capacity"></input>
      <input type="text" id="pilot" placeholder="Enter Pilot Username"></input>
      <input type="text" id="droneTag" placeholder="Enter Drone Tag"></input>
      <input type="text" id="remainingTrips" placeholder="Enter Remaining Trips"></input>
      <button className="add-button button" onClick={() => addDrone(storeID, parseInt(document.getElementById("capacity").value), document.getElementById("pilot").value, parseInt(document.getElementById("droneTag").value), parseInt(document.getElementById("remainingTrips").value))}>Add Drones</button>
      <button className="button" onClick={() => swapDroneControl()}>Swap Drone Control</button>
      <button className="button" onClick={() => repairRefuelDrone()}>Repair Refuel Drone</button>
      <button className="cancel-button" onClick={() => removeDrone()}>Remove Drones</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function getDroneInformation() {
  
  return fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({ sql: 'select distinct storeID from stores'}),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function addDrone(storeID, cap, pilot, tag, rem) {
  const inputs = [];
  inputs.push(storeID);
  inputs.push(tag);
  inputs.push(cap);
  inputs.push(rem);
  inputs.push(pilot);
  // inputs.push(parseInt(document.getElementById("capacity").value));
  // inputs.push(document.getElementById("pilot").value);
  // inputs.push(parseInt(document.getElementById("droneTag").value));
  // inputs.push(parseInt(document.getElementById("remaining_trips").value));
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call add_drone(?,?,?,?,?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function swapDroneControl() {
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call remove_swap_drone_control(?,?)',
                           parameters: ['cjordan5','123']}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function repairRefuelDrone() {
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call repair_refuel_drone(?,?)',
                           parameters: ['cjordan5','123']}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function removeDrone() {
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call remove_drone(?,?)',
                           parameters: ['cjordan5','123']}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

export default Drones;