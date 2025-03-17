import chai from "chai";
import request from "supertest";
import app from "../server";

const { expect } = chai;

describe("Testes da API de Grupos", () => {
    let grupoId: number;

    /** 📌 1. Criar um novo grupo */
    it("✅ Deve criar um novo grupo", async () => {
        const res = await request(app).post("/grupo").send({
            name: "Grupo Teste"
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id");

        grupoId = res.body.data.id;
    });

    /** 📌 2. Erro ao criar grupo sem nome */
    it("❌ Não deve criar um grupo sem nome", async () => {
        const res = await request(app).post("/grupo").send({});

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error", "Nome do grupo não preenchido");
    });

    /** 📌 3. Listar todos os grupos */
    it("✅ Deve listar todos os grupos", async () => {
        const res = await request(app).get("/grupo");

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.an("array");
    });

    /** 📌 4. Buscar um grupo pelo ID */
    it("✅ Deve buscar um grupo pelo ID", async () => {
        const res = await request(app).get(`/grupo/${grupoId}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id", grupoId);
    });

    /** 📌 5. Erro ao buscar grupo inexistente */
    it("❌ Deve retornar erro ao buscar um grupo inexistente", async () => {
        const res = await request(app).get(`/grupo/99999`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });

    /** 📌 6. Atualizar grupo */
    it("✅ Deve atualizar o nome do grupo", async () => {
        const res = await request(app).put(`/grupo/${grupoId}`).send({
            name: "Grupo Atualizado"
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("name", "Grupo Atualizado");
    });

    /** 📌 7. Erro ao tentar atualizar grupo inexistente */
    it("❌ Deve retornar erro ao tentar atualizar grupo inexistente", async () => {
        const res = await request(app).put(`/grupo/99999`).send({
            name: "Grupo Inexistente"
        });

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });

    /** 📌 8. Excluir grupo */
    it("✅ Deve excluir um grupo pelo ID", async () => {
        const res = await request(app).delete(`/grupo/${grupoId}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 9. Erro ao excluir grupo inexistente */
    it("❌ Deve retornar erro ao excluir grupo inexistente", async () => {
        const res = await request(app).delete(`/grupo/99999`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });
});
