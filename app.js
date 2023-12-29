const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors());
app.use('/', require('./router'));
app.use(express.static('public'));
app.use('/pdfs', express.static(path.join(__dirname, 'PDF_BINEX')));

// Configuración de certificado y clave
const certificatePath = './certificate.pem';
const privateKeyPath = './private-key.pem';
const credentials = {
  key: fs.readFileSync(privateKeyPath),
  cert: fs.readFileSync(certificatePath),
};

// Crear servidor HTTPS en el puerto 443
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log('HTTPS SERVER Running in https://localhost:443');
});
