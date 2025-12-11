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
      .select(
        'estacion_estacion_id, institucion_institucion_id, estacion:estacion_estacion_id(estacion_id, nombre_estacion), institucion:institucion_institucion_id(institucion_id, nombre_institucion)'
      )
      .order('estacion_estacion_id', { ascending: true })
      .order('institucion_institucion_id', { ascending: true });

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
