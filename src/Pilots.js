import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Pilots() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Pilots Page</h1>
      <button className="add-button button" onClick={() => console.log('Add Drone Pilot')}>Add Drone Pilot</button>
      <button className="cancel-button" onClick={() => console.log('Remove Drone Pilot')}>Remove Drone Pilot</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default Pilots;