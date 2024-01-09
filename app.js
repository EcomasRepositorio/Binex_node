const express = require('express');
const cors = require('cors');
const http = require('https'); // Cambiado a HTTP en lugar de HTTPS
const fs = require('fs'); 
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors()); 
app.use('/', require('./router'));
app.use(express.static('public'));
app.use('/pdfs', express.static(path.join(__dirname, 'PDF_BINEX')));

// // Configuración de certificado y clave (COMENTADO)
const certificatePath = '/etc/letsencrypt/live/www.binex.edu.pe/fullchain.pem';
const privateKeyPath = '/etc/letsencrypt/live/www.binex.edu.pe/privkey.pem';
const credentials = {
   key: fs.readFileSync(privateKeyPath),
   cert: fs.readFileSync(certificatePath),
 };

// Crear servidor HTTP (cambiado de HTTPS a HTTP)
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(5000, () => {
  console.log('HTTPS SERVER Running in https://localhost:5000');
});
