import React from 'react';
import './App.css';

function App() {
  const buttons = ['Customers', 'Pilots', 'Products', 'Orders', 'Drones', 'Views'];

  return (
    <div className="App">
      <div className="button-columns">
        {buttons.map((label, index) => (
          <button key={index} className={`button ${index % 2 === 0 ? 'column-1' : 'column-2'}`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;