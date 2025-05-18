export interface GasStationData {
  'Rótulo': string;
  'Dirección': string;
  'Provincia': string;
  'Municipio': string;
  'Precio Gasoleo A': string;
  'Precio Gasolina 95 E5': string;
  'IDEESS': string;
  'Latitud': string;
  'Longitud': string; 
  // Agrega más campos según lo que necesites mostrar
}

export interface GasStationResponse {
  'Gasolineras': GasStationData[];
}