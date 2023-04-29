const { check } = require('express-validator');
//Regisztrációnál vizsgálja a bekért adatokat, ha ezeknek a feltételeknek nem felelnek meg akkor ezen hibaüzeneteivel visszadobja.
exports.RegisterValidation = (
[
    check('username').isLength({ min: 3, max:12 }).withMessage("Név legalább 3 karakterből és maximum 12 karakterből áljon!").matches(/^(?=.{3,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/).trim(),
    check('email').isEmail().withMessage("Nem email").normalizeEmail(),
    check('password').isLength({min: 8}).withMessage("Fos a jelszó, 8 karaktert").matches(/\d/).withMessage("Jelszóba legyen 1 szám"),
    check('password2').custom((value, { req, res }) => {if(value !== req.body.password){return false;} return true;}).withMessage("Nem azonos jelszó")
]);
exports.ChangePWValidation = ([
    check('password').isLength({min: 8}).withMessage("Fos a jelszó, 8 karaktert").matches(/\d/).withMessage("Jelszóba legyen 1 szám"),
    check('password2').custom((value, { req, res }) => {if(value !== req.body.password){return false;} return true;}).withMessage("Nem azonos jelszó")
])
