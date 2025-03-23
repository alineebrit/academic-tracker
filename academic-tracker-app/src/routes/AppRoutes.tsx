import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import RegisterPage from '../pages/RegisterPage';


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Tela inicial (login) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Tela de cadastro */}
        <Route path="/register" element={<RegisterPage />} />


        {/* Página principal (dashboard) */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Outras rotas, se necessário */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
