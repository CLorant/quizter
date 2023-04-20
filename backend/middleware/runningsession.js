const db = require('mongoose'),
Schema = db.Schema;
//Runningsession collection meghatározása
require("dotenv").config;
  const Runningsession = Schema({
        username: String,
        pontszam: Number,
        helyes: Number,
        helytelen: Number,
        tema: String,
        nehezseg: String,
        ido: Number,
        kerdesSzam: Number,
        valaszSzam: Number,
});
module.exports = db.model('Runningsession', Runningsession, 'runningsessions'); //Definiálása adatbázisban