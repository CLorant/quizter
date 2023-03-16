<template>
  <div id="tartalom">
    <div class="bemutatkozas-tarolo">
      <h1>Rólunk</h1>
      <p>
        Helló, itt a Quizter csapata! Ezt a weboldalt 3 középiskolai tanuló
        készítette egy iskolai projektnek 2022-ben. Viszont ezután is
        karbantartjuk majd a weboldalt. A Quizter-en 11 különböző témában érhető
        el nagyjából 1300 kérdés. Emellett van még egy véletlenszerű kérdésekből
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
          src="/img/fejlesztes/tamas.webp"
          alt="Kerényi Tamás képe"
          class="rolunk-kep"
        />
        <h2>Kerényi Tamás</h2>
        <p>Backend Fejlesztő</p>
      </div>
      <div class="rolunk-oszlop">
        <img
          src="/img/fejlesztes/lori.webp"
          alt="Czibik Lóránt Patrik képe"
          class="rolunk-kep"
        />
        <h2>Czibik Lóránt Patrik</h2>
        <p>Frontend Fejlesztő<br />Dizájner</p>
      </div>
      <div class="rolunk-oszlop">
        <img src="/img/fejlesztes/gergo.webp" alt="Nagy Gergő képe" class="rolunk-kep" />
        <h2>Nagy Gergő</h2>
        <p>Dizájner</p>
      </div>
    </div>
    <h2 class="text-center my-5">Galéria a fejlesztésről</h2>
    <div class="w-75 d-block mx-auto">
      <div id="slider" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#slider" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#slider" data-bs-slide-to="5" aria-label="Slide 6"></button>
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
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <h2 class="text-center my-5">Elérhetőség</h2>
    <div class="text-center mb-5">
      <a
      class="rolunk-email"
      href="https://mail.google.com/mail/?view=cm&fs=1&to=quizterhelp@gmail.com"
      target="_blank">
        quizterhelp@gmail.com
      </a>
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

  .rolunk-email {
    color: white;
    text-decoration: none;
  }

  .rolunk-email:hover {
    color: rgb(255, 200, 0);
  }

  @media screen and (max-width: 764px){
    .rolunk-oszlop{
      padding-bottom: 50px;
      width: 100%;
    }
  }

  @media screen and (max-width: 430px){
    h1{
      font-size: 9vw;
    }
    h3{
      font-size: 7vw;
    }
    .fejlesztes-galeria-kep{
      height: auto;
      width: 100%;
    }
    .rolunk-email{
      word-break: break-all;
    }
  }
</style>