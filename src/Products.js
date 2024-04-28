import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Products() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Products Page</h1>
      <button className="add-button button" onClick={() => console.log('Add Products')}>Add Products</button>
      <button className="cancel-button" onClick={() => console.log('Remove Products')}>Remove Products</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default Products;