const nodemailer = require('nodemailer');
require('dotenv').config();
//Semi-Active kapcsolatot létesít az SMTP szerverrel, jelenesettben a GMAIL-el
exports.client = (nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.GM_USER,
        pass: process.env.GM_PW,
    },
    tls:{
        rejectUnauthorized: false,
    },
}));