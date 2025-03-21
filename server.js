require("dotenv").config();
const express = require("express");
const initDB = require("./core/db/initDB");

const app = express();
const port = process.env.PORT || 3000;

// init DB
initDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
