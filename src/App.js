import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Customers from './Customers'; 
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
          {/* Add more routes for other pages as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;