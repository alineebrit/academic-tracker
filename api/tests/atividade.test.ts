import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import app from "../src/server"; // Caminho do seu servidor

chai.use(chaiHttp);
const { expect } = chai;

describe("Testes da API de Atividades", () => {
    let atividadeId: number;

    it("✅ Deve criar uma atividade", (done) => {
        request(app)
            .post("/atividades")
            .send({ title: "Atividade de Matemática" })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("id");
                atividadeId = res.body.id;
                done();
            });
    });

    it("❌ Não deve criar uma atividade sem título", (done) => {
        request(app)
            .post("/atividades")
            .send({}) // Falta o título
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property("error");
                done();
            });
    });

    it("✅ Deve buscar uma atividade por ID", (done) => {
        request(app)
            .get(`/atividades/${atividadeId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("id", atividadeId);
                done();
            });
    });

    it("✅ Deve atualizar uma atividade", (done) => {
        request(app)
            .put(`/atividades/${atividadeId}`)
            .send({ title: "Nova Atividade de Ciências" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("title", "Nova Atividade de Ciências");
                done();
            });
    });

    it("✅ Deve deletar uma atividade", (done) => {
        request(app)
            .delete(`/atividades/${atividadeId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
