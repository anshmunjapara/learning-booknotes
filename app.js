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
  password: "verySecure",
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
    rating: 8,
    description:
      "porro, velit et aut odio recusandae. Autem reprehenderit eaque optio voluptatem, temporibus ipsum",
  },
];

let notes = [
  {
    id: 1,
    datetime: "Nov 11, 25",
    content: "porro, velit et aut odio recusandae. Autem reprehender",
  },
  {
    id: 2,
    datetime: "Nov 11, 25",
    content:
      "porro, velit et aut odio recusandae. Autem reprehenderit eaque optio voluptatem, temporibus ipsum",
  },
  {
    id: 3,
    datetime: "Nov 11, 25",
    content:
      "porro, velit et aut odio recusandae. Autem reprehenderit eaque optio voluptatem, temporibus ipsum",
  },
  {
    id: 4,
    datetime: "Nov 11, 25",
    content:
      "porro, velit et aut odio recusandae. Autem reprehenderit eaque optio voluptatem, temporibus ipsum",
  },
  {
    id: 5,
    datetime: "Nov 11, 25",
    content:
      "porro, velit et aut odio recusandae. Autem reprehenderit eaque optio voluptatem, temporibus ipsum",
  },
  {
    id: 6,
    datetime: "Nov 11, 25",
    content: "porro, velit et aut odio recusandae. Autem reprehend",
  },
  {
    id: 7,
    datetime: "Nov 11, 25",
    content:
      "porro, velit et aut odio recusandae. Autem reprehenderit eaque optio voluptatem, temporibus ipsum",
  },
  {
    id: 8,
    datetime: "Nov 11, 25",
    content:
      "porro, velit et aut odio recusandae. Autem reprehenderit eaque optio voluptatem, temporibus ipsum",
  },
];

app.get("/", (req, res) => {
  res.render("book.ejs", {
    book: books[0],
    title: "Home",
    message: "Working",
    notes: notes,
  });
});

app.post("/add-new-note", async (req, res) => {
  const content = req.body.content;
  const bookId = req.body.bookId;

  try {
    const result = await db.query(
      "INSERT INTO notes (content, datetime, book_id) VALUES ($1, NOW(), $2)",
      [content, bookId]
    );
    items = result.rows;
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
