import React, { useState } from 'react';
import Sidebar from './Sidebar';
import styles from './SuperAdminDashboard.module.css';
import VariableManager from './VariableManager';
import InstitutionManager from './InstitutionManager';
import StationManager from './StationManager';
import InstitutionStationList from './InstitutionStationList';
import UserManager from './UserManager';

const sections = {
  variables: <VariableManager />,
  institutions: <InstitutionManager />,
  stations: <StationManager />,
  relations: <InstitutionStationList />,
  users: <UserManager />,
};

export const SuperAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('variables');

  return (
    <div className={styles.layout}>
      <Sidebar active={activeSection} onSelect={setActiveSection} />
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>Panel Super Admin</div>
          <div className={styles.badge}>Supabase Live</div>
        </div>

        <div className={styles.sectionGrid}>{sections[activeSection]}</div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
