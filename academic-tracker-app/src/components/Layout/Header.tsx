import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Academic Tracker</h1>
        <nav className="header-nav">
          <ul>
            <li>
              <a href="#turmas">Turmas</a>
            </li>
            <li>
              <a href="#grupos">Grupos</a>
            </li>
            <li>
              <a href="#acompanhamentos">Acompanhamentos</a>
            </li>
            <li>
              <a href="#perfil">Perfil</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
