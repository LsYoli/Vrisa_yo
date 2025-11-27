import { useState, useEffect, useCallback } from 'react';
import { getVariables } from '../services/variableService';

/**
 * Hook para gestionar la lógica de obtención de todas las variables disponibles.
 */
export const useVariables = () => {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVariables = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getVariables();
      setVariables(data);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al cargar las variables');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVariables();
  }, [fetchVariables]);

  return {
    variables,
    loading,
    error,
    reloadVariables: fetchVariables,
  };
};
