const express = require('express'); // Fast & Minimalistic web framework, for our API
const morgan = require('morgan'); //HTTP Request Logger
const helmet = require('helmet'); // Secures Express based apps/api's
const cors = require('cors'); // Cross-Origina Resource Sharing option treater
const path = require('path'); // As the name suggests, handles the "paths" for files
const middlewares = require('./../middleware/middlewares') // Handles bad status codes
require('dotenv').config(); // File which can be plugged in and out, best thing of Node.Js
const bodyParser = require('body-parser'); 
const urlencodedParser = bodyParser.urlencoded({ extended: false }); // Uses other parse method (querystring)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const db = require('mongoose');
const { createUser } = require('./routes/auth/register');
const { RegisterValidation, ChangePWValidation } = require('./routes/auth/validation');
const { checkAuthentication, isAdmin, checkAuthForGameSession} = require('./routes/auth/auth');
const { felhasznalokep, kerdeskep } = require('./routes/imgstorage/storage');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const User = require('./../middleware/mongodb');
const Kerdeseks = require('./../middleware/kerdesek');
const Rekordok = require('./../middleware/rekordok');
const { KerdesValasz, RunningGameSessionQuestions } = require('./routes/cruds/kerdesvalasz');
const { getUserByName, updateUserPage, deleteUser, getUsers, SendUser } = require('./routes/cruds/userprofilcrud');
const { createQuestion, getQuestionImage, updateQuestion, deleteQuestion, getQuestion, getQuestions } = require('./routes/cruds/questioncrud');
const { getLeaderboard, UpdateRecord } = require('./routes/cruds/leaderboard');
const { ResetPasswordMail, UpdatePW, CheckPWToken } = require('./routes/mail/resetpw');

const app = express(); // The core of the whole program
app.use(morgan('dev')); // Külső elérést kezelő logger
app.use(cors(
  {origin: true,
  credentials: true,
}
))

app.use(express.json()); // Apink formázása
app.use(
  helmet.contentSecurityPolicy({ //CORS
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
      "connect-src":["'self'", "https: data"],
      "script-src":["'self'", "https: data"]
    }
  })
)

//Cookie Session-höz ha volna, de már irreleváns, minden restartnál más kulcs aláírást kap a cookie
const secret2 = crypto.randomBytes(20).toString("hex");
//Default path-je mikor az URL-t eléred
app.set('views', path.join(__dirname, './../views'));
app.use(bodyParser.json()); //Body-ban lévő adatokat (Ami JSON szintaxist követ) letudja formázni/elemezni és értelmezni.
app.use(bodyParser.urlencoded({ extended: true })); // All incoming data/parameter goes through this, and parses them (qs library / application/x-www-form-urlencoded)
app.use(cookieParser(secret2));
//Komplett agyfasz megtesítője a Passport & Express session, kurvára nincs szükségünk Cookie-ra csak kötött a Passport működése, enélkül error-t dob
app.use(session({
  secret: secret2,
  store: new MemoryStore({
    checkPeriod: 0
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 0, sameSite: 'none', httpOnly: true, secure: true, domain: null},
}));
//Passport inicializálása, hogy kezelni tudja az adatbázis & locális session storaget ((Ami egyáltalán nincs használva, we love Frontend))
app.use(passport.initialize());
app.use(passport.session());
//A user schémához fűződik, minden authentication (avagy login/register) ezt az adatbázis collectiont fogja meghívni, és ki/betölteni a dolgokat
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Public mappa tartalma elérhető kívülről
app.use(express.static(__dirname + './../views'));;

//DB testvérem
db.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((result) => console.log('Connected to DB'))
  .catch((err) => console.log(err));

//Ranglista Top 10
app.get('/getLeaderboard/:tema/:nehezseg', getLeaderboard);
//Konkrétan a reset PW három eljárása, mail küldés -> Check -> Update
app.post('/resetPassword', ResetPasswordMail);
app.post('/rpUpdate', urlencodedParser, ChangePWValidation, UpdatePW);
app.post('/rpCheck/:token', CheckPWToken);
//Név alapján kereső
app.get('/getUser/:nev',getUserByName);
//Regex alapú név keresés (Sajnos nem lehet teljes a MongoDB syntax/implementáció hiányossága miatt)
app.get('/getUsers/:nev', getUsers);
//Kérdés listához kell
app.get('/getQuestions/:tema/:nehezseg', checkAuthentication, isAdmin, getQuestions);
//MongoDB-ben a kerdes_id-t megkeresi és visszaadja frontend
app.get('/getQuestion/:k_id',checkAuthentication, isAdmin, getQuestion);
//Kérdés Válasz (never open kerdesvalasz.js, ever)
app.get('/getGameQuestions/:tema/:nehezseg/:kerdesszam/:valaszszam', checkAuthForGameSession, KerdesValasz);
//User gamesession kérdés fetch
//app.get('/getGameSession', checkAuthentication, RunningGameSessionQuestions)
//Profil Oldal update
app.patch('/updateUserPage', checkAuthentication, felhasznalokep.single(`file`), updateUserPage);
//Felhasználó törlés
app.delete('/deleteUserPage', checkAuthentication, deleteUser);
//User Rekord feltöltése & babrálása 
app.patch('/updateUserRecord', checkAuthentication, UpdateRecord);
//Kérdés felvétele, req.body.kerdes alapján vizsgál, ha talál hasonló szövegű kérdést nem viszi fel
app.post('/createQuestion', checkAuthentication, isAdmin, kerdeskep.single(`file`), getQuestionImage, createQuestion);
//Kérdés update, képet is lehet benne változtatni gyönyörűen (temp fájllal cseréljük a meglévőt)
app.patch('/updateQuestion', checkAuthentication, isAdmin, kerdeskep.single(`file`), updateQuestion);
//Kérdés törlés, note: Ne vedd ki a kerdeskep eljárást vagy pofánszarja a req.body-ban lévő formod a túl sok adat manipulálástól, és functionbe ágyazni tudod kifogja :)))))) 
app.delete('/deleteQuestion/:k_id', checkAuthentication, isAdmin, deleteQuestion);

//Tömör kód, röviden: Passport megvizsgálja hogy a MongoDB-ben tárolt user & salt+hash kombó megfelel a bekért auth adatokkal
//Ha ez megfelel, de nincs hitelesítve az email akkor visszadobja, egyébként megkap egy user objektumot(senduser.js-ben található felépítésből) a frontend
//Frontend: Cookie-ba rakja az "auth_token"-t és mindig Bearer Auth flagbe küldi vissza a backendnek minden secured útvonalnál ahova kötelező a hitelesítés
app.post('/login', urlencodedParser,passport.authenticate('local'), function(req, res)
  {if(!req.user.auth){res.send("Hitelesítsd az emailed bejelentkezés előtt!");}
  else SendUser(req, res); 
});

//Regisztrációs form setup: express-validator feltételek elején(Amit async-en belül a validationResult ellenőriz) => Check Existing Users => Inserts New User
app.post('/register', urlencodedParser, RegisterValidation, createUser);

//Frontend: Token Autologin, egyébként soha nem hívja meg ezt, ha rossz akkor "Unauthorized"
app.get('/tokenlogin', checkAuthentication, function (req,res){SendUser(req, res)});

//Backend: Az adatbázisban kikeresi a params-ban lévő Tokent, és ha talál akkor az Email Hitelesítőt megerősíti (azzal hogy az auth-ot true értékre állítja MongoDB-ben)
app.get('/token/:token', async function(req, res){
    await User.findOneAndUpdate({token: `${req.params.token}`},{ "$set": {"auth": true, "token":''}},{new: true}).then(user =>{
    if (!user) res.redirect(process.env.HOST_URL+":5173/regisztracio");
    else res.redirect(process.env.HOST_URL+":5173/bejelentkezes")
    }).catch();
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
module.exports = app;
