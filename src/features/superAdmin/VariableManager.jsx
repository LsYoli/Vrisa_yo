import React, { useMemo, useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useVariables } from './hooks/useVariables';

const initialForm = {
  nombre: '',
  unidad: '',
  descripcion: '',
};

export const VariableManager = () => {
  const { variables, loading, error, addVariable, updateVariable, deleteVariable } = useVariables();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const sortedVariables = useMemo(
    () => [...variables].sort((a, b) => (a.nombre || '').localeCompare(b.nombre || '')),
    [variables],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nombre) return;

    if (editingId) {
      await updateVariable(editingId, form);
    } else {
      await addVariable(form);
    }
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (variable) => {
    setForm({
      nombre: variable.nombre || '',
      unidad: variable.unidad || '',
      descripcion: variable.descripcion || '',
    });
    setEditingId(variable.variable_id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Variables</div>
          <div className={styles.muted}>Gestión completa de variables y metadatos</div>
        </div>
        <div className={styles.badge}>CRUD</div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre
          <input
            className={styles.input}
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Nombre de la variable"
            required
          />
        </label>
        <label className={styles.label}>
          Descripción
          <input
            className={styles.input}
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Breve descripción"
          />
        </label>
        <label className={styles.label}>
          Unidad
          <input
            className={styles.input}
            value={form.unidad}
            onChange={(e) => setForm({ ...form, unidad: e.target.value })}
            placeholder="Ej. °C, m/s"
          />
        </label>
        <div className={styles.actions}>
          <button className={styles.button} type="submit">
            {editingId ? 'Actualizar variable' : 'Crear variable'}
          </button>
          {editingId && (
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              type="button"
              onClick={() => {
                setForm(initialForm);
                setEditingId(null);
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
              <th>Unidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedVariables.map((variable) => (
              <tr key={variable.variable_id}>
                <td>{variable.variable_id}</td>
                <td>{variable.nombre}</td>
                <td>{variable.descripcion}</td>
                <td>{variable.unidad}</td>
                <td className={styles.actions}>
                  <button className={styles.buttonSecondary + ' ' + styles.button} onClick={() => handleEdit(variable)}>
                    Editar
                  </button>
                  <button
                    className={styles.buttonDanger + ' ' + styles.button}
                    onClick={() => deleteVariable(variable.variable_id)}
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

export default VariableManager;
