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

/* ruta para editar roles */
router.get('/roles/:id', (req, res) => {
    const userId = req.params.id;

    const query = `SELECT * FROM roles WHERE id = ?`
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error al obtener el rol:', err);
            return res.status(500).json({ message: 'Error al obtener el rol' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json(result[0]);
    });
});

/* ruta para actualizar */
router.put('/roles/:id', (req, res) => {
    const roleId = req.params.id;
    const { rol } = req.body;

    // Consulta para actualizar la tabla "personas"
    const queryRol = `
        UPDATE roles 
        SET rol = ?
        WHERE id = ?
    `;

    // Actualizar la tabla "users" después de actualizar "personas"
    db.query(queryRol, [rol, roleId], (err, result) => {
        if (err) {
            console.error('Error al actualizar el rol:', err);
            return res.status(500).json({ message: 'Error al actualizar el rol' });
        }

        res.status(200).json({ message: 'Rol actualizado correctamente' });
    });

});

//delete rol
router.delete('/roles/:id', (req, res) => {
    const { id } = req.params;

    // Primero elimina el registro de la tabla personas
    const deleteQuery = 'DELETE FROM roles WHERE id = ?';

    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el rol:', err);
            return res.status(500).json({ message: 'Error al eliminar el rol' });
        }
        res.status(200).json({ message: 'Rol eliminados exitosamente' });
    });

});

export default router;
