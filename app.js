import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booknotes",
  password: "M@nsh6879",
});
db.connect();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {title: "Home", message: "Working"});
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});

