import express from "express";
import { config } from "dotenv";

config();
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`ouvindo na porta ${process.env.PORT}`));

app.get("/", (req, res) => {
  res.send("hello world");
});
