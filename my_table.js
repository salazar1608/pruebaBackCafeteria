const express = require('express');

function myTableRouter(pool) {
    const router = express.Router();

    // AGREGAR NUEVA COMPRA
    router.post('/nombres', async (req, res) => { // Cambia '/my_table' a '/'
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).send('El campo nombre es obligatorio');
        }

        try {
            const result = await pool.query(
                'INSERT INTO my_table (nombre) VALUES ($1) RETURNING *;',
                [nombre]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al insertar en my_table: ' + err.message);
        }
    });

    // OBTENER TODAS LAS ENTRADAS DE my_table
    router.get('/nombres', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM my_table;'); 
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al consultar la base de datos my_table');
        }
    });

    return router;
}

module.exports = myTableRouter;
