import { useState, useEffect, useCallback } from 'react';
import { getStations } from '../services/stationService';

/**
 * Hook para gestionar la lógica de obtención y estado de las estaciones.
 */
export const useStations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStations();
      setStations(data);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al cargar las estaciones');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return {
    stations,
    loading,
    error,
    reloadStations: fetchStations, // Función para recargar los datos
  };
};
