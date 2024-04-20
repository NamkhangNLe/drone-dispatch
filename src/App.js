import React from 'react';
import './App.css';

function App() {
  const buttons = ['Customers', 'Pilots', 'Products', 'Orders', 'Drones', 'Views'];

  return (
    <div className="App">
      <div className="button-column">
        {buttons.slice(0, 3).map((label, index) => (
          <button key={index} className="button">
            {label}
          </button>
        ))}
      </div>
      <div className="button-column">
        {buttons.slice(3).map((label, index) => (
          <button key={index} className="button">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;