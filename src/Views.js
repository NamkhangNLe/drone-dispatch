import React from 'react';
import ReactDOM from 'react-dom';

function Views() {
  return (
    <div>
      <h1>Drones Page</h1>
      <button className="button" onClick={() => console.log('Role Distribution')}>Role Distribution</button>
      <button className="button" onClick={() => console.log('Customer Credit Check')}>Customer Credit Check</button>
      <button className="button" onClick={() => console.log('Drone Traffic Control')}>Drone Traffic Control</button>
      <button className="button" onClick={() => console.log('Most Popular Products')}>Most Popular Products</button>
      <button className="button" onClick={() => console.log('Drone Pilot Roster')}>Drone Pilot Roster</button>
      <button className="button" onClick={() => console.log('Store Sales Overview')}>Store Sales Overview</button>
      <button className="button" onClick={() => console.log('Orders In Progress')}>Orders In Progress</button>
    </div>
  );
}

export default Views;