import chai from "chai";
import request from "supertest";
import app from "../server";

const { expect } = chai;

describe("Testes da API de Notas", () => {
    let noteId: number;

    /** 📌 1. Criar uma nova nota */
    it("✅ Deve criar uma nova nota", async () => {
        const res = await request(app).post("/notes").send({
            title: "Nota Teste",
            content: "Conteúdo da nota",
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id");

        noteId = res.body.data.id;
    });

    /** 📌 2. Erro ao criar nota sem título */
    it("❌ Não deve criar uma nota sem título", async () => {
        const res = await request(app).post("/notes").send({
            content: "Nota sem título",
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error", "Título da nota não preenchido");
    });

    /** 📌 3. Listar todas as notas */
    it("✅ Deve listar todas as notas", async () => {
        const res = await request(app).get("/notes");

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.an("array");
    });

    /** 📌 4. Buscar uma nota pelo ID */
    it("✅ Deve buscar uma nota pelo ID", async () => {
        const res = await request(app).get(`/notes/${noteId}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id", noteId);
    });

    /** 📌 5. Erro ao buscar nota inexistente */
    it("❌ Deve retornar erro ao buscar uma nota inexistente", async () => {
        const res = await request(app).get(`/notes/99999`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });

    /** 📌 6. Atualizar nota */
    it("✅ Deve atualizar o título da nota", async () => {
        const res = await request(app).put(`/notes/${noteId}`).send({
            title: "Nota Atualizada"
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("title", "Nota Atualizada");
    });

    /** 📌 7. Erro ao tentar atualizar nota inexistente */
    it("❌ Deve retornar erro ao tentar atualizar nota inexistente", async () => {
        const res = await request(app).put(`/notes/99999`).send({
            title: "Nota Inexistente"
        });

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });

    /** 📌 8. Excluir nota */
    it("✅ Deve excluir uma nota pelo ID", async () => {
        const res = await request(app).delete(`/notes/${noteId}`);

        expect(res.status).to.equal(204);
    });

    /** 📌 9. Erro ao excluir nota inexistente */
    it("❌ Deve retornar erro ao excluir nota inexistente", async () => {
        const res = await request(app).delete(`/notes/99999`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
    });
});
