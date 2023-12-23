const mysql = require('mysql');
const conexion = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'Binex_db'  
});
conexion.connect((error) => {
  if (error) {
      console.error('Error de conexión:', error.code); // Agrega la impresión del código de error
      console.error(error); // Muestra el error completo para obtener más detalles
      return;
  }
  console.log('¡Conectado a la Base de Datos!');
});

module.exports = conexion;