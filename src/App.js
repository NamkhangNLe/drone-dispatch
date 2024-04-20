import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Customers from './Customers'; 
import Pilots from './Pilots'; // Import the Pilots component
import Products from './Products';
import Drones from './Drones';
import Orders from './Orders';
import './App.css';

function App() {
  const buttons = ['Customers', 'Pilots', 'Products', 'Orders', 'Drones', 'Views'];

  return (
    <Router>
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
          <Route path="/pilots" element={<Pilots />} /> {/* Add the route for Pilots */}
          <Route path="/products" element={<Products />} />
          <Route path="/drones" element={<Drones />} />
          <Route path="/orders" element={<Orders />} />
          {/* Add more routes for other pages as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;