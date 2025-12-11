import React, { useMemo, useState } from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useVariables } from './hooks/useVariables';

const initialForm = {
  nombre: '',
  descripcion: '',
  unidad: '',
  valor_referencia: '',
  activa: true,
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
      descripcion: variable.descripcion || '',
      unidad: variable.unidad || '',
      valor_referencia: variable.valor_referencia || '',
      activa: variable.activa ?? true,
    });
    setEditingId(variable.id_variable);
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
        <div className={styles.inlineForm}>
          <label className={styles.label}>
            Unidad
            <input
              className={styles.input}
              value={form.unidad}
              onChange={(e) => setForm({ ...form, unidad: e.target.value })}
              placeholder="Ej. °C, m/s"
            />
          </label>
          <label className={styles.label}>
            Valor referencia
            <input
              className={styles.input}
              value={form.valor_referencia}
              onChange={(e) => setForm({ ...form, valor_referencia: e.target.value })}
              placeholder="Ej. 100"
            />
          </label>
          <label className={styles.label}>
            Activa
            <select
              className={styles.input}
              value={form.activa ? 'true' : 'false'}
              onChange={(e) => setForm({ ...form, activa: e.target.value === 'true' })}
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </label>
        </div>
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
              <th>Valor ref.</th>
              <th>Activa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedVariables.map((variable) => (
              <tr key={variable.id_variable}>
                <td>{variable.id_variable}</td>
                <td>{variable.nombre}</td>
                <td>{variable.descripcion}</td>
                <td>{variable.unidad}</td>
                <td>{variable.valor_referencia}</td>
                <td>
                  <span className={`${styles.tag} ${variable.activa ? styles.statusApproved : styles.statusPending}`}>
                    {variable.activa ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button className={styles.buttonSecondary + ' ' + styles.button} onClick={() => handleEdit(variable)}>
                    Editar
                  </button>
                  <button
                    className={styles.buttonDanger + ' ' + styles.button}
                    onClick={() => deleteVariable(variable.id_variable)}
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
