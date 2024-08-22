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
// Ruta para crear un nuevo cultivo (corregida)
router.post('/cultivos/create', (req, res) => {
    const { nombre, descripcion, fecha_siembra, fecha_cosecha, finca_id } = req.body;

    // Consulta para insertar un nuevo cultivo en la tabla cultivos
    const createCultivoQuery = `
        INSERT INTO cultivos (nombre, descripcion, fecha_siembra, fecha_cosecha, finca_id) 
        VALUES (?, ?, ?, ?, ?);
    `;

    db.query(createCultivoQuery, [nombre, descripcion, fecha_siembra, fecha_cosecha, finca_id], (err, result) => {
        if (err) {
            console.error('Error al crear el cultivo:', err);
            return res.status(500).json({ message: 'Error al crear el cultivo' });
        }

        // Si el cultivo se ha creado exitosamente
        res.status(201).json({ message: 'Cultivo creado exitosamente', cultivoId: result.insertId });
    });
});


export default router;
