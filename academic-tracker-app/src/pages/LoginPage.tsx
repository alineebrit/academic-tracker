import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação de autenticação
    if (email === 'admin@example.com' && password === '123456') {
      console.log('Login bem-sucedido!');
      navigate('/dashboard'); // Redireciona para a página com o Header
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleRegisterClick = () => {
    console.log('Navegar para página de cadastro');
    // Navegar para uma rota de cadastro se necessário
    navigate('/register'); // Exemplo de redirecionamento para cadastro
  };

  return (
    <div className="login-container">
      <h1>Academic Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
      <p className="register-link" onClick={handleRegisterClick}>
        Sou professor, e desejo-me cadastrar
      </p>
    </div>
  );
};

export default LoginPage;
