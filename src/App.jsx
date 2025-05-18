import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFuelPrices } from './apis/fuelApi';

import Header from './components/Header';
import FuelMap from './components/FuelMap';
import About from './components/About';
import Home from './components/Home';
import StationDetail from './components/StationDetail';
import FuelTable from './components/FuelTable';
import Register from './components/Register';
import Login from './components/Login';


function App() {

  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchFuelPrices().then(data => setStations(data.ListaEESSPrecio));
  }, []);

  const [user, setUser] = useState(null);
  console.log(user);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mapa" element={<FuelMap stations={stations} />} />
        <Route path="/lista" element={<FuelTable />} />
        <Route path="/station/:id" element={<StationDetail stations={stations} user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App