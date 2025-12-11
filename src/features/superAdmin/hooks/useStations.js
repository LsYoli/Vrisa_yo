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
      .select('*')
      .order('id', { ascending: true });
    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setStations(data);
    }
    setLoading(false);
  }, []);

  const approveStation = async (id) => {
    setLoading(true);
    const { error: updateError } = await supabase.from('estacion').update({ aprobada: true }).eq('id', id);
    if (updateError) {
      setError(updateError.message);
    }
    await fetchStations();
    setLoading(false);
  };

  const deleteStation = async (id) => {
    const shouldDelete = window.confirm('¿Eliminar definitivamente la estación?');
    if (!shouldDelete) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('estacion').delete().eq('id', id);
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

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return {
    stations,
    loading,
    error,
    approveStation,
    deleteStation,
    createStation,
    refresh: fetchStations,
  };
};
