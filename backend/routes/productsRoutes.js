const express = require("express");
const router = express.Router();
const pool = require("../db"); //conexión centralizada

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, description, price, created_at FROM products ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "El nombre y el precio son obligatorios" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING id, name, description, price, created_at",
      [name, description, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al agregar producto:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Actualizar producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING id, name, description, price, created_at",
      [name, description, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING id", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente", id: result.rows[0].id });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
