import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [registration, setRegistration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações de senha
    if (password !== confirmPassword) {
      alert('As senhas não coincidem. Tente novamente.');
      return;
    }

    // Simulação de envio do cadastro
    console.log('Cadastro realizado com sucesso!', {
      name,
      email,
      discipline,
      registration,
      password,
    });
    alert('Cadastro realizado com sucesso!');
    navigate('/'); // Redireciona para a tela de login após o cadastro
  };

  return (
    <div className="register-container">
      <h1>Cadastro de Professor</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="discipline">Disciplina</label>
          <input
            type="text"
            id="discipline"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            placeholder="Digite sua disciplina"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registration">Matrícula</label>
          <input
            type="text"
            id="registration"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            placeholder="Digite sua matrícula"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </div>
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
            placeholder="Crie uma senha"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme a Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Cadastrar
        </button>
        <p className="back-to-login" onClick={() => navigate('/')}>
          Voltar ao Login
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
