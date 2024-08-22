// routes/Users.js
import express from 'express';
import { db } from '../app.js';  // Importa la conexión a la base de datos

const router = express.Router();

router.get('/users', (req, res) => {
    const query = `
        SELECT 
            personas.nombre, 
            personas.apellido,
            personas.dni, 
            personas.telefono, 
            personas.fecha_nacimiento, 
            personas.edad, 
            personas.sexo, 
            personas.direccion, 
            departamentos.nombre AS nombre_departamento, 
            ciudades.nombre AS nombre_ciudad,
            users.correo,
            users.id, 
            roles.rol
        FROM 
            users 
        INNER JOIN 
            personas ON users.id = personas.user_id
        INNER JOIN 
            ciudades ON personas.ciudade_id = ciudades.id
        INNER JOIN 
            departamentos ON ciudades.departamento_id = departamentos.id
        INNER JOIN 
            roles ON users.role_id = roles.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ message: 'Error en la consulta a la base de datos' });
        }

        res.json(results);
    });
});

// Ruta para crear un nuevo usuario y asociarlo con una persona
router.post('/users/create', (req, res) => {
    const { nombre, apellido, dni, telefono, fecha_nacimiento, edad, sexo, ciudade_id, departamento, direccion, correo, password } = req.body;

    // Inicia una transacción
    db.beginTransaction((err) => {
        if (err) {
            console.error('Error iniciando la transacción:', err);
            return res.status(500).json({ message: 'Error iniciando la transacción' });
        }

        // Inserta primero en la tabla users
        const createUserQuery = `
            INSERT INTO users (correo, password, role_id) VALUES (?, ?, ?);
        `;

        db.query(createUserQuery, [correo, password, 1], (err, result) => {
            if (err) {
                db.rollback(() => {
                    console.error('Error al insertar en users:', err);
                    return res.status(500).json({ message: 'Error al crear el usuario' });
                });
            } else {
                // Obtén el ID del usuario insertado
                const userId = result.insertId;

                // Inserta en la tabla personas, utilizando el ID del usuario insertado
                const createPersonQuery = `
                    INSERT INTO personas (nombre, apellido, dni, telefono, fecha_nacimiento, edad, sexo, direccion, user_id, ciudade_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;

                db.query(createPersonQuery, [nombre, apellido, dni, telefono, fecha_nacimiento, edad, sexo, direccion, userId, ciudade_id], (err, result) => {
                    if (err) {
                        db.rollback(() => {
                            console.error('Error al insertar en personas:', err);
                            return res.status(500).json({ message: 'Error al crear la persona' });
                        });
                    } else {
                        // Confirma la transacción
                        db.commit((err) => {
                            if (err) {
                                db.rollback(() => {
                                    console.error('Error al confirmar la transacción:', err);
                                    return res.status(500).json({ message: 'Error al confirmar la transacción' });
                                });
                            }
                            // Éxito: usuario y persona creados
                            res.status(201).json({ message: 'Usuario y persona creados exitosamente' });
                        });
                    }
                });
            }
        });
    });
});



export default router;
