<template>
  <div id="tartalom">
    <div class="bemutatkozas-tarolo">
      <div id="cim">
        <img src="/img/ikon/quizterlogo.svg" alt="quizter logó" decoding="async" id="cim-logo" width="600" height="150">
        <h2>Rólunk</h2>
      </div>
      <div id="bemutatkozas-szoveg-tarolo">
        <p>
          Helló, itt a <b>Quizter</b> csapata! Ezt a weboldalt 3 középiskolai tanuló
          készítette egy iskolai projektnek 2022 és 2023 között. Viszont ezután is
          karbantartjuk majd a weboldalt. A Quizter-en <b>11 különböző témában érhető
          el nagyjából 1000 kérdés.</b> Emellett van még egy véletlenszerű kérdésekből
          álló téma is, így <b>összesen 12 téma van.</b> A játszma a <b>kérdések nehézsége</b>,
          a <b>körönkénti idő</b>, a <b>kérdések és válaszok száma szerint</b> 3 nehézségen
          beállítható, szóval <b>12 kombinációja van.</b> A ranglista megmászásához a
          <b>legnehezebb nehézségen</b> és minél <b>gyorsabban</b> kell megoldania a kvízeket.
          Sok szerencsét és jó játékot kívánunk!
        </p>
      </div>
    </div>
    <div class="rolunk-kep-tarolo">
      <div class="rolunk-oszlop">
        <img src="/img/fejlesztes/tamas.webp" alt="Kerényi Tamás képe" decoding="async" class="rolunk-kep" width="200" height="200">
        <h2>Kerényi Tamás</h2>
        <p>Backend Fejlesztő</p>
      </div>
      <div class="rolunk-oszlop">
        <img src="/img/fejlesztes/lori.webp" alt="Czibik Lóránt Patrik képe" decoding="async" class="rolunk-kep" width="200" height="200">
        <h2>Czibik Lóránt Patrik</h2>
        <p>Frontend Fejlesztő<br>Dizájner</p>
      </div>
      <div class="rolunk-oszlop">
        <img src="/img/fejlesztes/gergo.webp" alt="Nagy Gergő képe" decoding="async" class="rolunk-kep" width="200" height="200">
        <h2>Nagy Gergő</h2>
        <p>Dizájner</p>
      </div>
    </div>
    <h2 class="text-center my-5 fw-bold">Galéria a fejlesztésről</h2>
    <div class="d-block mx-auto" id="carousel-container">
      <div id="slider" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#slider" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Első Kép"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="1" aria-label="Második Kép"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="2" aria-label="Harmadik Kép"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="3" aria-label="Negyedik Kép"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="4" aria-label="Ötödik Kép"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="5" aria-label="Hatodik Kép"></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/img/fejlesztes/trello.webp" alt="Trello tábla" decoding="async" class="w-100">
          </div>
          <div class="carousel-item">
            <img src="/img/fejlesztes/fooldal.webp" alt="Főoldal tervezése" decoding="async" class="w-100">
          </div>
          <div class="carousel-item">
            <img src="/img/fejlesztes/burger.webp" alt="Hamburger menü tervezése" decoding="async" class="w-100">
          </div>
          <div class="carousel-item">
            <img src="/img/fejlesztes/jatekmenet.webp" alt="Játékmenet dizájn koncepció" decoding="async" class="w-100">
          </div>
          <div class="carousel-item">
            <img src="/img/fejlesztes/felepites.webp" alt="A felépítés rajza" decoding="async" class="w-100">
          </div>
          <div class="carousel-item">
            <img src="/img/fejlesztes/ranglista.webp" alt="Ranglista koncepció" decoding="async" class="w-100">
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Előző</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Következő</span>
        </button>
      </div>
    </div>
    
    <div class="d-flex flew-row justify-content-around flex-wrap my-5">
      <div class="mx-3 text-center">
        <h2 class="my-5 fw-bold">Elérhetőség</h2>
        <a class="rolunk-email" href="https://mail.google.com/mail/?view=cm&fs=1&to=quizterhelp@gmail.com" target="_blank">
          quizterhelp@gmail.com
        </a>
      </div>
      <div class="mx-3 text-center">
        <h2 class="my-5 fw-bold">Dokumentáció</h2>
        <a class="rolunk-email" href="/docs/Dokumentáció.pdf" target="_blank">
          Az oldal dokumentációja
        </a>
      </div>
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

#cim {
  margin-top: 120px;
  margin-bottom: 120px;
  text-align: center;
}

#cim-logo {
  max-width: 90%;
  height: auto;
}

.bemutatkozas-tarolo {
  padding-bottom: 100px;
}

#bemutatkozas-szoveg-tarolo {
  display: flex;
  justify-content: center;
}

#bemutatkozas-szoveg-tarolo p {
  width: 80%;
}

h1 {
  text-align: center;
  padding-bottom: 100px;
  font-size: 40pt;
}

p, a {
  font-size: 14pt;
  line-height: 32pt;
}

b, a {
  color: white;
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
  font-weight: bold;
}

.rolunk-oszlop p {
  padding-top: 10px;
}

.rolunk-kep {
  margin-bottom: 10px;
  border-radius: 50%;
}

.rolunk-szoveg {
  padding-top: 30px;
}

#carousel-container {
  width: 55%;
}

.rolunk-email {
  color: whitesmoke;
  text-decoration: none;
}

.rolunk-email:hover {
  opacity: 0.8;
}

.rolunk-kep, #carousel-container {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media screen and (max-width: 764px) {
  .bemutatkozas-tarolo p {
    font-size: 12pt;
    line-height: 24pt;
  }

  .rolunk-oszlop {
    padding-bottom: 50px;
    width: 100%;
  }

  #carousel-container {
    width: 75%;
  }
}

@media screen and (max-width: 430px) {
  h2 {
    font-size: 16pt;
  }

  h3, .rolunk-oszlop h2 {
    font-size: 7vw;
  }

  p, a {
    font-size: 4.5vw;
    line-height: 8vw;
  }

  .fejlesztes-galeria-kep {
    height: auto;
    width: 100%;
  }

  #carousel-container {
    width: 95%;
  }
}
</style>