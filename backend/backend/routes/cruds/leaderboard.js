const Rekordok = require('../../../middleware/rekordok');
const User = require('../../../middleware/mongodb');
//Lehet kurva komplex, de kurva egyszerű valójában
//Ez a eljárás egy Inner Join SQL-nek felel meg, két dokumentumot egybe hoz és utána Frontend íze-szájára konvertálom majd kiküldöm
//Dióhéjban: Rekords documentből megkeresi ahol egyezik a küldött adat, és két collectionből összehozza a documentet ahol egyezik a 'username', majd formázás után megy FrontEnd-nek
  exports.getLeaderboard = ((req, res) => {
          Rekordok.aggregate([{$match: { "rekord.tema": `${req.params.tema}`, "rekord.nehezseg":`${req.params.nehezseg}` } },{$sort: { "rekord.pontszam":-1}},
          { $lookup: { from: "users", localField: "username", foreignField: "username", as: "felhasznalo" } }, 
          {$project: { "_id":0, "felhasznalo._id":0, "felhasznalo.auth_token":0, "felhasznalo.salt":0, "felhasznalo.hash":0, }}])
          .exec(function (err, ranglista) {
              let valasz = {}
              ranglista.forEach(function(userlist, index) {
                valasz[`felhasznalo${index+1}`] = {
                    felhasznalonev: userlist.felhasznalo[0].username,
                    kep: `${process.env.HOST_URL}:${process.env.PORT || 2000}${userlist.felhasznalo[0].kep}`,
                    nev: userlist.felhasznalo[0].name,
                    exp: userlist.felhasznalo[0].xp,
                    rekord: {
                        pontszam: userlist.rekord.pontszam,
                        helyesHelytelen: userlist.rekord.helyesHelytelen,
                        tema: userlist.rekord.tema,
                        nehezseg: userlist.rekord.nehezseg,
                        ido: userlist.rekord.ido,
                        kerdesSzam: userlist.rekord.kerdesSzam,
                        valaszSzam: userlist.rekord.valaszSzam,
                    },
              }})
              res.send(valasz);
          })         
      });

function UjRekord (req) {
    const ujrekord = new Rekordok({
      username: req.user.username,
      rekord: {
        pontszam: `${req.body.rekord.pontszam}`,
        helyesHelytelen:`${req.body.rekord.helyesHelytelen}`,
        tema: `${req.body.rekord.tema}`,
        nehezseg: `${req.body.rekord.nehezseg}`,
        ido: `${req.body.rekord.ido}`,
        kerdesSzam: `${req.body.rekord.kerdesSzam}`,
        valaszSzam: `${req.body.rekord.valaszSzam}`,
      }
    })
    ujrekord.save();
}
function UserStatRes (req, res, szemrekord) {
  User.findOne({username: `${req.user.username}`}).then(usr => {
    return res.send({"szemrekord":szemrekord,"exp":usr.xp})
  })
}
async function UserStatUpd (req) {
  const filter = { username: `${req.user.username}`}
                    const updt = {
                      xp: req.user.xp + Math.round(req.body.rekord.pontszam / 100),
                      jatszmaSzam : req.user.jatszmaSzam+1,
                      valaszIdo : (req.body.valaszIdo / req.body.rekord.kerdesSzam).toFixed(2),
                    }
                    await User.updateOne(filter, updt);
}
//First, and last "normal function" i ever write
async function UserUpdater (req) {
  const filter = { username: `${req.user.username}`}
                    const updt = {
                      rekord: {
                        pontszam: parseInt(req.body.rekord.pontszam),
                        helyesHelytelen:`${req.body.rekord.helyesHelytelen}`,
                        tema: `${req.body.rekord.tema}`,
                        nehezseg: `${req.body.rekord.nehezseg}`,
                        ido: `${req.body.rekord.ido}`,
                        kerdesSzam: parseInt(req.body.rekord.kerdesSzam),
                        valaszSzam: parseInt(req.body.rekord.valaszSzam),
                      }
                    }
                    await User.updateOne(filter, updt);
}

async function RecordUpdater (req) {
  const filter = { username: `${req.user.username}`, "rekord.tema": `${req.body.rekord.tema}`, "rekord.nehezseg": `${req.body.rekord.nehezseg}`}
                    const updt = {
                      rekord: {
                        pontszam: parseInt(req.body.rekord.pontszam),
                        tema: `${req.body.rekord.tema}`,
                        nehezseg: `${req.body.rekord.nehezseg}`,
                        helyesHelytelen:`${req.body.rekord.helyesHelytelen}`,
                        ido: `${req.body.rekord.ido}`,
                        kerdesSzam: parseInt(req.body.rekord.kerdesSzam),
                        valaszSzam: parseInt(req.body.rekord.valaszSzam),
                      }
                    }
                    await Rekordok.updateOne(filter, updt);
}
  //sztem nem vagyok normális, ennek a kódnak min 10 hónapnak kéne lennie, spaggetti kód tudom
  exports.UpdateRecord = ((req, res) => {
    let tema = ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'];
    let nehezseg = ['konnyu', 'kozepes', 'nehez'];
    if (!tema.includes(`${req.body.rekord.tema}`) || !nehezseg.includes(`${req.body.rekord.nehezseg}`)) 
      return res.send("Nem létező Téma vagy/és nehézség");
    UserStatUpd(req);
    Rekordok.aggregate([{$match: { username:`${req.user.username}`,"rekord.tema": `${req.body.rekord.tema}`, "rekord.nehezseg":`${req.body.rekord.nehezseg}` } },
          { $lookup: { from: "users", localField: "username", foreignField: "username", as: "felhasznalo" } }, 
          {$project: { "_id":0, "felhasznalo._id":0, "felhasznalo.auth_token":0, "felhasznalo.salt":0, "felhasznalo.hash":0, }}])
          .exec(function (err, ranglista) {
              let szemrekord = false
              if (!ranglista.length) {
                UjRekord(req);
                if (req.user.rekord.pontszam < req.body.rekord.pontszam){ UserUpdater(req); szemrekord=true}
                UserStatRes (req, res, szemrekord);
              }
              else {
                if (ranglista[0].rekord.pontszam < req.body.rekord.pontszam){ RecordUpdater(req); szemrekord=true}
                if (req.user.rekord.pontszam < req.body.rekord.pontszam){ UserUpdater(req); szemrekord=true}
                UserStatRes (req, res, szemrekord)
              }
              
          })
        })
