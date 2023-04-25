const Kerdesek = require('../../../middleware/kerdesek');
const fs = require ('fs');
//Kérdés létrehozása kép feltöltéssel együtt <3
exports.createQuestion = (async (req, res, next) => {
    const kerdes = new Kerdesek({
        kerdes: req.body.kerdes,
        kep: req.file.path,
        valasz1: req.body.valasz1,
        valasz2: req.body.valasz2,
        valasz3: req.body.valasz3,
        valasz4: req.body.valasz4,
        valasz5: req.body.valasz5,
        valasz6: req.body.valasz6,
        nehezseg: req.body.nehezseg,
        tema: req.body.tema,
        kerdes_id: req.file.destination,
    });
    kerdes.save();
    res.send("Kérdés sikeresen felvéve!");
    });

//Kérdés update, ha képpel együtt történik az update akkor kicseréli a képet is backend oldalon
exports.updateQuestion = (async (req, res, next) => {
    const filter = { kerdes_id: `${req.body.kerdes_id}`};
    let update = {
        kerdes: req.body.kerdes,
        kep: "placeholder",
        valasz1: req.body.valasz1,
        valasz2: req.body.valasz2,
        valasz3: req.body.valasz3,
        valasz4: req.body.valasz4,
        valasz5: req.body.valasz5,
        valasz6: req.body.valasz6,
        nehezseg: req.body.nehezseg,
        tema: req.body.tema,}
    try {
        const duplicate = await Kerdesek.findOne({kerdes_id: `${req.body.kerdes_id}`})
        if (!duplicate) return res.send("Nem sikerült updatelni!");
        if (req.file) fs.renameSync(req.file.path, `views/${duplicate.kep}`);
        update.kep = duplicate.kep;

    await Kerdesek.updateOne(filter, update);
    return res.send("Sikeres update!");
    }
    catch {} 
});

//Kérdés törlése kérdés id szerint, majd a hozzátartozó kép törlése a kerdeskep mappában
exports.deleteQuestion = (async (req, res, next) => {
    await Kerdesek.deleteOne({kerdes_id: `${req.params.k_id}`}).then(() => {res.send("Sikeres törlés!");}).catch();
    fs.unlinkSync(`views/kerdeskep/${req.params.k_id}.webp`);   
 });

//Új kérdés felvétele előtt megvizsgálja hogy van-e kép, ha igen akkor levágja az a kép nevét (amit kérdés id-ként fog használni), és az elérési útvonalát
//Ha nincs visszadobja hibaüzenettel
exports.getQuestionImage = ((req, res, next) => {
        if (req.file){
            req.file.destination = req.file.path.substring(16,req.file.path.length-5);
            req.file.path = `${req.file.path.substring(5)}`;
            next();
        }
        else return res.send("Nincs kép!"); 
});

//Single kérdés lekérdezés, mikor a frontend a kérdés_id-val megkeresi az adott kérdést
exports.getQuestion = ((req, res, next) => {
    Kerdesek.find({kerdes_id: req.params.k_id}, {_id:0, __v:0}).limit(1).exec(function (err, kerdesadat){
        kerdesadat.forEach(adat => {
        let kerdes_single = {
            tema: adat.tema,
            nehezseg: adat.nehezseg,
            kerdes: {
                szoveg: adat.kerdes,
                kep: `${process.env.HOST_URL}:${process.env.PORT || 2000}${adat.kep}`,
            },
            valaszok: {
            valasz1: { szoveg:adat.valasz1},
            valasz2: { szoveg:adat.valasz2},
            valasz3: { szoveg:adat.valasz3},
            valasz4: { szoveg:adat.valasz4},
            valasz5: { szoveg:adat.valasz5},
            valasz6: { szoveg:adat.valasz6},
            }
        }
        res.send(kerdes_single);
    })
    })
});

//Az összes kérdést visszaadja téma x nehézség szerint
exports.getQuestions = ((req, res) => {
    Kerdesek.find({ tema: req.params.tema, nehezseg: req.params.nehezseg}).exec(function (err, kerdesek){
      let obj = {}
      kerdesek.forEach(function(kerd, index){
        obj[`${kerd.kerdes_id}`] = {
          kerdes: {
            szoveg: kerd.kerdes,
            kep: `${process.env.HOST_URL}:${process.env.PORT||2000}${kerd.kep}`,
          },
          valaszok: {
            valasz1: {szoveg: kerd.valasz1},
            valasz2: {szoveg: kerd.valasz2},
            valasz3: {szoveg: kerd.valasz3},
            valasz4: {szoveg: kerd.valasz4},
            valasz5: {szoveg: kerd.valasz5},
            valasz6: {szoveg: kerd.valasz6},
          }
        }
      });
      res.send(obj) });
  });
