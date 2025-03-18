import chai from 'chai';
import request from 'supertest';
import app from '../server';

const { expect } = chai;

describe('Testes da API de Turma', () => {
    let authToken: string;
    let turmaId: number;

    before(async () => {
        // Autentica como admin para obter o token
        const authRes = await request(app).post('/auth/login').send({
            email: 'admin@admin.com',
            password: '123',
        });

        expect(authRes.status).to.equal(200);
        authToken = authRes.body.token;
        expect(authToken).to.be.a('string');
    });

    /** 📌 1. Criar uma nova turma */
    it('✅ Deve criar uma nova turma', async () => {
        const res = await request(app)
            .post('/turma')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'turma teste',
                userId: 8,
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        turmaId = res.body.data.id;
    });

    /** 📌 2. Erro ao criar turma sem título */
    it('❌ Não deve criar uma turma sem título', async () => {
        const res = await request(app)
            .post('/turma')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                userId: 8,
            });

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
    });

    /** 📌 3. Listar todas as Turma */
    it('✅ Deve listar todas as Turma', async () => {
        const res = await request(app)
            .get('/turma')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
    });

    /** 📌 4. Buscar uma turma pelo ID */
    it('✅ Deve buscar uma turma pelo ID', async () => {
        const res = await request(app)
            .get(`/turma/${turmaId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('id', turmaId);
    });

    /** 📌 5. Erro ao buscar turma inexistente */
    it('❌ Deve retornar erro ao buscar uma turma inexistente', async () => {
        const res = await request(app)
            .get('/turma/99999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 6. Atualizar turma */
    it('✅ Deve atualizar o título da turma', async () => {
        const res = await request(app)
            .put(`/turma/${turmaId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'turma Atualizada',
            });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('name', 'turma Atualizada');
    });

    /** 📌 7. Erro ao tentar atualizar turma inexistente */
    it('❌ Deve retornar erro ao tentar atualizar turma inexistente', async () => {
        const res = await request(app)
            .put('/turma/99999')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 'turma Inexistente',
            });

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 8. Excluir turma */
    it('✅ Deve excluir uma turma pelo ID', async () => {
        const res = await request(app)
            .delete(`/turma/${turmaId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 9. Erro ao excluir turma inexistente */
    it('❌ Deve retornar erro ao excluir turma inexistente', async () => {
        const res = await request(app)
            .delete('/turma/99999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });
});
