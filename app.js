import { time } from "console";
import express from "express";
import path from "path";
import pg from "pg";
import { title } from "process";
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

app.get("/", async (req, res) => {
  let books = [];
  try {
    const result = await db.query("SELECT * FROM books");
    books = result.rows;
  } catch (e) {
    console.log(e);
  }

  res.render("index.ejs", {
    books: books,
    title: "Home",
  });
});

async function fetchBook(id) {
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    let book = result.rows[0];
    return book;
  } catch (e) {
    console.log(e);
  }
}

async function fetchNotes(book_id) {
  try {
    const result = await db.query("SELECT * FROM notes WHERE book_id = $1", [
      book_id,
    ]);
    let notes = result.rows;
    return notes;
  } catch (e) {
    console.log(e);
  }
}
app.get("/book/:id", async (req, res) => {
  const bookId = req.params.id;
  const book = await fetchBook(bookId);
  const notes = await fetchNotes(bookId);

  res.render("book.ejs", { book: book, notes: notes, title: "Book" });
});

app.get("/add-book", (req, res) => {
  res.render("add-book.ejs", { title: "Add new book" });
});

app.post("/add-book", async (req, res) => {
  const title = req.body.title;
  const isbn = req.body.isbn;
  const rating = req.body.rating;
  const description = req.body.description;

  try {
    const result = await db.query(
      'INSERT INTO books (title, isbn, "date", rating, des) VALUES ($1, $2, CURRENT_DATE, $3, $4)',
      [title, isbn, rating, description]
    );
    items = result.rows;
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
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
