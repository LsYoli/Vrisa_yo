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
      .select('*')
      .order('id', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setInstitutions(data);
    }
    setLoading(false);
  }, []);

  const approveInstitution = async (id) => {
    setLoading(true);
    const { error: updateError } = await supabase.from('institucion').update({ aprobada: true }).eq('id', id);
    if (updateError) {
      setError(updateError.message);
    }
    await fetchInstitutions();
    setLoading(false);
  };

  const deleteInstitution = async (id) => {
    const shouldDelete = window.confirm('¿Eliminar definitivamente la institución?');
    if (!shouldDelete) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('institucion').delete().eq('id', id);
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

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  return {
    institutions,
    loading,
    error,
    approveInstitution,
    deleteInstitution,
    createInstitution,
    refresh: fetchInstitutions,
  };
};
