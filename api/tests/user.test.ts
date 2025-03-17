import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import app from "../src/server"; // Certifique-se de que esse caminho está correto

chai.use(chaiHttp);
const { expect } = chai;

describe("Testes da API de Usuários", () => {
    let userId: number;

    it("✅ Deve criar um usuário", (done) => {
        request(app)
            .post("/user")
            .send({
                name: "Usuário Teste",
                email: "teste@email.com",
                password: "123456",
                role: "ALUNO",
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("id");
                userId = res.body.id;
                done();
            });
    });

    it("❌ Não deve criar usuário sem email", (done) => {
        request(app)
            .post("/user")
            .send({
                name: "Usuário Sem Email",
                password: "123456",
                role: "ALUNO",
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property("error");
                done();
            });
    });

    it("✅ Deve buscar um usuário por ID", (done) => {
        request(app)
            .get(`/user/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("id", userId);
                done();
            });
    });

    it("✅ Deve atualizar um usuário", (done) => {
        request(app)
            .put(`/user/${userId}`)
            .send({ name: "Novo Nome Teste" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("name", "Novo Nome Teste");
                done();
            });
    });

    it("✅ Deve deletar um usuário", (done) => {
        request(app)
            .delete(`/user/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
