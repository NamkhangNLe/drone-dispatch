import { Routes, Route, Link } from 'react-router-dom';
import Customers from './Customers'; 
import Pilots from './Pilots'; 
import Products from './Products';
import Drones from './Drones';
import Orders from './Orders';
import Views from './Views';
import './App.css';

function App() {
  const buttons = ['Customers', 'Pilots', 'Products', 'Orders', 'Drones', 'Views'];

  return (
    <div className="App">
      <div className="button-column">
        {buttons.slice(0, 3).map((label, index) => (
          <Link to={`/${label.toLowerCase()}`} key={index}>
            <button className="button">
              {label}
            </button>
          </Link>
        ))}
      </div>
      <div className="button-column">
        {buttons.slice(3).map((label, index) => (
          <Link to={`/${label.toLowerCase()}`} key={index}>
            <button className="button">
              {label}
            </button>
          </Link>
        ))}
      </div>
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/pilots" element={<Pilots />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/drones" element={<Drones />} />
        <Route path="/views" element={<Views />} />
      </Routes>
    </div>
  );
}

export default App;