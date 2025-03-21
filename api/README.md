# Princípios dev web

https://github.com/joseglauberbo/ProgWeb24.2

## Academic Tracker

O academic Tracker é uma Aplicação web focada no gestão e acompanhamento de atividades dos alunos pelo professor.

## Tecnologias Utilizadas

### Frontend

- React
- Typescript

### Backend

- Nodejs
- Express
- JWT

### Banco de dados

- Supabase
- Prisma (ORM)
- PostgreSQL

## Rotas importantes

- http://localhost:3000/ (rota padrão para o servidor)
- http://localhost:3000/api-docs (swagger-api)

## Principais Features do Sistema

### Usuários

- Os usuários podem ser cadastrados a partir de NOME, EMAIL, PASSWORD e ROLE
- Os usuários podem se autenticar a partir da rota /auth/login a partir do seu EMAIL e SENHA
- Os usuários podem ser do tipo "PROFESSOR", "ALUNO" ou ADMIN;
- Usuários do tipo PROFESSOR irão conter TURMAS que só podem ser cadastradas por ele
- Usuários do tipo ALUNO terão grupos que terão que ser cadastrados pelos PROFESSORES

### Turmas

- Turmas devem ser criadas por professores
- Turmas contém grupos que também devem ser criadas pelos professores
- A turma é criada a partir, minimamente, de um nome e um userId

### Grupos

- Grupos devem ser criados pelos professores, recebendo apenas obrigatoriamente nome e id do usuário do tipo PROFESSOR
- Grupos contém também Notes que são basicamente Notas ou Feedbacks dados aos alunos para que eles possam atualizar mais sobre a entrega.

### Note

- Notes contém um título, um conteúdo e também o grupoId o qual essa note deve ser associada.

### Atividade

- A atividade contém um título podendo conter também um grupoId associado, além da descrição e dueDate;

## Estrutura do Banco de dados

Para entender como está estruturado o banco de dados basta acessar:

```
cd prisma
schema.prisma
```

## Rotas

### Atividades

- [POST] /atividades AUTORIZAÇÃO: ['ADMIN', 'PROFESSOR']
- [GET] /atividades AUTORIZAÇÃO: TODOS
- [GET] /atividades/{id} AUTORIZAÇÃO: TODOS
- [PUT] /atividades/{id} AUTORIZAÇÃO: ['ADMIN', 'PROFESSOR']
- [DELETE] /atividades/{id} AUTORIZAÇÃO: ['ADMIN', 'PROFESSOR']

### Grupos

- [POST] /grupo ['ADMIN', 'PROFESSOR', 'ALUNO']
  Body:
  {
  "name": "grupoteste",
  "turmaId": 2
  }
- [GET] /grupo ['ADMIN', 'PROFESSOR', 'ALUNO']
- [GET] /grupo/{id} ['ADMIN', 'PROFESSOR', 'ALUNO']
- [PUT] /grupo/{id} ['ADMIN', 'PROFESSOR']
- [DELETE] /grupo/{id} ['ADMIN', 'PROFESSOR']

### Notes

- [POST] /notes ['ADMIN', 'PROFESSOR']
  Body:
  {
  "title": "nota do grupo aline e luis",
  "content": "os alunos seguiram os requisitos esperados",
  "grupoId": 2
  }
- [GET] /notes ['ADMIN', 'PROFESSOR', 'ALUNO']
- [GET] /notes/{id} ['ADMIN', 'PROFESSOR', 'ALUNO']
- [PUT] /notes/{id} ['ADMIN', 'PROFESSOR']
- [DELETE] /notes/{id} ['ADMIN', 'PROFESSOR']

### Turmas

- [POST] /turma ['ADMIN', 'PROFESSOR']
  Body:
  {
  "name": "luis teste",
  "userId": 1
  }
- [GET] /turma ['ADMIN', 'PROFESSOR', 'ALUNO']
- [GET] /turma/{id} ['ADMIN', 'PROFESSOR', 'ALUNO']
- [PUT] /turma/{id} ['ADMIN', 'PROFESSOR']
- [DELETE] /turma/{id} ['ADMIN', 'PROFESSOR']

### Usuários

- [POST] /user ['ADMIN', 'PROFESSOR', 'ALUNO']
  Body:
  {
  "name": "luis teste",
  "email": "luis55@email.com",
  "password": "12314",
  "role": "ALUNO"
  }
- [GET] /user ['ADMIN', 'PROFESSOR']
- [GET] /user/{id} ['ADMIN', 'PROFESSOR']
- [PUT] /user/{id} ['ADMIN', 'ALUNO', 'PROFESSOR']
- [DELETE] /user/{id} ['ADMIN']

### Autenticação

- /auth/login

Adicionar no Header da Request: [KEY] Authorization [VALUE] Bearer SUA_CHAVE
