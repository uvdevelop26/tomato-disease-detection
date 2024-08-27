// routes/Users.js
import express from 'express';
import { db } from '../app.js';  // Importa la conexión a la base de datos

const router = express.Router();

router.get('/fincas', (req, res) => {
    const query = `SELECT id, nombre, ubicacion, contacto FROM fincas`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ message: 'Error en la consulta a la base de datos' });
        }

        res.json(results);
    });
});


//ruta para creación de roles
router.post('/fincas/create', (req, res) => {
    const { nombre, ubicacion, contacto } = req.body;

    // Consulta para insertar un nuevo cultivo en la tabla cultivos
    const createFincaQuery = `
        INSERT INTO fincas (nombre, ubicacion, contacto) 
        VALUES (?, ?, ?);
    `;

    db.query(createFincaQuery, [nombre, ubicacion, contacto], (err, result) => {
        if (err) {
            console.error('Error al crear la finca:', err);
            return res.status(500).json({ message: 'Error al crear la finca' });
        }

        // Si el cultivo se ha creado exitosamente
        res.status(201).json({ message: 'finca creado exitosamente', cultivoId: result.insertId });
    });
});

/* ruta para editar roles */
router.get('/fincas/:id', (req, res) => {
    const userId = req.params.id;

    const query = `SELECT * FROM fincas WHERE id = ?`
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error al obtener la finca:', err);
            return res.status(500).json({ message: 'Error al obtener la finca' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Finca no encontrada' });
        }

        res.status(200).json(result[0]);
    });
});

/* ruta para actualizar */
router.put('/fincas/:id', (req, res) => {
    const fincaId = req.params.id;
    const { nombre, ubicacion, contacto } = req.body;

    // Consulta para actualizar la tabla "personas"
    const queryFinca = `
        UPDATE fincas 
        SET nombre = ?,
        ubicacion = ?,
        contacto = ?
        WHERE id = ?
        `;

    // Actualizar la tabla "users" después de actualizar "personas"
    db.query(queryFinca, [nombre, ubicacion, contacto, fincaId], (err, result) => {
        if (err) {
            console.error('Error al actualizar la finca:', err);
            return res.status(500).json({ message: 'Error al actualizar la finca' });
        }

        res.status(200).json({ message: 'Finca actualizada correctamente' });
    });

});

//delete finca
router.delete('/fincas/:id', (req, res) => {
    const { id } = req.params;

    // Primero elimina el registro de la tabla personas
    const deleteQuery = 'DELETE FROM fincas WHERE id = ?';

    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la finca:', err);
            return res.status(500).json({ message: 'Error al eliminar la finca' });
        }
        res.status(200).json({ message: 'finca eliminada exitosamente' });
    });

});



export default router;
