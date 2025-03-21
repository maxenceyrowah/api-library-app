const express = require("express");

const Book = require("../models/Book");
const router = express.Router();

// Récupérer tous les livres
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author");
    res.json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ajouter un livre
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer un livre avec son auteur
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) return res.status(404).json({ error: "Livre non trouvé" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mettre à jour un livre
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ error: "Livre non trouvé" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer un livre
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Livre non trouvé" });
    res.json({ message: "Livre supprimé" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// suprimer un livre et l'auteur lié a ace livre
router.delete("/:id/author", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Livre non trouvé" });
    await Author.findByIdAndDelete(book.author);
    res.json({ message: "Livre et auteur supprimés" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// suprimer un livre d'un auteur dont l'anne de publication donner par l'utilisateur est superieur a 2000
router.delete("/:id/author/:year", async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Livre non trouvé" });
    }

    if (book.publicationYear > year) {
      await Book.findByIdAndDelete(req.params.id);
      await Author.findByIdAndDelete(book.author);
      return res.json({ message: "Livre et auteur supprimés" });
    }

    res
      .status(400)
      .json({
        message:
          "L'année de publication n'est pas supérieure à l'année spécifiée",
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
