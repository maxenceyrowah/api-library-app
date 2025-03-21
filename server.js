require("dotenv").config();
const express = require("express");
const initDB = require("./core/db/initDB");
const authorRoutes = require("./core/routes/author.routes");
const bookRoutes = require("./core/routes/book.routes");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// init DB
initDB();

// init routes
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
