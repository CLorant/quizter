const User = require ('../../../middleware/mongodb');
//Regex(case-insensitive) alapú keresés single user keresés, majd a frontend-nek külön formázva visszaküldi
exports.getUserByName = (async(req, res) => {
    const regex = new RegExp(['^',req.params.nev, '$'].join(""),"i");
        await User.findOne({username: regex}).sort({xp:-1}).exec(function(err, user){
            if (!user){return res.send("Nem létező user!")}
            let felhasznalo = {
                felhasznalonev: user.username,
                csatlakozas: user.csatlakozas,
                jogosultsag: user.roles,
                jellemzok: {
                  kep: `${process.env.HOST_URL}`+`:${process.env.PORT||2000}`+`${user.kep}`,
                  nev: user.name,
                  bio: user.bio,
                  tema1: user.kedvencTemak.tema1,
                  tema2: user.kedvencTemak.tema2,
                  tema3: user.kedvencTemak.tema3,
                },
                statisztika: {
                  exp: user.xp,
                  jatszmaSzam: user.jatszmaSzam,
                  valaszIdo: user.valaszIdo,
                },
                rekord: {
                    pontszam: user.rekord.pontszam,
                    helyesHelytelen: user.rekord.helyesHelytelen,
                    tema: user.rekord.tema,
                    nehezseg: user.rekord.nehezseg,
                    ido: user.rekord.ido,
                    kerdesSzam: user.rekord.kerdesSzam,
                    valaszSzam: user.rekord.valaszSzam,
                },
              }
                  res.send(felhasznalo);
            })
        }); 
//Regex alapú keresés, MongoDB Szintaxis és implementáció hiányában nem teljesértékű
//Ez alatt azt értem, hogy nem SQL "LIKE" ahol elől/hátul is tudod vizsgálni, MongoDB-ben csak globálisan lehet (kivéve hard-encoded)
//Példa erre: MongoDB ['Regoba','Obalisk','Mabari'] ha most a 'ba'-ra rákeresünk mind a hármat kifogja dobni
//Ezért kell külsőleg RegExp-el escapelni és összehozni egy külön tömbben, hogy a regex syntax-t megtartsa pl: /^Regoba$/
exports.getUsers = (async(req, res) => {
    const regex = new RegExp(['^',req.params.nev].join(""),"i");
    await User.find( {username: regex}).limit(10).exec(function (err, felh){
        let valasz = {}
        felh.forEach((adat, index) => {
            valasz[`felhasznalo${index+1}`] = {
                felhasznalonev: adat.username,
                kep: `${process.env.HOST_URL}`+`:${process.env.PORT||2000}`+`${adat.kep}`,
            }
        })
        res.send(valasz);
    });
})   
//Felhasználó profil frissítője, ha képet is feltölt akkor frissíti a meglévővel, ellentétben a default-al akkor lecseréli a user pfp-re első updatenél
exports.updateUserPage = (async(req,res) => {
    const filter = { _id: `${req.user._id}` };
    let update = {
        kep: "placeholder",
        name: req.body.nev,
        bio: req.body.bio,
        kedvencTemak: {
            tema1: req.body.tema1,
            tema2: req.body.tema2,
            tema3: req.body.tema3,
        }
    }
    await User.findOne({_id: `${req.user._id}`}).then(felhasznal => {
        if (felhasznal.kep == "/felhasznalokep/default-user.webp" && req.file) update.kep = req.file.path.substring(5);
        else update.kep = felhasznal.kep;
        }).catch();
    await User.updateOne(filter, update).then(res.send("Sikeres update!")).catch();
    
});

//Felhasználó törlése az adatbázisban tárolt collectionből ObjectID alapján
exports.deleteUser = ((req,res,next) => {
    User.findOneAndRemove({_id: `${req.user._id}`}).then(res.send("Sikeres törlés!")).catch(res.send("Sikertelen törlés!"))
});

//Felhasználó küldése loginkor, autologinnál is használva van.
exports.SendUser = (async(req,res) => {
    if (!req.user) {res.redirect(`${process.env.HOST_URL}:5173`);}
    else {
      let felhasznalo = {
        felhasznalonev: req.user.username,
        csatlakozas: req.user.csatlakozas,
        jogosultsag: req.user.roles,
        jellemzok: {
          kep: `${process.env.HOST_URL}`+`:${ process.env.PORT || 2000}`+`${req.user.kep}`,
          nev: req.user.name,
          bio: req.user.bio,
          tema1: req.user.kedvencTemak.tema1,
          tema2: req.user.kedvencTemak.tema2,
          tema3: req.user.kedvencTemak.tema3,
        },
        statisztika: {
          exp: req.user.xp,
          jatszmaSzam: req.user.jatszmaSzam,
          valaszIdo: req.user.valaszIdo,
        },
        rekord: {
            pontszam: req.user.rekord.pontszam,
            helyesHelytelen: req.user.rekord.helyesHelytelen,
            tema: req.user.rekord.tema,
            nehezseg: req.user.rekord.nehezseg,
            ido: req.user.rekord.ido,
            kerdesSzam: req.user.rekord.kerdesSzam,
            valaszSzam: req.user.rekord.valaszSzam,
        },
        auth_token: req.user.auth_token,
      }
      res.send(felhasznalo);
    }
  })