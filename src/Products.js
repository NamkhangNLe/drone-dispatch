import React from 'react';

function Products() {
  return (
    <div>
      <h1>Products Page</h1>
      <button className="add-button button" onClick={() => console.log('Add Products')}>Add Products</button>
      <button className="cancel-button" onClick={() => console.log('Remove Products')}>Remove Products</button>
    </div>
  );
}

export default Products;