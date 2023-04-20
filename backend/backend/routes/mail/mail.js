const { client } = require('../../../middleware/nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
//Szimpla Email hitelesítő kiküldése, a Handlebar-al kiforgatjuk a HTML tagokba lévő paramétereket a replacements-ből
//Note: Csakis Google SMTP-vel teszteltem, azzal gyönyörűen működött, ha SMTP-t váltasz nodemailer.js-be turkálj
exports.mailSend = (async(req, res) => {
        const filePath = path.join(__dirname, './email_hu.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        var template = handlebars.compile(source);
        var replacements = {
             felhasznalo: `${req.user.username}`,
             token: `${process.env.HOST_URL}:${process.env.PORT || 2000}` + '/token/' + `${req.user.token}`,
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: `${process.env.GM_USER}`,
              to: `${req.user.email}`, 
              subject: 'Quizter regisztráció hitelesítés',
              html: htmlToSend
         };
        client.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            }
        });
        });