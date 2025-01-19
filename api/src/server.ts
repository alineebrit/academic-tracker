import { GetUsersController } from "./controllers/get-users/get-users";
import express from "express";
import { config } from "dotenv";
import { PgGetUsersRepository } from "./repositories/pg-get-users";

config();
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`ouvindo na porta ${process.env.PORT}`));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", async (req, res) => {
  const pgGetUsersRepository = new PgGetUsersRepository();
  const getUsersController = new GetUsersController(pgGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});
