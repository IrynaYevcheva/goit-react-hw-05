import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import clsx from 'clsx';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        className={({ isActive }) => {
          return clsx(styles.link, isActive && styles.isActive);
        }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return clsx(styles.link, isActive && styles.isActive);
        }}
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
};
