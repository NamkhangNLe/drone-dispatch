import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Drones() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Drones Page</h1>
      <button className="add-button button" onClick={() => console.log('Add Drones')}>Add Drones</button>
      <button className="button" onClick={() => console.log('Swap Drone Control')}>Swap Drone Control</button>
      <button className="button" onClick={() => console.log('Repair Refuel Drone')}>Repair Refuel Drone</button>
      <button className="cancel-button" onClick={() => console.log('Remove Drones')}>Remove Drones</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function removeDrone() {
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call remove_drone(?)',
                           parameters: ['cjordan5']}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

export default Drones;