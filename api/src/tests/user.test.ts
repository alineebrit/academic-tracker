import chai from "chai";
import request from "supertest"; // Supertest para chamadas HTTP
import app from "../server"; // Certifique-se que seu server.ts exporta o app corretamente

const { expect } = chai;

describe("Testes da API de Usuários", () => {
    let userId: number;

    /** 📌 1. Criar um novo usuário */
    it("✅ Deve criar um novo usuário", async () => {
        const res = await request(app).post("/user").send({
            email: "user4@example.com",
            name: "User Test",
            password: "senhaSegura123",
            role: "ADMIN"
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id");

        userId = res.body.data.id;
    });

    /** 📌 2. Erro ao criar usuário sem email */
    it("❌ Não deve criar um usuário sem email", async () => {
        const res = await request(app).post("/user").send({
            name: "User Test",
            password: "senhaSegura123",
            role: "ADMIN"
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error", "Campo obrigatório não preenchido");
    });

    /** 📌 3. Erro ao criar usuário com role inválido */
    it("❌ Não deve criar um usuário com um tipo inválido", async () => {
        const res = await request(app).post("/user").send({
            email: "user@example.com",
            name: "User Test",
            password: "senhaSegura123",
            role: "INVALID_ROLE"
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error", "Adicione um tipo válido de usuário");
    });

    /** 📌 4. Listar todos os usuários */
    it("✅ Deve listar todos os usuários", async () => {
        const res = await request(app).get("/user");

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.an("array");
    });

    /** 📌 5. Buscar um usuário pelo ID */
    it("✅ Deve buscar um usuário pelo ID", async () => {
        const res = await request(app).get(`/user/${userId}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id", userId);
    });

    /** 📌 6. Erro ao buscar usuário inexistente */
    it("❌ Deve retornar erro ao buscar um usuário inexistente", async () => {
        const res = await request(app).get(`/user/99999`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("error");
    });

    /** 📌 7. Atualizar usuário */
    it("✅ Deve atualizar o nome do usuário", async () => {
        const res = await request(app).put(`/user/${userId}`).send({
            name: "User Atualizado"
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("name", "User Atualizado");
    });

    /** 📌 8. Erro ao tentar atualizar usuário inexistente */
    it("❌ Deve retornar erro ao tentar atualizar usuário inexistente", async () => {
        const res = await request(app).put(`/user/99999`).send({
            name: "User Inexistente"
        });

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("error");
    });

    /** 📌 9. Excluir usuário */
    it("✅ Deve excluir um usuário pelo ID", async () => {
        const res = await request(app).delete(`/user/${userId}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 10. Erro ao excluir usuário inexistente */
    it("❌ Deve retornar erro ao excluir usuário inexistente", async () => {
        const res = await request(app).delete(`/user/99999`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("error");
    });
});
