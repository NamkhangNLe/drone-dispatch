import React from 'react';

function Orders() {
  return (
    <div>
      <h1>Orders Page</h1>
      <button className="add-button button" onClick={() => console.log('Begin Order')}>Begin Order</button>
      <button className="button" onClick={() => console.log('Add Order Line')}>Add Order Line</button>
      <button className="button" onClick={() => console.log('Deliver Order')}>Deliver Order</button>
      <button className="cancel-button" onClick={() => console.log('Cancel Order')}>Cancel Order</button>
    </div>
  );
}

export default Orders;