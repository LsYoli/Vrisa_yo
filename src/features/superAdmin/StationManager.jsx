import React, { useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useStations } from './hooks/useStations';

const initialForm = {
  nombre_estacion: '',
  ubicacion: '',
  latitud: '',
  longitud: '',
  frecuencia_actualizacion: '',
  estado: '',
  tecnico_id: '',
  admin_id: '',
  reporte_id: '',
};

export const StationManager = () => {
  const { stations, loading, error, deleteStation, createStation, updateStation } = useStations();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nombre_estacion) return;
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
      nombre_estacion: station.nombre_estacion || '',
      ubicacion: station.ubicacion || '',
      latitud: station.latitud ?? '',
      longitud: station.longitud ?? '',
      frecuencia_actualizacion: station.frecuencia_actualizacion || '',
      estado: station.estado || '',
      tecnico_id: station.tecnico_id ?? '',
      admin_id: station.admin_id ?? '',
      reporte_id: station.reporte_id ?? '',
    });
    setEditingId(station.estacion_id);
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
            value={form.nombre_estacion}
            onChange={(e) => setForm({ ...form, nombre_estacion: e.target.value })}
            placeholder="Nombre de la estación"
            required
          />
        </label>
        <label className={styles.label}>
          Ubicación
          <input
            className={styles.input}
            value={form.ubicacion}
            onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
            placeholder="Ciudad / zona"
          />
        </label>
        <div className={styles.inlineForm}>
          <label className={styles.label}>
            Latitud
            <input
              className={styles.input}
              value={form.latitud}
              onChange={(e) => setForm({ ...form, latitud: e.target.value })}
              placeholder="Ej. -33.45"
              type="number"
              step="any"
            />
          </label>
          <label className={styles.label}>
            Longitud
            <input
              className={styles.input}
              value={form.longitud}
              onChange={(e) => setForm({ ...form, longitud: e.target.value })}
              placeholder="Ej. -70.66"
              type="number"
              step="any"
            />
          </label>
        </div>
        <div className={styles.inlineForm}>
          <label className={styles.label}>
            Frecuencia de actualización
            <input
              className={styles.input}
              value={form.frecuencia_actualizacion}
              onChange={(e) => setForm({ ...form, frecuencia_actualizacion: e.target.value })}
              placeholder="Ej. cada 5 minutos"
            />
          </label>
          <label className={styles.label}>
            Estado
            <select
              className={styles.input}
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            >
              <option value="">Seleccionar</option>
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </label>
        </div>
        <div className={styles.inlineForm}>
          <label className={styles.label}>
            Técnico ID
            <input
              className={styles.input}
              value={form.tecnico_id}
              onChange={(e) => setForm({ ...form, tecnico_id: e.target.value })}
              placeholder="ID técnico"
            />
          </label>
          <label className={styles.label}>
            Admin ID
            <input
              className={styles.input}
              value={form.admin_id}
              onChange={(e) => setForm({ ...form, admin_id: e.target.value })}
              placeholder="ID admin"
            />
          </label>
          <label className={styles.label}>
            Reporte ID
            <input
              className={styles.input}
              value={form.reporte_id}
              onChange={(e) => setForm({ ...form, reporte_id: e.target.value })}
              placeholder="ID reporte"
            />
          </label>
        </div>
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
              <th>Ubicación</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Frecuencia</th>
              <th>Estado</th>
              <th>Técnico</th>
              <th>Admin</th>
              <th>Reporte</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.estacion_id}>
                <td>{station.estacion_id}</td>
                <td>{station.nombre_estacion}</td>
                <td>{station.ubicacion || '—'}</td>
                <td>{station.latitud ?? '—'}</td>
                <td>{station.longitud ?? '—'}</td>
                <td>{station.frecuencia_actualizacion || '—'}</td>
                <td>{station.estado || '—'}</td>
                <td>{station.tecnico_id ?? '—'}</td>
                <td>{station.admin_id ?? '—'}</td>
                <td>{station.reporte_id ?? '—'}</td>
                <td className={styles.actions}>
                  <button className={styles.buttonSecondary + ' ' + styles.button} onClick={() => handleEdit(station)}>
                    Editar
                  </button>
                  <button
                    className={styles.buttonDanger + ' ' + styles.button}
                    onClick={() => deleteStation(station.estacion_id)}
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
