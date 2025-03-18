import chai from 'chai';
import request from 'supertest';
import app from '../server';

const { expect } = chai;

describe('Testes da API de Usuários', () => {
    let userId: number;
    let authToken: string;
    const uniqueEmail = `user_${Date.now()}@example.com`;

    /** 📌 Antes de rodar os testes, autentica o admin e cria um usuário para os testes */
    before(async () => {
        const authRes = await request(app).post('/auth/login').send({
            email: 'admin@admin.com',
            password: '123',
        });

        console.log('Resposta do login:', authRes.body);
        authToken = authRes.body.token;
        expect(authToken).to.be.a('string');

        const userRes = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                email: uniqueEmail,
                name: 'User Test',
                password: 'senhaSegura123',
                role: 'ADMIN',
            });

        expect(userRes.status).to.equal(201);
        expect(userRes.body).to.have.property('data');
        userId = userRes.body.data.id;
    });

    /** 📌 1. Criar um novo usuário */
    it('✅ Deve criar um novo usuário', async () => {
        const newUserEmail = `user_${Date.now()}@example.com`;

        const res = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                email: newUserEmail,
                name: 'User Test',
                password: 'senhaSegura123',
                role: 'ADMIN',
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
    });

    /** 📌 2. Erro ao criar usuário sem email */
    it('❌ Não deve criar um usuário sem email', async () => {
        const res = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'User Test',
                password: 'senhaSegura123',
                role: 'ADMIN',
            });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property(
            'error',
            'Campo obrigatório não preenchido'
        );
    });

    /** 📌 3. Erro ao criar usuário com role inválido */
    it('❌ Não deve criar um usuário com um tipo inválido', async () => {
        const res = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                email: `invalid_role_${Date.now()}@example.com`,
                name: 'User Test',
                password: 'senhaSegura123',
                role: 'INVALID_ROLE',
            });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property(
            'error',
            'Adicione um tipo válido de usuário'
        );
    });

    /** 📌 4. Listar todos os usuários */
    it('✅ Deve listar todos os usuários', async () => {
        const res = await request(app)
            .get('/user')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
    });

    /** 📌 5. Buscar um usuário pelo ID */
    it('✅ Deve buscar um usuário pelo ID', async () => {
        const res = await request(app)
            .get(`/user/${userId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('id', userId);
    });

    /** 📌 6. Erro ao buscar usuário inexistente */
    it('❌ Deve retornar erro ao buscar um usuário inexistente', async () => {
        const res = await request(app)
            .get(`/user/99999`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 7. Atualizar usuário */
    it('✅ Deve atualizar o nome do usuário', async () => {
        const res = await request(app)
            .put(`/user/${userId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'User Atualizado',
            });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('name', 'User Atualizado');
    });

    /** 📌 8. Erro ao tentar atualizar usuário inexistente */
    it('❌ Deve retornar erro ao tentar atualizar usuário inexistente', async () => {
        const res = await request(app)
            .put(`/user/99999`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'User Inexistente',
            });

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });

    /** 📌 9. Excluir usuário */
    it('✅ Deve excluir um usuário pelo ID', async () => {
        const res = await request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 10. Erro ao excluir usuário inexistente */
    it('❌ Deve retornar erro ao excluir usuário inexistente', async () => {
        const res = await request(app)
            .delete(`/user/99999`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });
});
