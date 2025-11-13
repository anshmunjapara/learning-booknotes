import express from "express";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url"; // Import fileURLToPath

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve Bootstrap CSS
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);

// Serve Bootstrap JS
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

// Serve Popper.js
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/@popperjs/core/dist/umd"))
);

let books = [
  {
    id: 1,
    title: "My book 1",
    date: "Nov 11, 25",
    isbn: "0385472579",
    description:
      "porro, velit et aut odio recusandae. Autem reprehenderit eaque optio voluptatem, temporibus ipsum",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { books: books, title: "Home", message: "Working" });
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
