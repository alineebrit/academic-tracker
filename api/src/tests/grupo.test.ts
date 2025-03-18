import chai from 'chai';
import request from 'supertest';
import app from '../server';

const { expect } = chai;

describe('Testes da API de Grupo', () => {
    let authToken: string;
    let turmaId: number;
    let grupoId: number;

    before(async () => {
        // Autenticação
        const authRes = await request(app).post('/auth/login').send({
            email: 'admin@admin.com',
            password: '123',
        });

        expect(authRes.status).to.equal(200);
        authToken = authRes.body.token;
        expect(authToken).to.be.a('string');

        // Criar turma antes de criar um grupo
        const turmaRes = await request(app)
            .post('/turma')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Turma Teste', userId: 8 });

        expect(turmaRes.status).to.equal(201);
        turmaId = turmaRes.body.data.id;
    });

    /** 📌 1. Criar um novo grupo */
    it('✅ Deve criar um novo grupo', async () => {
        const res = await request(app)
            .post('/grupo')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'Grupo Teste',
                turmaId,
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        grupoId = res.body.data.id;
    });

    /** 📌 2. Erro ao criar grupo sem nome */
    it('❌ Não deve criar um grupo sem nome', async () => {
        const res = await request(app)
            .post('/grupo')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ turmaId });

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
    });

    /** 📌 3. Listar todos os grupos */
    it('✅ Deve listar todos os grupos', async () => {
        const res = await request(app)
            .get('/grupo')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
    });

    /** 📌 4. Buscar um grupo pelo ID */
    it('✅ Deve buscar um grupo pelo ID', async () => {
        const res = await request(app)
            .get(`/grupo/${grupoId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('id', grupoId);
    });

    /** 📌 5. Erro ao buscar grupo inexistente */
    it('❌ Deve retornar erro ao buscar um grupo inexistente', async () => {
        const res = await request(app)
            .get('/grupo/99999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 6. Atualizar grupo */
    it('✅ Deve atualizar o nome do grupo', async () => {
        const res = await request(app)
            .put(`/grupo/${grupoId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Grupo Atualizado' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('name', 'Grupo Atualizado');
    });

    /** 📌 7. Erro ao tentar atualizar grupo inexistente */
    it('❌ Deve retornar erro ao tentar atualizar grupo inexistente', async () => {
        const res = await request(app)
            .put('/grupo/99999')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Grupo Inexistente' });

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 8. Excluir grupo */
    it('✅ Deve excluir um grupo pelo ID', async () => {
        const res = await request(app)
            .delete(`/grupo/${grupoId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 9. Erro ao excluir grupo inexistente */
    it('❌ Deve retornar erro ao excluir grupo inexistente', async () => {
        const res = await request(app)
            .delete('/grupo/99999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });
});
