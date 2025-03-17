import chai from "chai";
import request from "supertest";
import app from "../server";

const { expect } = chai;

describe("Testes da API de Turmas", () => {
    let turmaId: number;

    /** 📌 1. Criar uma nova turma */
    it("✅ Deve criar uma nova turma", async () => {
        const res = await request(app).post("/turma").send({
            name: "Turma Teste",
            userId: 1,
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id");

        turmaId = res.body.data.id;
    });

    /** 📌 2. Erro ao criar turma sem nome ou userId */
    it("❌ Não deve criar uma turma sem nome ou userId", async () => {
        const res = await request(app).post("/turma").send({});

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("error", "Campo obrigatório não preenchido");
    });

    /** 📌 3. Erro ao criar turma com usuário inválido */
    it("❌ Não deve criar uma turma com usuário inexistente", async () => {
        const res = await request(app).post("/turma").send({
            name: "Turma Teste",
            userId: 99999,
        });

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error", "Usuário não encontrado!");
    });

    /** 📌 4. Listar todas as turmas */
    it("✅ Deve listar todas as turmas", async () => {
        const res = await request(app).get("/turma");

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.an("array");
    });

    /** 📌 5. Buscar uma turma pelo ID */
    it("✅ Deve buscar uma turma pelo ID", async () => {
        const res = await request(app).get(`/turma/${turmaId}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id", turmaId);
    });

    /** 📌 6. Erro ao buscar turma inexistente */
    it("❌ Deve retornar erro ao buscar uma turma inexistente", async () => {
        const res = await request(app).get(`/turma/99999`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("error");
    });

    /** 📌 7. Atualizar turma */
    it("✅ Deve atualizar o nome da turma", async () => {
        const res = await request(app).put(`/turma/${turmaId}`).send({
            name: "Turma Atualizada"
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("name", "Turma Atualizada");
    });

    /** 📌 8. Erro ao tentar atualizar turma inexistente */
    it("❌ Deve retornar erro ao tentar atualizar turma inexistente", async () => {
        const res = await request(app).put(`/turma/99999`).send({
            name: "Turma Inexistente"
        });

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("error");
    });

    /** 📌 9. Excluir turma */
    it("✅ Deve excluir uma turma pelo ID", async () => {
        const res = await request(app).delete(`/turma/${turmaId}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 10. Erro ao excluir turma inexistente */
    it("❌ Deve retornar erro ao excluir turma inexistente", async () => {
        const res = await request(app).delete(`/turma/99999`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("error");
    });
});
