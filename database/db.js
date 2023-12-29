const mysql = require('mysql');
const conexion = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'binex_db'  
});
conexion.connect((error) => {
  if (error) {
      console.error('Error de conexión:', error.code); 
      console.error(error); 
      return;
  }
  console.log('¡Conectado a la Base de Datos!');
});

module.exports = conexion;