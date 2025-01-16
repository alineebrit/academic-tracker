# Princípios dev web

https://github.com/joseglauberbo/ProgWeb24.2

## Academic Tracker

O academic Tracker é uma aplicação web focada no gestão e acompanhamento de atividades dos alunos pelo professor.
Será possível cadastrar um professor e esse professor terá uma turma, que por sua vez terão Grupos
Os grupos serão compostos de alunos e os grupos também irão guardar um grupo de Cards que serão relacionados aos acompanhamentos.

As tecnologias utilizadas serão Typescript com React para o front-end e para o backend Nodejs com express.

Os usuários podem ser cadastrados a partir de NOME e TIPO;
Os usuários podem ser do tipo "PROFESSOR" ou do tipo "ALUNO";
O professor contém TURMAS
Turmas contém GRUPOS (Além de outras descrições)
Os GRUPOS são compostos por ALUNOS
Os GRUPOS também contém NOTAS que são referentes aos acompanhamentos. 

Exemplos de rotas que serão desenvolvidas:
1 - Criar turma:
    •    POST /api/turmas
    •    Descrição: Cria uma nova turma vinculada a um professor.
    •    Body: { "nome": "string", "descricao": "string", "professorId": "string" }
2 - Listar turmas:
    •    GET /api/turmas
    •    Descrição: Retorna todas as turmas cadastradas

--


