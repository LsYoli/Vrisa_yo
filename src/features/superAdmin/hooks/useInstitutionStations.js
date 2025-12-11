import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export const useInstitutionStations = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstitutionStations = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('estacion_has_institucion')
      .select('id, institucion:institucion_id(id, nombre), estacion:estacion_id(id, nombre)')
      .order('id', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setRows(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInstitutionStations();
  }, [fetchInstitutionStations]);

  return { rows, loading, error, refresh: fetchInstitutionStations };
};
