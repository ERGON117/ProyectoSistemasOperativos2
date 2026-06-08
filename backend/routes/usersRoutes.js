const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, created_at FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Crear nuevo usuario (RESTful: POST /api/users)
router.post("/", async (req, res) => {
  const { username, email, password_hash } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, password_hash]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password_hash } = req.body;
  try {
    let query, values;

    if (password_hash) {
      query =
        "UPDATE users SET username = $1, email = $2, password_hash = $3 WHERE id = $4 RETURNING id, username, email, created_at";
      values = [username, email, password_hash, id];
    } else {
      query =
        "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email, created_at";
      values = [username, email, id];
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado correctamente", id: result.rows[0].id });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
