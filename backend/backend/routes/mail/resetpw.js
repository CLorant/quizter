const { client } = require('../../../middleware/nodemailer');
const User = require('../../../middleware/mongodb');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
//Szimpla Email hitelesítő kiküldése, a Handlebar-al kiforgatjuk a HTML tagokba lévő paramétereket a replacements-ből
//Note: Csakis Google SMTP-vel teszteltem, azzal gyönyörűen működött, ha SMTP-t váltasz nodemailer.js-be turkálj
exports.ResetPasswordMail = (async(req, res) => {
        let pw_id = crypto.randomBytes(32).toString("hex")
        User.findOne({email: req.body.email}).then(async(user) => {if (!user){ return res.send("Nem létező felhasználó!")} 
        User.findOneAndUpdate({username: `${user.username}`},{ "$set": {"pwchange_token":`${user.username+pw_id}`}},{new: true}).then(() => {
        const filePath = path.join(__dirname, './pwemail_hu.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        var template = handlebars.compile(source);
        var replacements = {
             felhasznalo: `${user.username}`,
             token: `${process.env.HOST_URL}:5173` + '/jelszo-visszaallit/' + `${user.username+pw_id}`,
        };
        var htmlToSend = template(replacements);
            let mailOptions = {
                from: `${process.env.GM_USER}`,
                  to: `${req.body.email}`, 
                  subject: 'Quizter elfejtett jelszó',
                  html: htmlToSend,
                  attachments: [
                    {
                        filename:'quizterlogo.png',
                        path:`${__dirname}/quizterlogo.png`,
                        cid:'logo'
                    }
                  ]
             }
            client.sendMail(mailOptions, function (error, response) {
                if (error) {
                    res.send(400);
                }
                else res.send(200);
            });
            })
        }) 
    });
exports.UpdatePW = (async(req, res) => {
    if(!validationResult(req).isEmpty()) {console.log(validationResult(req).formatWith(({ msg }) => msg).mapped()); return res.json(validationResult(req).formatWith(({ msg }) => msg).mapped())};
    User.findOneAndUpdate({pwchange_token: `${req.body.token}`},{ "$set": {"pwchange_token":""}},{new: true})
    .then((user) => {if (!user){ return res.send("Nem létező token")} 
    user.setPassword(req.body.password, async function(err, user){
        if(err) { return res.send(400)}
        await user.save();
     });
     res.send(200)
    })
})
//ember rendesen cringelek pls dont do this
exports.CheckPWToken = (async(req, res) => { User.findOne({pwchange_token: req.body.token}).then((user)=>{if(!user){return res.send(400)} else res.send(200)})})