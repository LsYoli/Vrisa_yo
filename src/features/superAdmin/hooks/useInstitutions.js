import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export const useInstitutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstitutions = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('institucion')
      .select('institucion_id, nombre_institucion, logo, direccion')
      .order('institucion_id', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setInstitutions(data);
    }
    setLoading(false);
  }, []);

  const deleteInstitution = async (id) => {
    const shouldDelete = window.confirm('¿Eliminar definitivamente la institución?');
    if (!shouldDelete) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('institucion').delete().eq('institucion_id', id);
    if (deleteError) {
      setError(deleteError.message);
    }
    await fetchInstitutions();
    setLoading(false);
  };

  const createInstitution = async (payload) => {
    setLoading(true);
    const { error: insertError } = await supabase.from('institucion').insert([payload]);
    if (insertError) {
      setError(insertError.message);
    }
    await fetchInstitutions();
    setLoading(false);
  };

  const updateInstitution = async (id, payload) => {
    setLoading(true);
    const { error: updateError } = await supabase
      .from('institucion')
      .update(payload)
      .eq('institucion_id', id);
    if (updateError) setError(updateError.message);
    await fetchInstitutions();
    setLoading(false);
  };

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  return {
    institutions,
    loading,
    error,
    deleteInstitution,
    createInstitution,
    updateInstitution,
    refresh: fetchInstitutions,
  };
};
