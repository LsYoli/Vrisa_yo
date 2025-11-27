import { useState, useEffect, useCallback } from 'react';
import { getSensorsByStation } from '../services/sensorService';

/**
 * Hook para gestionar la lógica de obtención de sensores para una estación específica.
 * @param {number | null} stationId - El ID de la estación para la que se cargarán los sensores.
 */
export const useSensors = (stationId) => {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSensors = useCallback(async () => {
    if (!stationId) {
      setSensors([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getSensorsByStation(stationId);
      setSensors(data);
    } catch (err) {
      setError(err.message || `Ocurrió un error al cargar los sensores de la estación ${stationId}`);
    } finally {
      setLoading(false);
    }
  }, [stationId]);

  useEffect(() => {
    fetchSensors();
  }, [fetchSensors]);

  return {
    sensors,
    loading,
    error,
    reloadSensors: fetchSensors, // Función para recargar
  };
};
