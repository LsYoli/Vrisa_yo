import React, { useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useInstitutions } from './hooks/useInstitutions';

const initialForm = {
  nombre: '',
  descripcion: '',
  estado: 'pendiente',
};

export const InstitutionManager = () => {
  const { institutions, loading, error, approveInstitution, deleteInstitution, createInstitution, updateInstitution } =
    useInstitutions();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nombre) return;
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
      nombre: institution.nombre || '',
      descripcion: institution.descripcion || '',
      estado: institution.estado || 'pendiente',
    });
    setEditingId(institution.id_institucion);
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
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Nombre de la institución"
            required
          />
        </label>
        <label className={styles.label}>
          Descripción
          <input
            className={styles.input}
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripción"
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
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((inst) => (
              <tr key={inst.id_institucion}>
                <td>{inst.id_institucion}</td>
                <td>{inst.nombre}</td>
                <td>{inst.descripcion}</td>
                <td>
                  <span className={`${styles.tag} ${inst.estado === 'aprobada' ? styles.statusApproved : styles.statusPending}`}>
                    {inst.estado === 'aprobada' ? 'Aprobada' : inst.estado || 'Pendiente'}
                  </span>
                </td>
                <td className={styles.actions}>
                  {inst.estado !== 'aprobada' && (
                    <button className={styles.button} onClick={() => approveInstitution(inst.id_institucion)}>
                      Aprobar
                    </button>
                  )}
                  <button className={styles.buttonSecondary + ' ' + styles.button} onClick={() => handleEdit(inst)}>
                    Editar
                  </button>
                  <button
                    className={styles.buttonDanger + ' ' + styles.button}
                    onClick={() => deleteInstitution(inst.id_institucion)}
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
