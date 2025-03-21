const express = require("express");

const Author = require("../models/Author");
const router = express.Router();

// récupérer tous les auteurs
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// récupérer un auteur
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// créer un auteur
router.post("/", async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
