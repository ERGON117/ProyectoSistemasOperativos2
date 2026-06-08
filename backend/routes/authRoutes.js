const express = require("express");
const router = express.Router();
const pool = require("../db");

// Login (texto plano)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = result.rows[0];

    // Comparación directa de texto plano
    if (password !== user.password_hash) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // No devolver el hash al frontend
    const { password_hash, ...userData } = user;
    res.json(userData);
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
