import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useAuth } from "../../hooks/useAuth";

const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/movies");
  };

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <div className="nav-logo">
            <Link to="/" className="logo-link">
              Бронирование билетов
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/movies" className="nav-link">
              Фильмы
            </Link>
            <Link to="/cinemas" className="nav-link">
              Кинотеатры
            </Link>
            {isAuthenticated && (
              <Link to="/my-tickets" className="nav-link">
                Мои билеты
              </Link>
            )}
          </div>
          <div className="nav-auth">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="auth-button logout">
                Выход
              </button>
            ) : (
              <Link to="/login" className="auth-button login">
                Вход
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
