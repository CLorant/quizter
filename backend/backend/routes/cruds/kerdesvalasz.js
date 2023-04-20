const Kerdesek = require('../../../middleware/kerdesek');
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

//X téma lekérdezés
if (req.params.tema != 'vegyes') Kerdesek.aggregate([ { '$match': { tema: `${req.params.tema}`, nehezseg:`${req.params.nehezseg}` } } , 
{ '$sample': { size : parseInt(req.params.kerdesszam) } }, 
{ '$project': { _id:0 }}],).exec(async function(err, kerdes) {
NoLoginKerdesFormazas(req,res,kerdes)})
//Vegyes lekérdezéss
else
Kerdesek.aggregate([ { '$match': { nehezseg:`${req.params.nehezseg}`} } , 
{ '$sample': { size : parseInt(req.params.kerdesszam) } }, 
{ '$project': { _id:0 }}],).exec(async function(err, kerdes) {
NoLoginKerdesFormazas(req,res,kerdes)})
});

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
