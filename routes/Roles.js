// routes/Users.js
import express from 'express';
import { db } from '../app.js';  // Importa la conexión a la base de datos

const router = express.Router();

router.get('/roles', (req, res) => {
    const query = `SELECT id, rol  FROM roles`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ message: 'Error en la consulta a la base de datos' });
        }

        res.json(results);
    });
});


//ruta para creación de roles
router.post('/roles/create', (req, res) => {
    const { rol } = req.body;  // Recibe el nombre del rol desde el cuerpo de la solicitud

    // Consulta para insertar un nuevo rol en la tabla roles
    const createRoleQuery = `
        INSERT INTO roles (rol) VALUES (?);
    `;

    db.query(createRoleQuery, [rol], (err, result) => {
        if (err) {
            console.error('Error al crear el rol:', err);
            return res.status(500).json({ message: 'Error al crear el rol' });
        }

        // Si el rol se ha creado exitosamente
        res.status(201).json({ message: 'Rol creado exitosamente', rolId: result.insertId });
    });
});

export default router;
