const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// GET - retrieve all movies
app.get("/api/movies", (req, res) => {
    const sql = "SELECT id, title, genre, `year`, status, rating FROM movies ORDER BY id";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(results);
    });
});

// POST - add a movie
app.post("/api/movies", (req, res) => {
    const { title, genre, year, status, rating } = req.body;
    const validStatuses = ["Plan to Watch", "Watching", "Completed"];

    if (!title || !genre || !year || !validStatuses.includes(status)) {
        return res.status(400).json({ message: "Missing or invalid fields" });
    }

    const sql = "INSERT INTO movies (title, genre, `year`, status, rating) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [title, genre, year, status, Number(rating) || 0], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Movie added successfully", id: result.insertId });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});