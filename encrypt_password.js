import bcrypt from 'bcrypt';

const saltRounds = 10;
const plainPassword = '123456'; // Cambia esto por la contraseña que deseas encriptar

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Contraseña encriptada:', hash);
});
