const multer = require("multer");
const Kerdesek = require("../../../middleware/kerdesek");
const crypto = require('crypto');
//3 különböző storage van definiálva egyes képek tárolására, Ha a kép más formátumban van akkor a Multer elintézi rajta a formázást veszteségmentesen
const felhasznalo = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./views/felhasznalokep");
    },
    filename: function (req, file, cb) {
      cb(null, req.user.username+ ".webp");
    },
  });

const kerdes = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./views/kerdeskep");
    },
    filename: async function (req, file, cb) {
      cb(null, `${crypto.randomBytes(64).toString("hex")}.webp`);
    },
  });

exports.felhasznalokep = multer({storage: felhasznalo});
exports.kerdeskep = multer({storage: kerdes});