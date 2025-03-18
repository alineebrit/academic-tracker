import chai from 'chai';
import request from 'supertest';
import app from '../server';

const { expect } = chai;

describe('Testes da API de Notes', () => {
    let authToken: string;
    let turmaId: number;
    let grupoId: number;
    let noteId: number;

    before(async () => {
        // Autenticação para obter o token
        const authRes = await request(app).post('/auth/login').send({
            email: 'admin@admin.com',
            password: '123',
        });

        expect(authRes.status).to.equal(200);
        authToken = authRes.body.token;
        expect(authToken).to.be.a('string');

        // Criar uma Turma
        const turmaRes = await request(app)
            .post('/turma')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Turma Teste', userId: 8 });

        expect(turmaRes.status).to.equal(201);
        turmaId = turmaRes.body.data.id;

        // Criar um Grupo
        const grupoRes = await request(app)
            .post('/grupo')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Grupo Teste', turmaId });

        expect(grupoRes.status).to.equal(201);
        grupoId = grupoRes.body.data.id;
    });

    /** 📌 1. Criar uma nova Note */
    it('✅ Deve criar uma nova Note', async () => {
        const res = await request(app)
            .post('/notes')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 'Nota do grupo Aline e Luis',
                content: 'Os alunos seguiram os requisitos esperados',
                grupoId,
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        noteId = res.body.data.id;
    });

    /** 📌 2. Erro ao criar uma Note sem título */
    it('❌ Não deve criar uma Note sem título', async () => {
        const res = await request(app)
            .post('/notes')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: 'Conteúdo sem título', grupoId });

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
    });

    /** 📌 3. Listar todas as Notes */
    it('✅ Deve listar todas as Notes', async () => {
        const res = await request(app)
            .get('/notes')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
    });

    /** 📌 4. Buscar uma Note pelo ID */
    it('✅ Deve buscar uma Note pelo ID', async () => {
        const res = await request(app)
            .get(`/notes/${noteId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('id', noteId);
    });

    /** 📌 5. Atualizar uma Note */
    it('✅ Deve atualizar uma Note', async () => {
        const res = await request(app)
            .put(`/notes/${noteId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 'Nota Atualizada',
                content: 'Novo conteúdo da nota',
            });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('title', 'Nota Atualizada');
    });

    /** 📌 6. Erro ao buscar uma Note inexistente */
    it('❌ Deve retornar erro ao buscar uma Note inexistente', async () => {
        const res = await request(app)
            .get('/notes/99999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 7. Excluir uma Note */
    it('✅ Deve excluir uma Note pelo ID', async () => {
        const res = await request(app)
            .delete(`/notes/${noteId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 8. Erro ao excluir uma Note inexistente */
    it('❌ Deve retornar erro ao excluir uma Note inexistente', async () => {
        const res = await request(app)
            .delete('/notes/99999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });
});
