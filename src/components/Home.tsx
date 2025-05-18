import React, { useMemo } from 'react'
import './Home.css'
import { COMUNIDADES_AUTONOMAS } from '../apis/fuelApi'


const FUEL_TYPES = [
  { key: 'Precio Gasoleo A', label: 'Gasóleo A' },
  { key: 'Precio Gasolina 95 E5', label: 'Gasolina 95 E5' },
];

/**
 * Calcula el valor medio de un vector de valores formateados como string
 */
function getAverage(values: string[]) {
  const nums = values
    .map(p => parseFloat(p.replace(',', '.')))  // convertir a número
    .filter(n => !isNaN(n));                    // Eliminar inválidos
  if (nums.length === 0) return null;
  return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(3);
}


const Home = ({ stations }) => {

  console.log(stations);

  // Nacional: medias por tipo de combustible
  const nationalSummary = useMemo(() => {
    return FUEL_TYPES.map(fuel => {
      const prices = stations.map(s => s[fuel.key]);
      const avg = getAverage(prices);
      return { ...fuel, avg };
    }).sort((a, b) => (b.avg && a.avg ? parseFloat(b.avg) - parseFloat(a.avg) : 0));
  }, [stations]);
  console.log(nationalSummary);

  // Por comunidad autónoma
  const regionSummary = useMemo(() => {
    return COMUNIDADES_AUTONOMAS.map(region => {
      let regionName = region.name;
      const regionStations = stations.filter(s => s['IDCCAA'] === region.id);
      const fuelPrices = FUEL_TYPES.map(fuel => {
        const prices = regionStations.map(s => s[fuel.key]);
        const avg = getAverage(prices);
        return { ...fuel, avg };
      });
      return { regionName, fuelPrices };
    });
  }, [stations]);


  console.log(regionSummary)

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
            <tr key={region.regionName}>
              <td>{region.regionName}</td>
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