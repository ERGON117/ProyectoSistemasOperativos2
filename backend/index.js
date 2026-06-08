const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());          // habilita CORS
app.use(express.json());  // parsea JSON

// 🔹 Header para identificar la réplica
app.use((req, res, next) => {
  res.setHeader("X-Replica-ID", process.env.REPLICA_ID || "backend-1");
  next();
});

// Importar rutas (solo una vez cada una)
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');

// Usar rutas con prefijo /api
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api', authRoutes); // 👈 aquí estará /api/login y /api/register

//Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Replica ID: ${process.env.REPLICA_ID || "backend-1"}`);
});
