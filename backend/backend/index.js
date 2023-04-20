const app = require('./app');
const fs = require('fs');
const https = require('https');
const http = require('http');
const port = process.env.PORT || 2000;

//SSL Kulcsok
const httpsOptions = {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.pem')
}

//Szerver indító, beolvassa a kulcsot + ssl certificatet, majd utána az app.listen-t meghívja
const server = https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log(`Listening: ${process.env.HOST_URL}:${port}`)
    })