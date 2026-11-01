import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Портал стажировок</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Стажировки</Link>
        
        {user ? (
          <>
            <Link to="/my-applications">Мои заявки</Link>
            <Link to="/post-internship">Разместить стажировку</Link>
            <button onClick={logout} className="logout-btn">Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/signup">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;