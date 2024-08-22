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


//ruta para creación de roles
router.post('/cultivos/create', (req, res) => {
    const { nombre, descripcion , fecha_siembra, fecha_cosecha, finca_id } = req.body;  // Recibe el nombre del rol desde el cuerpo de la solicitud

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

export default router;
