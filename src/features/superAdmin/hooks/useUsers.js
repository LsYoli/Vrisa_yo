import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [userRes, roleRes, permissionRes, rolePermRes] = await Promise.all([
      supabase
        .from('usuario')
        .select(
          'usuario_id, nombre_usuario, telefono, email, rol_id, institucion_id, rol:rol_id (rol_id, nombre_rol, descripcion_rol)',
        )
        .order('usuario_id', { ascending: true }),
      supabase.from('rol').select('rol_id, nombre_rol, descripcion_rol').order('rol_id', { ascending: true }),
      supabase.from('permiso').select('*').order('permiso_id', { ascending: true }),
      supabase.from('permiso_por_rol').select('*'),
    ]);

    if (userRes.error || roleRes.error || permissionRes.error || rolePermRes.error) {
      setError(
        userRes.error?.message ||
          roleRes.error?.message ||
          permissionRes.error?.message ||
          rolePermRes.error?.message,
      );
    } else {
      setUsers(userRes.data || []);
      setRoles(roleRes.data || []);
      setPermissions(permissionRes.data || []);
      setRolePermissions(rolePermRes.data || []);
    }

    setLoading(false);
  }, []);

  const updateUserRole = async (userId, roleValue) => {
    setLoading(true);
    const { error: updateError } = await supabase.from('usuario').update({ rol_id: roleValue }).eq('usuario_id', userId);
    if (updateError) {
      setError(updateError.message);
    }
    await fetchUsers();
    setLoading(false);
  };

  const togglePermissionForRole = async (roleId, permisoId, active) => {
    setLoading(true);
    if (active) {
      const { error: deleteError } = await supabase
        .from('permiso_por_rol')
        .delete()
        .match({ rol_id: roleId, permiso_id: permisoId });
      if (deleteError) setError(deleteError.message);
    } else {
      const { error: insertError } = await supabase
        .from('permiso_por_rol')
        .insert([{ rol_id: roleId, permiso_id: permisoId }]);
      if (insertError) setError(insertError.message);
    }
    await fetchUsers();
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    roles,
    permissions,
    rolePermissions,
    loading,
    error,
    refresh: fetchUsers,
    updateUserRole,
    togglePermissionForRole,
  };
};
