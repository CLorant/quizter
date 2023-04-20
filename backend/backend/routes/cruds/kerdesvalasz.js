const Kerdesek = require('../../../middleware/kerdesek');
//const Runningsession = require('../../../middleware/runningsession');
//const Tempstorage = require('../../../middleware/tempstorage');
//Isten kövezzen meg ezért a C# based kódon, Random lekérdez X kérdést és válaszszám-tól függően 2/4/6 mennyiségűt küld vissza a FrontEnd-nek, mindig a valasz1 a helyes
exports.KerdesValasz = (async(req, res) => {
    //Válaszszám vizsgálat, ha ebből nem 2/4/6 akkor default 6-ra állítja a választ
    if(!['2','4','6'].includes(req.params.valaszszam)){req.params.valaszszam=6}
    //Kérdésszám vizsgálat, ha ebből nem 10/15/20 akkor default 10-re állítja a kérdéseket
    if(!['10','15','20'].includes(req.params.kerdesszam)){req.params.kerdesszam=10}
    //Téma vizsgálat, ha ezen témákból nem tartalmazza akkor default foldrajz-ra állítja
    if(!['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes']
    .includes(req.params.tema)){req.params.tema="foldrajz"}
    //Nehézség vizsgálat, default könnyű
    if(!['konnyu', 'kozepes', 'nehez'].includes(req.params.nehezseg)){req.params.nehezseg="konnyu"}
    //Idő vizsgálat, default 30
    //if(!['10','20','30'].includes(req.params.ido)){req.params.ido=30}

//X téma lekérdezés
if (req.params.tema != 'vegyes') Kerdesek.aggregate([ { '$match': { tema: `${req.params.tema}`, nehezseg:`${req.params.nehezseg}` } } , 
{ '$sample': { size : parseInt(req.params.kerdesszam) } }, 
{ '$project': { _id:0 }}],).exec(async function(err, kerdes) {
  /*if (req.user){
    await SessionCreate(req, res, kerdes)
    UserKerdesFormazas(req,res)
  }
  else */NoLoginKerdesFormazas(req,res,kerdes)})
//Vegyes lekérdezéss
else
Kerdesek.aggregate([ { '$match': { nehezseg:`${req.params.nehezseg}`} } , 
{ '$sample': { size : parseInt(req.params.kerdesszam) } }, 
{ '$project': { _id:0 }}],).exec(async function(err, kerdes) {
  /*if (req.user){
    await SessionCreate(req, res, kerdes)
    UserKerdesFormazas(req,res)
  }
  else */NoLoginKerdesFormazas(req,res,kerdes)})
});
/*
exports.RunningGameSessionQuestions = (function(req, res) {
  UserKerdesFormazas(req,res)
})


async function SessionCreate(req, res, kerdes) {
  Tempstorage.deleteMany({username: req.user.username}).then().catch(() => {return res.send("Hibás törlés!")});
  Runningsession.deleteMany({username: req.user.username}).then().catch(() => {return res.send("Hibás törlés!")});
  let sessionkerdesek = []
    kerdes.forEach(function (kerd, index) { 
    sessionkerdesek[index] = {
      username: req.user.username,
      kerdes: kerd.kerdes,
      kep: kerd.kep,
      nehezseg: req.params.nehezseg,
      tema: req.params.tema,
      kerdes_id: kerd.kerdes_id
    }
    for (let j = 0; j < req.params.valaszszam; j++) {
      sessionkerdesek[index][`valasz${j+1}`] = kerd[`valasz${j+1}`];
    }
  });
  let usersession = [{
    username: req.user.username,
    pontszam: 0,
    helyes: 0,
    helytelen: 0,
    tema: req.params.tema,
    nehezseg: req.params.nehezseg,
    ido: req.params.ido,
    kerdesSzam: req.params.kerdesszam,
    valaszSzam: req.params.valaszszam,
  }]
  await Tempstorage.insertMany(sessionkerdesek).then().catch(() => {return res.send("Hibás felvétel!")});
  Runningsession.insertMany(usersession).then().catch(() => {return res.send("Hibás felvétel!")});
}


function UserKerdesFormazas(req,res){
  Tempstorage.aggregate([{$match: { username: req.user.username} },
          { $lookup: { from: "runningsessions", localField: "username", foreignField: "username", as: "session" } }, 
          {$project: { "_id":0, "session.pontszam":0, "session.helyes":0,"session.helytelen":0,"session.tema":0,"session.nehezseg":0,"session.kerdesSzam":0 }}]).exec(function (err, sessionkerdes) {
    if (sessionkerdes.length === 0){return res.send("Nincs gamesession")}
    let obj = {}
    sessionkerdes.forEach(function (kerd, index) { 
    obj[`kerdesvalasz${index+1}`] = {
      kerdes: {
        szoveg: kerd.kerdes,
        kep: `${process.env.HOST_URL}:${process.env.PORT||2000}${kerd.kep}`,
      },
      valaszok: {},
      kerdes_id: kerd.kerdes_id
    }
    for (let j = 0; j < kerd.session[0].valaszSzam; j++) {
      obj[`kerdesvalasz${index+1}`].valaszok[`valasz${j+1}`] = {szoveg: kerd[`valasz${j+1}`]};
    }
    });
    return res.send(obj);
  })
}
*/
function NoLoginKerdesFormazas(req, res, kerdes) {
  let obj = {}
    kerdes.forEach(function (kerd, index) { 
    obj[`kerdesvalasz${index+1}`] = {
      kerdes: {
        szoveg: kerd.kerdes,
        kep: `${process.env.HOST_URL}:${process.env.PORT||2000}${kerd.kep}`,
      },
      valaszok: {}
    }
    for (let j = 0; j < req.params.valaszszam; j++) {
      obj[`kerdesvalasz${index+1}`].valaszok[`valasz${j+1}`] = {szoveg: kerd[`valasz${j+1}`]};
    }
  });
  return res.send(obj);
}
