/**
 * Permite obtener precios actualizados de la sede dl ministerio
 * @returns precios actualizados cada media hora
 */
export async function fetchFuelPrices() {
  const response = await fetch(
    'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
  );
  if (!response.ok) throw new Error('Error al descargar los precios');
  return response.json();
}