import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import loginRouter from './routes/Login.js'
import usersRouter from './routes/Users.js';  // Importa el router
import rolesRouter from './routes/Roles.js'
import fincasRouter from './routes/Fincas.js'
import cultivoRouter from './routes/Cultivo.js'


const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con el puerto donde corre tu frontend Vue.js
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions)); 
//app.use(cors());
app.use(express.json());  // Asegúrate de poder parsear JSON en las solicitudes

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_finca'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// No necesitas exportar db en este archivo si solo se usa aquí, pero si lo haces, usa export.
export { db };

// Rutas
app.use('/api', loginRouter); // Usa el router importado
app.use('/api', usersRouter);
app.use('/api', rolesRouter);
app.use('/api', fincasRouter);
app.use('/api', cultivoRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
