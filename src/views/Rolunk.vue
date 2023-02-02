<script>
export default {
  data() {
    return {
      fejlesztesek: [
        { nev: "fejlesztes-trello", alt: "Trello tábla" },
        { nev: "fejlesztes-fooldal", alt: "Főoldal tervezése" },
        { nev: "fejlesztes-burger", alt: "Hamburger menü tervezése" },
        { nev: "fejlesztes-jatekmenet", alt: "Játékmenet dizájn koncepció" },
        { nev: "fejlesztes-felepites", alt: "A felépítés rajza" }
      ],
    };
  },
};
</script>

<template>
  <div id="tartalom">
    <div class="bemutatkozas-tarolo">
      <h1>Rólunk</h1>
      <p>
        Helló, itt a Quizter csapata! Ezt a weboldalt 3 középiskolai tanuló
        készítette egy iskolai projektnek 2022-ben. Viszont ezután is
        karbantartjuk majd a weboldalt. A Quizter-en 11 különböző témában érhető
        el közel 2000 kérdés. Emellett van még egy véletlenszerű kérdésekből
        álló téma is, így összesen 12 téma van. A játszma a kérdések nehézsége,
        a körönkénti idő, a kérdések és válaszok száma szerint 3 nehézségen
        beállítható, szóval 12 kombinációja van. A ranglista megmászásához a
        legnehezebb nehézségen és minél gyorsabban kell megoldanod a kvízeket.
        Sok szerencsét és jó játékot kívánunk!
      </p>
    </div>
    <div class="rolunk-kep-tarolo">
      <div class="rolunk-oszlop">
        <img
          src="../img/tamas.png"
          alt="Kerényi Tamás képe"
          class="rolunk-kep"
        />
        <h2>Kerényi Tamás</h2>
        <p>Backend Fejlesztő</p>
      </div>
      <div class="rolunk-oszlop">
        <img
          src="../img/lori.png"
          alt="Czibik Lóránt Patrik képe"
          class="rolunk-kep"
        />
        <h2>Czibik Lóránt Patrik</h2>
        <p>Frontend Fejlesztő<br />Dizájner</p>
      </div>
      <div class="rolunk-oszlop">
        <img src="../img/gergo.png" alt="Nagy Gergő képe" class="rolunk-kep" />
        <h2>Nagy Gergő</h2>
        <p>Dizájner</p>
      </div>
    </div>
    <div class="fejlesztes-galeria-tarolo">
      <h1>Galéria a fejlesztésről</h1>
      <div v-for="fejlesztes in fejlesztesek" :key="fejlesztes.nev" class="fejlesztes-galeria">
        <a href="src/img/{{fejlesztes.nev}}.png" target="_blank">
          <img src="src/img/fejlesztes-trello.png"
          alt=""
          class="fejlesztes-galeria-kep">
        </a>
      </div>
      <div class="fejlesztes-galeria">
        <a href="src/img/fejlesztes-fooldal.png" target="_blank">
          <img
            src="src/img/fejlesztes-fooldal.png"
            alt=""
            class="fejlesztes-galeria-kep"
          />
        </a>
      </div>
      <div class="fejlesztes-galeria">
        <a href="src/img/fejlesztes-burger.png" target="_blank"
          ><img
            src="src/img/fejlesztes-burger.png"
            alt=""
            class="fejlesztes-galeria-kep"
        /></a>
      </div>
      <div class="fejlesztes-galeria">
        <a href="src/img/fejlesztes-jatekmenet.png" target="_blank"
          ><img
            src="src/img/fejlesztes-jatekmenet.png"
            alt=""
            class="fejlesztes-galeria-kep"
        /></a>
      </div>
      <div class="fejlesztes-galeria">
        <a href="src/img/fejlesztes-felepites.png" target="_blank"
          ><img
            src="src/img/fejlesztes-felepites.png"
            alt=""
            class="fejlesztes-galeria-kep"
        /></a>
      </div>
    </div>
    <div class="elerhetoseg-tarolo">
      <h1>Elérhetőségeink</h1>
      <div class="email-tarolo"></div>
      <h3>Email:</h3>
      <a
        class="rolunk-email"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=quizterhelp@gmail.com"
        target="_blank"
        >quizterhelp@gmail.com</a
      >
    </div>
  </div>
</template>

<style scoped>
#tartalom {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: auto;
  padding-bottom: 50px;
}

.bemutatkozas-tarolo {
  padding-top: 100px;
  padding-bottom: 100px;
}

.bemutatkozas-tarolo h1 {
  text-align: center;
  padding-bottom: 100px;
  font-size: 48pt;
}

#tartalom p,
#tartalom a {
  font-size: 16pt;
}

.rolunk-kep-tarolo {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-top: 50px;
  padding-bottom: 150px;
}

.rolunk-oszlop {
  text-align: center;
  float: left;
}

.rolunk-oszlop h2 {
  font-size: 24pt;
}

.rolunk-oszlop p {
  padding-top: 10px;
}

.rolunk-kep {
  margin-bottom: 10px;
  border-radius: 50%;
  height: 200px;
  width: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.rolunk-szoveg {
  padding-top: 30px;
}

.fejlesztes-galeria-tarolo {
  overflow: hidden;
  width: 100%;
  height: auto;
  padding-top: 50px;
  padding-bottom: 100px;
}

.fejlesztes-galeria-tarolo h1 {
  padding-bottom: 50px;
}

.fejlesztes-galeria {
  padding: 20px;
  float: left;
}

.fejlesztes-galeria-kep {
  height: 200px;
  width: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.elerhetoseg-tarolo {
  padding-top: 50px;
}

.email-tarolo {
  padding-top: 50px;
}

.rolunk-email {
  color: white;
  text-decoration: none;
}

.rolunk-email:hover {
  color: rgb(255, 225, 0);
}
</style>