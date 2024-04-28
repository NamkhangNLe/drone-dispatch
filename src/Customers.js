import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Customers() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Customers Page</h1>
      <button className="add-button button" onClick={() => console.log('Add Customer')}>Add Customer</button>
      <button className="cancel-button" onClick={() => console.log('Remove Customer')}>Remove Customer</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default Customers;