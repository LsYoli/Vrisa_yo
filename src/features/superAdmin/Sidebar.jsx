import React from 'react';
import styles from './Sidebar.module.css';

const navItems = [
  { key: 'variables', label: 'Variables', icon: '📈' },
  { key: 'institutions', label: 'Instituciones', icon: '🏛️' },
  { key: 'stations', label: 'Estaciones', icon: '📡' },
  { key: 'relations', label: 'Relaciones', icon: '🔗' },
  { key: 'users', label: 'Usuarios', icon: '👥' },
];

export const Sidebar = ({ active, onSelect }) => (
  <aside className={styles.sidebar}>
    <div className={styles.logo}>Super Admin</div>
    <div className={styles.sectionTitle}>Módulos</div>
    <div className={styles.nav}>
      {navItems.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onSelect(item.key)}
          className={`${styles.navButton} ${active === item.key ? styles.active : ''}`}
        >
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
    <div className={styles.footer}>Conectado a Supabase</div>
  </aside>
);

export default Sidebar;
