const path = require('path');

const CERT_PATH = path.join(__dirname, 'certs');
const DEVICE_ID = 'ABC';
const HOST = 'XYZ.iot.us-east-1.amazonaws.com';

const CLIENT_ID = 'Motor';

const shadowConfig = {
   keyPath: path.join(CERT_PATH, `${DEVICE_ID}-private.pem.key`),
  certPath: path.join(CERT_PATH, `${DEVICE_ID}-certificate.pem.crt`),
    caPath: path.join(CERT_PATH, 'root-certificate.pem'),
  clientId: CLIENT_ID,
      host: HOST
};

export default shadowConfig;
