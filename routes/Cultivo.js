import express from 'express';
import { db } from '../app.js';  // Importa la conexión a la base de datos

const router = express.Router();

router.get('/cultivos', (req, res) => {
    const query = `
        SELECT 
    cultivos.id, 
    cultivos.nombre, 
    cultivos.descripcion, 
    cultivos.fecha_siembra, 
    cultivos.fecha_cosecha, 
    fincas.nombre as 'finca'
    FROM 
        cultivos 
    INNER JOIN 
        fincas ON cultivos.finca_id = fincas.id;

    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ message: 'Error en la consulta a la base de datos' });
        }

        res.json(results);
    });
});


//ruta para creación de cultivos
router.post('/cultivos/create', (req, res) => {
    const { nombre, descripcion, fecha_siembra, fecha_cosecha, finca_id } = req.body;  // Recibe el nombre del rol desde el cuerpo de la solicitud

    // Consulta para insertar un nuevo rol en la tabla roles
    const craateCultivoQuery = `
        INSERT INTO fincas (nombre, descripcion, fecha_siembra, fecha_cosecha, finca_id) VALUES (?, ?, ?, ?, ?);
    `;

    db.query(craateCultivoQuery, [nombre, descripcion, fecha_siembra, fecha_cosecha, finca_id], (err, result) => {
        if (err) {
            console.error('Error al crear la finca:', err);
            return res.status(500).json({ message: 'Error al crear el cultivo' });
        }

        // Si el rol se ha creado exitosamente
        res.status(201).json({ message: 'Cultivo creado exitosamente', cultivoId: result.insertId });
    });
});


/* ruta para editar cultivos */
router.get('/cultivos/:id', (req, res) => {
    const cultivoId = req.params.id;

    const query = `SELECT * FROM cultivos WHERE id = ?`
    db.query(query, [cultivoId], (err, result) => {
        if (err) {
            console.error('Error al obtener el cultivo:', err);
            return res.status(500).json({ message: 'Error al obtener el cultivo' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Cultivo no encontrado' });
        }

        res.status(200).json(result[0]);
    });
});

/* ruta para actualizar */
router.put('/cultivos/:id', (req, res) => {
    const cultivoId = req.params.id;
    const { nombre, descripcion, fecha_siembra, fecha_cosecha, finca_id } = req.body;

    // Consulta para actualizar la tabla "personas"
    const queryCultivo = `
        UPDATE cultivos 
        SET nombre = ?,
        descripcion = ?,
        fecha_siembra = ?,
        fecha_cosecha = ?,
        finca_id = ?
        WHERE id = ?
    `;

    // Actualizar la tabla "users" después de actualizar "personas"
    db.query(queryCultivo, [nombre, descripcion, fecha_siembra, fecha_cosecha, finca_id, cultivoId], (err, result) => {
        if (err) {
            console.error('Error al actualizar el rol:', err);
            return res.status(500).json({ message: 'Error al actualizar el cultivo' });
        }

        res.status(200).json({ message: 'Cultivo actualizado correctamente' });
    });

});

//delete rol
router.delete('/cultivos/:id', (req, res) => {
    const { id } = req.params;

    // Primero elimina el registro de la tabla personas
    const deleteQuery = 'DELETE FROM cultivos WHERE id = ?';

    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el cultivo:', err);
            return res.status(500).json({ message: 'Error al eliminar el cultivo' });
        }
        res.status(200).json({ message: 'Cultivo eliminado exitosamente' });
    });

});

export default router;
