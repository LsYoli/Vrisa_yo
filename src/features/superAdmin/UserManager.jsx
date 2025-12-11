import React, { useMemo, useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useUsers } from './hooks/useUsers';

export const UserManager = () => {
  const { users, roles, permissions, rolePermissions, loading, error, updateUserRole, togglePermissionForRole } =
    useUsers();
  const [selectedRole, setSelectedRole] = useState(null);

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
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email || user.nombre}</td>
                <td>
                  <div className={styles.inlineForm}>
                    <select
                      className={styles.input}
                      value={user.rol_id || ''}
                      onChange={(e) => updateUserRole(user.id, Number(e.target.value))}
                    >
                      <option value="">Sin rol</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td>
                  <button className={styles.buttonSecondary + ' ' + styles.button} onClick={() => setSelectedRole(user.rol_id)}>
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
              const active = permissionsByRole[selectedRole]?.has(perm.id);
              return (
                <button
                  key={perm.id}
                  type="button"
                  className={`${styles.button} ${active ? '' : styles.buttonSecondary}`}
                  onClick={() => togglePermissionForRole(selectedRole, perm.id, active)}
                >
                  {active ? '✅' : '➕'} {perm.nombre}
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
