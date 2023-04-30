const db = require('mongoose'),
Schema = db.Schema;
const crypto = require('crypto');
const passportLocalMongoose = require('passport-local-mongoose');

require("dotenv").config;

//User adatbázis meghatározása
const User = Schema({
    username:  { type: String, required: true},
    name: {type: String, default: "Quizter Felhasználó"},
    kep: {type: String, default: "/felhasznalokep/default-user.webp"},
    email: { type: String, required: true, unique: true, sparse: true},
    xp : {type: Number, default: 0},
    csatlakozas: { type: Date, default: Date.now },
    jatszmaSzam: {type: Number, default: 0},
    valaszIdo:{type: Number, default: 0},
    kedvencTemak: {
        tema1: {type: String, default: "default"},
        tema2: {type: String, default: "default"},
        tema3: {type: String, default: "default"},
    },
    bio: {type: String, default: "Quizter felhasználó"},
    rekord: {
      pontszam: {type: Number, default: 0},
      helyesHelytelen: {type: String, default: "0 / 0"},
      tema: {type: String, default: 0},
      nehezseg: {type: String, default: 0},
      ido: {type: String, default: 0},
      kerdesSzam: {type: Number, default: 0},
      valaszSzam: {type: Number, default: 0},
    },
    tiltasok: {
      figyelmeztetett: {type: Boolean, default: false},
      tiltot: {type: Boolean, default: false},
    },
    auth: { type: Boolean, default: false},
    auth_token: { type: String, default: crypto.randomBytes(1024).toString("hex")},
    roles: { type: String, default: 'felhasznalo'},
    token: {type: String, default: crypto.randomBytes(64).toString("hex")},
    pwchange_token: {type: String, default: ''}
  });

  var options = {
    errorMessages: {
        MissingPasswordError: 'Nincs jelszó megadva!',
        AttemptTooSoonError: 'A felhasználó jelenleg zárolva, próbálja később!',
        TooManyAttemptsError: 'A felhasználó zárolásra került több hibás kérés által!',
        NoSaltValueStoredError: 'Authentikáció nem lehetséges, a "salt" nincs tárolva!',
        IncorrectPasswordError: 'Név vagy Jelszó helytelen',
        IncorrectUsernameError: 'Név vagy Jelszó helytelen',
        MissingUsernameError: 'Nincs felhasználó név megadva',
        UserExistsError: 'Foglalt felhasználónév'
    }
  };
  
User.plugin(passportLocalMongoose, options); //Loginért felelős plugin, auto nézi a hash/saltot loginnál és regisztrációnal unique-t generál

module.exports = db.model('User', User, 'users') //Definiálása adatbázisban

