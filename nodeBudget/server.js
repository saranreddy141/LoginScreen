const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT, email TEXT, password TEXT)"
  );
});

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  let dbData = `select * from users where email = ${email} or username = ${username}`;

  db.run(dbData, (err, data) => {
    dbData = "";
    if (err) {
      console.log(err);
    } else {
      dbData = data;
    }
  });

  const emailRegex =
    /^[a-zA-Z0-9_]([\.-]?[a-zA-Z0-9_])*@[a-zA-Z0-9_]([\.-]?[a-zA-Z0-9_])*(\.[a-zA-Z0-9_]{2,})+$/;

  if (email && email.match(emailRegex) && username && password && !dbData) {
    const sql = "INSERT INTO users (username,email, password) VALUES (?, ?, ?)";
    db.run(sql, [username, email, password], (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user" });
      } else {
        res
          .status(200)
          .json({ message: "Registered successfully", status: "ok" });
      }
    });
  } else if (!username || dbData) {
    res.status(400).json({
      message: "Please enter valid username or username already exist",
    });
  } else if (!password) {
    res.status(400).json({
      message: "Please provide password",
    });
  } else {
    res.status(400).json({
      message: "Please enter valid email",
    });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const sql =
    "SELECT * FROM users where (email = ? or username = ? )and password=?";
  db.get(sql, [username, username, password], async (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error logging in" });
    } else if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      res
        .status(200)
        .json({ user, message: "Login Successfully", status: "ok" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
