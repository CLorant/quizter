const { validationResult } = require('express-validator');
const User = require('../../../middleware/mongodb');
const { mailSend } = require('../mail/mail');
const passport = require('passport');
require("dotenv").config;
//Felhasználó regisztráció
//Regisztráció előtt megvizsgálja hogy az AdatB-ben van-e olyan regisztráló email
//Utána pedig megvizsgálja middleware segítségével, hogy ross az adat felvétel
exports.createUser = (async(req, res) => {
  const emailvalid = await User.findOne({email: req.body.email});
  if(!validationResult(req).isEmpty()) {console.log(validationResult(req).formatWith(({ msg }) => msg).mapped()); return res.json(validationResult(req).formatWith(({ msg }) => msg).mapped())};
    User.register(new User({username: req.body.username, email: req.body.email}), `${req.body.password}`, function (err, user){
      if (err)
      {
        let errormsg = 
        err.message=="Foglalt felhasználónév" && emailvalid ? {"felhasznalo":err.message, "email":"Foglalt email"} :
        emailvalid ? {"email":"Foglalt email"} : null
        res.send(errormsg || {"felhasznalo":err.message});
      }
      else {
      passport.authenticate("local")(req, res, function(){
          mailSend(req, res);
          return res.json("Sikeres regisztráció, hitelesítse az email címét belépés előtt!");
      })};
      });
    });