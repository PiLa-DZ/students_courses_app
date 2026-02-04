import db from "./db.js";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcom to home page" });
});

app.listen(3000, () => {
  console.log(`Server listening on localhost:3000`);
});
