import chai from 'chai';
import request from 'supertest';
import app from '../server';

const { expect } = chai;

describe('Testes da API de Atividade', () => {
    let authToken: string;
    let grupoId: number;
    let atividadeId: number;

    before(async () => {
        // Autentica como admin para obter o token
        const authRes = await request(app).post('/auth/login').send({
            email: 'admin@admin.com',
            password: '123',
        });

        expect(authRes.status).to.equal(200);
        authToken = authRes.body.token;
        expect(authToken).to.be.a('string');

        // Criar uma turma para associar à atividade
        const grupoRes = await request(app)
            .post('/grupo')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Turma Teste', turmaId: 21 });

        expect(grupoRes.status).to.equal(201);
        grupoId = grupoRes.body.data.id;
    });

    /** 📌 1. Criar uma nova atividade */
    it('✅ Deve criar uma nova atividade', async () => {
        const res = await request(app)
            .post('/atividades')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 'Atividade Teste',
                description: 'Descrição da atividade',
                grupoId,
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        atividadeId = res.body.data.id;
    });

    /** 📌 2. Erro ao criar atividade sem título */
    it('❌ Não deve criar uma atividade sem título', async () => {
        const res = await request(app)
            .post('/atividades')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ description: 'Sem título', grupoId });

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
    });

    /** 📌 3. Listar todas as atividades */
    it('✅ Deve listar todas as atividades', async () => {
        const res = await request(app)
            .get('/atividades')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
    });

    /** 📌 4. Buscar uma atividade pelo ID */
    it('✅ Deve buscar uma atividade pelo ID', async () => {
        const res = await request(app)
            .get(`/atividades/${atividadeId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('id', atividadeId);
    });

    /** 📌 5. Erro ao buscar atividade inexistente */
    it('❌ Deve retornar erro ao buscar uma atividade inexistente', async () => {
        const res = await request(app)
            .get('/atividades/99999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 6. Atualizar atividade */
    it('✅ Deve atualizar o título da atividade', async () => {
        const res = await request(app)
            .put(`/atividades/${atividadeId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 'Atividade Atualizada',
                description: 'Nova descrição',
            });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('title', 'Atividade Atualizada');
    });

    /** 📌 7. Erro ao tentar atualizar atividade inexistente */
    it('❌ Deve retornar erro ao tentar atualizar atividade inexistente', async () => {
        const res = await request(app)
            .put('/atividades/99999')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ title: 'Atividade Inexistente' });

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 8. Excluir atividade */
    it('✅ Deve excluir uma atividade pelo ID', async () => {
        const res = await request(app)
            .delete(`/atividades/${atividadeId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 9. Erro ao excluir atividade inexistente */
    it('❌ Deve retornar erro ao excluir atividade inexistente', async () => {
        const res = await request(app)
            .delete('/atividades/99999')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });
});
