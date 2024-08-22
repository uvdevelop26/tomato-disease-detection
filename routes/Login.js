// routes/login.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../app.js';

const router = express.Router();

router.post('/login', (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    db.query('SELECT * FROM users WHERE correo = ?', [correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ message: 'Error en la consulta a la base de datos' });
        }

        if (results.length > 0) {
            const user = results[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error al comparar las contraseñas:', err);
                    return res.status(500).json({ message: 'Error al comparar las contraseñas' });
                }

                if (isMatch) {
                    const token = jwt.sign(
                        { id: user.id, correo: user.correo },
                        process.env.JWT_SECRET || 'secretKey',
                        { expiresIn: '1h' }
                    );
                    res.json({ token });
                } else {
                    res.status(400).json({ message: 'Contraseña incorrecta' });
                }
            });
        } else {
            res.status(400).json({ message: 'Usuario no encontrado' });
        }
    });
});

export default router;
