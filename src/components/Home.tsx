import React, { useEffect, useMemo, useState } from 'react'
import './Home.css'

import { fetchFuelPrices } from '../apis/fuelApi';

const FUEL_TYPES = [
  { key: 'Precio Gasoleo A', label: 'Gasóleo A' },
  { key: 'Precio Gasolina 95 E5', label: 'Gasolina 95 E5' },
  // Agrega más tipos si lo deseas
];

const AUTONOMOUS_REGIONS = [
  // Lista de comunidades autónomas de España
  'Andalucía', 'Aragón', 'Asturias', 'Baleares', 'Canarias', 'Cantabria', 'Castilla y León',
  'Castilla-La Mancha', 'Cataluña', 'Comunidad Valenciana', 'Extremadura', 'Galicia',
  'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'La Rioja', 'Ceuta', 'Melilla'
];

function getAverage(prices: string[]) {
  const nums = prices
    .map(p => parseFloat(p.replace(',', '.')))
    .filter(n => !isNaN(n));
  if (nums.length === 0) return null;
  return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(3);
}


const Home = () => {
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFuelPrices()
      .then(data => {
        setStations(data.ListaEESSPrecio);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Nacional: medias por tipo de combustible
  const nationalSummary = useMemo(() => {
    return FUEL_TYPES.map(fuel => {
      const prices = stations.map(s => s[fuel.key]);
      const avg = getAverage(prices);
      return { ...fuel, avg };
    }).sort((a, b) => (b.avg && a.avg ? parseFloat(b.avg) - parseFloat(a.avg) : 0));
  }, [stations]);

  // Por comunidad autónoma
  const regionSummary = useMemo(() => {
    return AUTONOMOUS_REGIONS.map(region => {
      const regionStations = stations.filter(s => s['CCAA'] === region);
      const fuelPrices = FUEL_TYPES.map(fuel => {
        const prices = regionStations.map(s => s[fuel.key]);
        const avg = getAverage(prices);
        return { ...fuel, avg };
      }).sort((a, b) => (b.avg && a.avg ? parseFloat(b.avg) - parseFloat(a.avg) : 0));
      return { region, fuelPrices };
    });
  }, [stations]);

  if (loading) return <div className="home-container">Cargando resumen de precios...</div>;

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div id="info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>

      <h2>Resumen nacional de precios</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo de combustible</th>
            <th>Precio medio (€)</th>
          </tr>
        </thead>
        <tbody>
          {nationalSummary.map(fuel => (
            <tr key={fuel.key}>
              <td>{fuel.label}</td>
              <td>{fuel.avg ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Resumen por comunidad autónoma</h2>
      <table>
        <thead>
          <tr>
            <th>Comunidad Autónoma</th>
            {FUEL_TYPES.map(fuel => (
              <th key={fuel.key}>{fuel.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {regionSummary.map(region => (
            <tr key={region.region}>
              <td>{region.region}</td>
              {region.fuelPrices.map(fuel => (
                <td key={fuel.key}>{fuel.avg ?? 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>


    </div>

  )
}

export default Home 