import React from 'react';
import Header from '../components/Layout/Header';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Bem-vindo ao Academic Tracker</h1>
        <p>Escolha uma opção no menu.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
