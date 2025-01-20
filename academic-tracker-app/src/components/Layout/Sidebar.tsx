import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-menu">
          <li>
            <a href="/turmas">Turmas</a>
          </li>
          <li>
            <a href="/grupos">Grupos</a>
          </li>
          <li>
            <a href="/acompanhamentos">Acompanhamentos</a>
          </li>
          <li>
            <a href="/perfil">Perfil</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
