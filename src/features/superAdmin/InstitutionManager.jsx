import React, { useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useInstitutions } from './hooks/useInstitutions';

const initialForm = {
  nombre: '',
  descripcion: '',
  aprobada: false,
};

export const InstitutionManager = () => {
  const { institutions, loading, error, approveInstitution, deleteInstitution, createInstitution } = useInstitutions();
  const [form, setForm] = useState(initialForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nombre) return;
    await createInstitution(form);
    setForm(initialForm);
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
            Crear institución
          </button>
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
              <tr key={inst.id}>
                <td>{inst.id}</td>
                <td>{inst.nombre}</td>
                <td>{inst.descripcion}</td>
                <td>
                  <span
                    className={`${styles.tag} ${inst.aprobada ? styles.statusApproved : styles.statusPending}`}
                  >
                    {inst.aprobada ? 'Aprobada' : 'Pendiente'}
                  </span>
                </td>
                <td className={styles.actions}>
                  {!inst.aprobada && (
                    <button className={styles.button} onClick={() => approveInstitution(inst.id)}>
                      Aprobar
                    </button>
                  )}
                  <button className={styles.buttonDanger + ' ' + styles.button} onClick={() => deleteInstitution(inst.id)}>
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
