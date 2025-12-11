import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export const useVariables = () => {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVariables = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('variable')
      .select('variable_id, nombre, unidad, descripcion')
      .order('variable_id', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setVariables(data);
    }
    setLoading(false);
  }, []);

  const addVariable = async (payload) => {
    setLoading(true);
    const { error: insertError } = await supabase.from('variable').insert([payload]);
    if (insertError) {
      setError(insertError.message);
    }
    await fetchVariables();
    setLoading(false);
  };

  const updateVariable = async (id, payload) => {
    setLoading(true);
    const { error: updateError } = await supabase.from('variable').update(payload).eq('variable_id', id);
    if (updateError) {
      setError(updateError.message);
    }
    await fetchVariables();
    setLoading(false);
  };

  const deleteVariable = async (id) => {
    const shouldDelete = window.confirm('¿Estás seguro de eliminar esta variable?');
    if (!shouldDelete) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('variable').delete().eq('variable_id', id);
    if (deleteError) {
      setError(deleteError.message);
    }
    await fetchVariables();
    setLoading(false);
  };

  useEffect(() => {
    fetchVariables();
  }, [fetchVariables]);

  return { variables, loading, error, addVariable, updateVariable, deleteVariable, refresh: fetchVariables };
};
