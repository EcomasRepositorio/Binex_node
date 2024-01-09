const cors = require('cors');
const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');  // Añadir el middleware Helmet
const app = express();
const path = require('path');

app.use(express.json());

// Habilitar CORS solo para http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Habilitar credenciales (cookies, encabezados, etc.)
}));

// Añadir el middleware Helmet para mejorar la seguridad
app.use(helmet());

app.use('/', require('./router'));
app.use(express.static('public'));
app.use('/pdfs', express.static(path.join(__dirname, 'PDF_BINEX')));

// Configuración de certificado y clave (actualmente para desarrollo)
const certificatePath = process.env.CERTIFICATE_PATH || '/etc/letsencrypt/live/www.binex.edu.pe/fullchain.pem';
const privateKeyPath = process.env.PRIVATE_KEY_PATH || '/etc/letsencrypt/live/www.binex.edu.pe/privkey.pem';

try {
  const privateKey = fs.readFileSync(privateKeyPath);
  const certificate = fs.readFileSync(certificatePath);
  const credentials = { key: privateKey, cert: certificate };

  // Resto del código para la configuración del servidor
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    console.log('HTTPS SERVER Running in https://localhost:443');
  });

} catch (error) {
  console.error('Error during HTTPS server configuration:', error);
}
