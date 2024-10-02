const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Asegúrate de requerir cors
const app = express();
const PORT = process.env.PORT || 3000;

const routerMyTable = require('./my_table'); // Renombrar a camelCase es más común

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos usando las variables de entorno de Render
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

// Usa el router para manejar las rutas de my_table
app.use('/data', routerMyTable(pool));

// Ruta para consultar datos de la base de datos (opcional, ya que se maneja en el router)
app.get('/connect', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM my_table;'); 
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
