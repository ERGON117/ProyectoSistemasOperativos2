const pool = require('../db');

exports.login = async (req, res) => {
  const { email, password_hash } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email=$1 AND password_hash=$2',
      [email, password_hash]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    
    res.json({
      message: 'Login exitoso',
      user: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
