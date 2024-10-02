const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos usando las variables de entorno de Render
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  

// Ruta para consultar datos de la base de datos
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM my_table;'); // Cambia 'my_table' por tu tabla
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});


