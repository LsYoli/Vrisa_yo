import React, { useMemo, useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useUsers } from './hooks/useUsers';

export const UserManager = () => {
  const { users, roles, permissions, rolePermissions, loading, error, updateUserRole, togglePermissionForRole } =
    useUsers();
  const [selectedRole, setSelectedRole] = useState(null);

  const getRoleId = (role) => role?.rol_id ?? role?.id;
  const getPermissionId = (perm) => perm?.permiso_id ?? perm?.id;
  const parseRoleValue = (value) => {
    if (value === '' || value === null || value === undefined) return null;
    const numeric = Number(value);
    return Number.isNaN(numeric) ? value : numeric;
  };

  const permissionsByRole = useMemo(() => {
    const grouped = {};
    rolePermissions.forEach((rp) => {
      if (!grouped[rp.rol_id]) grouped[rp.rol_id] = new Set();
      grouped[rp.rol_id].add(rp.permiso_id);
    });
    return grouped;
  }, [rolePermissions]);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Usuarios & Permisos</div>
          <div className={styles.muted}>Editar roles y permisos aplicados</div>
        </div>
        <div className={styles.badge}>Seguridad</div>
      </div>

      {loading && <div className={styles.loader}>Cargando...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.usuario_id}>
                <td>{user.usuario_id}</td>
                <td>{user.nombre_usuario || '—'}</td>
                <td>{user.email || '—'}</td>
                <td>{user.telefono || '—'}</td>
                <td>
                  <div className={styles.inlineForm}>
                    <select
                      className={styles.input}
                      value={user.rol_id ?? ''}
                      onChange={(e) => updateUserRole(user.usuario_id, parseRoleValue(e.target.value))}
                    >
                      <option value="">Sin rol</option>
                      {roles.map((role) => {
                        const roleId = getRoleId(role);
                        return (
                          <option key={roleId} value={roleId}>
                            {role.nombre_rol || roleId}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </td>
                <td>
                  <button
                    className={styles.buttonSecondary + ' ' + styles.button}
                    onClick={() => setSelectedRole(parseRoleValue(user.rol_id))}
                  >
                    Ver permisos del rol
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRole && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Permisos del rol</div>
              <div className={styles.muted}>Activa o desactiva permisos para el rol seleccionado</div>
            </div>
            <div className={styles.badge}>Permisos</div>
          </div>
          <div className={styles.chipGroup}>
            {permissions.map((perm) => {
              const permId = getPermissionId(perm);
              const active = permissionsByRole[selectedRole]?.has(permId);
              return (
                <button
                  key={permId}
                  type="button"
                  className={`${styles.button} ${active ? '' : styles.buttonSecondary}`}
                  onClick={() => togglePermissionForRole(selectedRole, permId, active)}
                >
                  {active ? '✅' : '➕'} {perm.nombre_permiso || perm.nombre || permId}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
