import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Academic Tracker",
      version: "1.0.0",
      description: "Documentação da API do Academic Tracker",
    },
    servers: [
      {
        url: "http://localhost:3000", // Ajuste conforme necessário
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Caminho correto para as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
