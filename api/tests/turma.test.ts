import chai from "chai";
import request from "supertest"; // Supertest para chamadas HTTP
import app from "../src/server"; // Certifique-se que seu server.ts exporta o app corretamente

const { expect } = chai;

describe("Testes da API de Turma", () => {
    let turmaId: number;

    /** 📌 1. Criar uma nova turma */
    it("✅ Deve criar uma nova turma", async () => {
        const res = await request(app).post("/turma").send({
            name: "Turma de Matemática",
            userId: 1
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
        turmaId = res.body.id;
    });

    /** 📌 2. Erro ao criar turma sem nome */
    it("❌ Não deve criar uma turma sem nome", async () => {
        const res = await request(app).post("/turma").send({ userId: 1 });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
    });

    /** 📌 3. Listar todas as turmas */
    it("✅ Deve listar todas as turmas", async () => {
        const res = await request(app).get("/turma");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    /** 📌 4. Buscar uma turma pelo ID */
    it("✅ Deve buscar uma turma pelo ID", async () => {
        const res = await request(app).get(`/turma/${turmaId}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", turmaId);
    });

    /** 📌 5. Erro ao buscar turma inexistente */
    it("❌ Deve retornar erro ao buscar uma turma inexistente", async () => {
        const res = await request(app).get(`/turma/99999`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });

    /** 📌 6. Atualizar turma */
    it("✅ Deve atualizar o nome da turma", async () => {
        const res = await request(app).put(`/turma/${turmaId}`).send({
            name: "Turma Atualizada"
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("name", "Turma Atualizada");
    });

    /** 📌 7. Erro ao tentar atualizar turma inexistente */
    it("❌ Deve retornar erro ao tentar atualizar turma inexistente", async () => {
        const res = await request(app).put(`/turma/99999`).send({
            name: "Turma Não Existe"
        });

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });

    /** 📌 8. Excluir turma */
    it("✅ Deve excluir uma turma pelo ID", async () => {
        const res = await request(app).delete(`/turma/${turmaId}`);

        expect(res.status).to.equal(200);
    });

    /** 📌 9. Erro ao excluir turma inexistente */
    it("❌ Deve retornar erro ao excluir turma inexistente", async () => {
        const res = await request(app).delete(`/turma/99999`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });
});
