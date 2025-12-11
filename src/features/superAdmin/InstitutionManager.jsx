import React, { useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useInstitutions } from './hooks/useInstitutions';

const initialForm = {
  nombre_institucion: '',
  logo: '',
  direccion: '',
};

export const InstitutionManager = () => {
  const { institutions, loading, error, deleteInstitution, createInstitution, updateInstitution } = useInstitutions();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nombre_institucion) return;
    if (editingId) {
      await updateInstitution(editingId, form);
    } else {
      await createInstitution(form);
    }
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (institution) => {
    setForm({
      nombre_institucion: institution.nombre_institucion || '',
      logo: institution.logo || '',
      direccion: institution.direccion || '',
    });
    setEditingId(institution.institucion_id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Instituciones</div>
          <div className={styles.muted}>Aprobación y alta de instituciones</div>
        </div>
        <div className={styles.badge}>Aprobaciones</div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre
          <input
            className={styles.input}
            value={form.nombre_institucion}
            onChange={(e) => setForm({ ...form, nombre_institucion: e.target.value })}
            placeholder="Nombre de la institución"
            required
          />
        </label>
        <label className={styles.label}>
          Logo (URL)
          <input className={styles.input} value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
        </label>
        <label className={styles.label}>
          Dirección
          <input
            className={styles.input}
            value={form.direccion}
            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
            placeholder="Dirección"
          />
        </label>
        <div className={styles.actions}>
          <button className={styles.button} type="submit">
            {editingId ? 'Actualizar institución' : 'Crear institución'}
          </button>
          {editingId && (
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      {loading && <div className={styles.loader}>Cargando...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Logo</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((inst) => (
              <tr key={inst.institucion_id}>
                <td>{inst.institucion_id}</td>
                <td>{inst.nombre_institucion}</td>
                <td>{inst.logo || '—'}</td>
                <td>{inst.direccion || '—'}</td>
                <td className={styles.actions}>
                  <button className={styles.buttonSecondary + ' ' + styles.button} onClick={() => handleEdit(inst)}>
                    Editar
                  </button>
                  <button
                    className={styles.buttonDanger + ' ' + styles.button}
                    onClick={() => deleteInstitution(inst.institucion_id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstitutionManager;
