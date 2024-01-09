const mysql = require('mysql');
const conexion = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'binex_data'  
});
conexion.connect((error)=>{
  if (error) {
    console.error('El error de conexión es: ' + error);
    return;
  }
  console.log('¡Conectado a la Base de Datos!');
});
module.exports = conexion;