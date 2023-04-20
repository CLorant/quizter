const db = require('mongoose'),
Schema = db.Schema;
require("dotenv").config;
//Tempstorage collection meghatározása
  const Tempstorage = Schema({
        username: String,
        kerdes: String,
        kep: String,
        valasz1: String,
        valasz2: String,
        valasz3: String,
        valasz4: String,
        valasz5: String,
        valasz6: String,
        nehezseg: String,
        tema: String,
        kerdes_id: String,
});
module.exports = db.model('Tempstorage', Tempstorage, 'tempstorages'); // //Definiálása adatbázisban