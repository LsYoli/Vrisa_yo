import React, { useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useStations } from './hooks/useStations';

const initialForm = {
  nombre: '',
  descripcion: '',
  estado: 'pendiente',
};

export const StationManager = () => {
  const { stations, loading, error, approveStation, deleteStation, createStation, updateStation } = useStations();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nombre) return;
    if (editingId) {
      await updateStation(editingId, form);
    } else {
      await createStation(form);
    }
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (station) => {
    setForm({
      nombre: station.nombre || '',
      descripcion: station.descripcion || '',
      estado: station.estado || 'pendiente',
    });
    setEditingId(station.id_estacion);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Estaciones</div>
          <div className={styles.muted}>Aprobar, eliminar o registrar estaciones</div>
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
            placeholder="Nombre de la estación"
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
            {editingId ? 'Actualizar estación' : 'Crear estación'}
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
            {stations.map((station) => (
              <tr key={station.id_estacion}>
                <td>{station.id_estacion}</td>
                <td>{station.nombre}</td>
                <td>{station.descripcion}</td>
                <td>
                  <span className={`${styles.tag} ${station.estado === 'aprobada' ? styles.statusApproved : styles.statusPending}`}>
                    {station.estado === 'aprobada' ? 'Aprobada' : station.estado || 'Pendiente'}
                  </span>
                </td>
                <td className={styles.actions}>
                  {station.estado !== 'aprobada' && (
                    <button className={styles.button} onClick={() => approveStation(station.id_estacion)}>
                      Aprobar
                    </button>
                  )}
                  <button className={styles.buttonSecondary + ' ' + styles.button} onClick={() => handleEdit(station)}>
                    Editar
                  </button>
                  <button
                    className={styles.buttonDanger + ' ' + styles.button}
                    onClick={() => deleteStation(station.id_estacion)}
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

export default StationManager;
