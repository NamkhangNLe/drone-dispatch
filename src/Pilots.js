import React from 'react';

function Pilots() {
  return (
    <div>
      <h1>Pilots Page</h1>
      <button className="button" onClick={() => console.log('Add Drone Pilot')}>Add Drone Pilot</button>
      <button className="cancel-button" onClick={() => console.log('Remove Drone Pilot')}>Remove Drone Pilot</button>
    </div>
  );
}

export default Pilots;