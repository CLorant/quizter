const db = require('mongoose'),
Schema = db.Schema;
//Rekordok collection meghatározása
require("dotenv").config;
  const Rekordok = Schema({
        username: String,
        rekord: {
            pontszam: Number,
            helyesHelytelen: String,
            tema: String,
            nehezseg: String,
            ido: String,
            kerdesSzam: Number,
            valaszSzam: Number,
        },
});
module.exports = db.model('Rekordok', Rekordok, 'rekordoks'); //Definiálása adatbázisban