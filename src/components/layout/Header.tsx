import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/movies');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Cinema Booking</Link>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/movies" className="nav-link">Фильмы</Link>
            </li>
            <li className="nav-item">
              <Link to="/cinemas" className="nav-link">Кинотеатры</Link>
            </li>
            <li className="nav-item">
              <Link to="/my-tickets" className="nav-link">Мои билеты</Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="logout-button">
                  Выход
                </button>
              ) : (
                <Link to="/login" className="nav-link">Вход</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
