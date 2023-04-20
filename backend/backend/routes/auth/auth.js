const User = require('../../../middleware/mongodb');
//A header-ből lévő bearelt tokent leformázza, és DB-ben megkeresi kivel egyezik ez, ha nincs user vagy a user még nem hitelesítette az emailt akkor "Unathorized" hibát dob
exports.checkAuthentication = ((req,res,next) => {
    if(req.headers.authorization)
    {
        const token = req.headers.authorization.split(' ')[1]
        User.findOne({auth_token: `${token}`}).exec(function(err, user) {if (!user || !user.auth) {res.sendStatus(401)} else{req.user = user; next()}});
    } 
    else res.sendStatus(401);
});

//Same kód mint a felső, de viszont EZ CSAKIS game sessionnél lép érvénybe, ha van felhasználó akkor lefetcheli a user nevet 
exports.checkAuthForGameSession = ((req,res,next) => {
    if(req.headers.authorization)
    {
        const token = req.headers.authorization.split(' ')[1]
        User.findOne({auth_token: `${token}`}).exec(function(err, user) {if (!user || !user.auth) {res.sendStatus(401)} else{req.user = user; next()}});
    } 
    else next();
});
//MINDIG CheckAuthentication-el használható, ÉS CSAKIS AZUTÁN HÍVHATO MEG EZ (ahogy az összes függvény is ami "user"-t vizsgál), szimpla role vizsgáló
exports.isAdmin = ((req, res, next) => {
    if (req.user.roles == 'admin'){ next(); }
    else res.sendStatus(401);  
 });