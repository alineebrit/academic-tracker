import chai from "chai";
import request from "supertest";
import app from "../server";

const { expect } = chai;

describe("Testes da API de Autenticação", () => {
    /** 📌 1. Login com credenciais válidas */
    it("✅ Deve fazer login com credenciais válidas", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "user@example.com",
            password: "senhaSegura123"
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("token");
    });

    /** 📌 2. Login com credenciais inválidas */
    it("❌ Não deve fazer login com credenciais inválidas", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "user@example.com",
            password: "senhaErrada123"
        });

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message", "Credenciais inválidas");
    });

    /** 📌 3. Login com usuário inexistente */
    it("❌ Não deve fazer login com usuário inexistente", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "naoexiste@example.com",
            password: "senhaSegura123"
        });

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message", "Credenciais inválidas");
    });

    /** 📌 4. Erro ao fazer login (erro no servidor) */
    it("❌ Deve retornar erro ao tentar fazer login com erro no servidor", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "user@example.com",
            password: "senhaSegura123"
        });

        // Simulando erro de servidor
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("message", "Erro ao fazer login");
    });
});
