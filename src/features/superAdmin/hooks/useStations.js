import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export const useStations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStations = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('estacion')
      .select(
        'estacion_id, nombre_estacion, latitud, longitud, ubicacion, frecuencia_actualizacion, estado, tecnico_id, admin_id, reporte_id',
      )
      .order('estacion_id', { ascending: true });
    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setStations(data);
    }
    setLoading(false);
  }, []);

  const deleteStation = async (id) => {
    const shouldDelete = window.confirm('¿Eliminar definitivamente la estación?');
    if (!shouldDelete) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('estacion').delete().eq('estacion_id', id);
    if (deleteError) {
      setError(deleteError.message);
    }
    await fetchStations();
    setLoading(false);
  };

  const createStation = async (payload) => {
    setLoading(true);
    const { error: insertError } = await supabase.from('estacion').insert([payload]);
    if (insertError) {
      setError(insertError.message);
    }
    await fetchStations();
    setLoading(false);
  };

  const updateStation = async (id, payload) => {
    setLoading(true);
    const { error: updateError } = await supabase
      .from('estacion')
      .update(payload)
      .eq('estacion_id', id);
    if (updateError) setError(updateError.message);
    await fetchStations();
    setLoading(false);
  };

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return {
    stations,
    loading,
    error,
    deleteStation,
    createStation,
    updateStation,
    refresh: fetchStations,
  };
};
