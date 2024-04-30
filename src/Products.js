import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Products() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    getProductInformation().then(result => setProductData(result));
  }, []);

  return (
    <div>
      <h1>Products Page</h1>
      <input type="text" id="barcode" placeholder="Enter Barcode"></input>
      <input type="text" id="name" placeholder="Enter Product Name"></input>
      <input type="text" id="weight" placeholder="Enter Weight"></input>

      <button className="add-button button" onClick={() => addProduct()}>Add Products</button>
      <select className="select-dropdown" onChange={e => setBarcode(e.target.value)}>
        {productData.map((product, index) => (
          <option key={index} value={product.barcode}>{product.barcode}</option>
        ))}
      </select>
      <button className="cancel-button" onClick={() => removeProduct(barcode)}>Remove Products</button>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function getProductInformation() {
  
  return fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({ sql: 'select distinct barcode from products'}),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function removeProduct(barcode) {
  const inputs = [];
  inputs.push(barcode)
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call remove_product(?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function addProduct() {
  // Grab the inputs to store into the database.
  const inputs = [];
  inputs.push(document.getElementById("barcode").value);
  inputs.push(document.getElementById("name").value);
  inputs.push(parseInt(document.getElementById("weight").value));
  
  fetch('http://localhost:5000/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: 'call add_product(?,?,?)',
                           parameters: inputs}),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}



export default Products;