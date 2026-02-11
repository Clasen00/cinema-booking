import { useAuth } from "@/entities/user";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/movies");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link to="/">Cinema Booking</Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/movies" className={styles.navLink}>
                Фильмы
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/cinemas" className={styles.navLink}>
                Кинотеатры
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/my-tickets" className={styles.navLink}>
                Мои билеты
              </Link>
            </li>
            <li className={styles.navItem}>
              {isAuthenticated ? (
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Выход
                </button>
              ) : (
                <Link to="/login" className={styles.navLink}>
                  Вход
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
