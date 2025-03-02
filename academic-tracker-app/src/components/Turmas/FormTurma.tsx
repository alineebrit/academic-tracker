import React, { useState } from 'react';

interface FormTurmaProps {
  onSubmit: (data: { nome: string; descricao: string }) => void;
}

const FormTurma: React.FC<FormTurmaProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, descricao });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      <label>
        Descrição:
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default FormTurma;
