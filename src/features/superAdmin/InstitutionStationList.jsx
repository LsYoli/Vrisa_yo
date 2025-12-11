import React from 'react';
import styles from './SuperAdminDashboard.module.css';
import { useInstitutionStations } from './hooks/useInstitutionStations';

export const InstitutionStationList = () => {
  const { rows, loading, error } = useInstitutionStations();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Instituciones + Estaciones</div>
          <div className={styles.muted}>Relaciones activas (estacion_has_institucion)</div>
        </div>
        <div className={styles.badge}>Relaciones</div>
      </div>

      {loading && <div className={styles.loader}>Cargando...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Estación ID</th>
              <th>Institución ID</th>
              <th>Institución</th>
              <th>Estación</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.estacion_estacion_id || 'est'}-${row.institucion_institucion_id || 'inst'}`}
              >
                <td>{row.estacion_estacion_id}</td>
                <td>{row.institucion_institucion_id}</td>
                <td>{row.institucion?.nombre_institucion || 'N/D'}</td>
                <td>{row.estacion?.nombre_estacion || 'N/D'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstitutionStationList;
