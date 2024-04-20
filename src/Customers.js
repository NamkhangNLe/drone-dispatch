import React from 'react';

function Customers() {
  return (
    <div>
      <h1>Customers Page</h1>
      <button className="button" onClick={() => console.log('Add Customer')}>Add Customer</button>
      <button className="cancel-button" onClick={() => console.log('Remove Customer')}>Remove Customer</button>
    </div>
  );
}

export default Customers;