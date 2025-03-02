interface Turma {
    id: string;
    nome: string;
    descricao: string;
  }
  
  interface ListaTurmasProps {
    turmas: Turma[];
  }
  
  const ListaTurmas: React.FC<ListaTurmasProps> = ({ turmas }) => (
    <ul>
      {turmas.map((turma) => (
        <li key={turma.id}>
          <h3>{turma.nome}</h3>
          <p>{turma.descricao}</p>
        </li>
      ))}
    </ul>
  );
  
  export default ListaTurmas;
  