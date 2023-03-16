<script>
  import Szint from '../components/Szint.vue';

  export default {
    components: {
      Szint
    },

    data() {
      return {
        keresett: "",
        keresesEredmeny: []
      }
    },

    methods: {
      temaSzoveg(tema) {
        switch (tema) {
          case "autok":
            return "Autók"
          
          case "biologia":
            return "Biológia"

          case "fizika":
            return "Fizika"

          case "foldrajz":
            return "Földrajz"

          case "irodalom":
            return "Irodalom"

          case "kemia":
            return "Kémia"

          case "sport":
            return "Sport"

          case "szorakoztatas":
            return "Szórakoztatás"

          case "technologia":
            return "Technológia"

          case "tortenelem":
            return "Történelem"

          case "zene":
            return "Zene"

          case "vegyes":
            return "Vegyes"

          // Helytelen "tema" paraméterkor
          default:
            return "Autók"
        }
      },

      nehezsegSzoveg(nehezseg) {
        switch(nehezseg) {
          case "konnyu":
            return "Könnyű"

          case "kozepes":
            return "Közepes"

          case "nehez":
            return "Nehéz"

          // Helytelen "nehezseg" paraméterkor
          default:
            return "Könnyű"
        }
      },
    }
  }
</script>

<template>
  <div id="tartalom">
    <div id="szuro-tarolo">
      <div class="dropdown">
          <button type="button" ref="tema" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Autók</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">Autók</li>
            <li class="dropdown-item">Biológia</li>
            <li class="dropdown-item">Fizika</li>
            <li class="dropdown-item">Földrajz</li>
            <li class="dropdown-item">Irodalom</li>
            <li class="dropdown-item">Kémia</li>
            <li class="dropdown-item">Sport</li>
            <li class="dropdown-item">Szórakoztatás</li>
            <li class="dropdown-item">Technológia</li>
            <li class="dropdown-item">Történelem</li>
            <li class="dropdown-item">Zene</li>
            <li class="dropdown-item">Vegyes</li>
          </ul>
      </div>
      <div class="dropdown">
          <button type="button" ref="nehezseg" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Könnyű</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">Könnyű</li>
            <li class="dropdown-item">Közepes</li>
            <li class="dropdown-item">Nehéz</li>
          </ul>
      </div>
      <div class="dropdown">
          <button type="button" ref="ido" class="btn btn-toggle btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">30 mp</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">30 mp</li>
            <li class="dropdown-item">20 mp</li>
            <li class="dropdown-item">10 mp</li>
          </ul>
      </div>
      <div class="dropdown">
          <button type="button" ref="kerdes_szam" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">10 kérdés</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">10 kérdés</li>
            <li class="dropdown-item">15 kérdés</li>
            <li class="dropdown-item">20 kérdés</li>
          </ul>
      </div>
      <div class="dropdown">
          <button type="button" ref="valasz_szam" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">2 válasz</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">2 válasz</li>
            <li class="dropdown-item">4 válasz</li>
            <li class="dropdown-item">6 válasz</li>
          </ul>
      </div>
      <div id="ranglista-kereses">
        <div class="input-group">
          <input class="form-control bg-dark border-secondary text-light" id="kereses-szoveg" v-model="keresett" type="search" aria-label="Search">
          <button class="btn btn-dark border-secondary" id="kereses-gomb" @click="$router.push(`profil/${keresett}`)" aria-label="Search Button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="fixed-top" id="kereses-eredmeny-tarolo">
        <div class="bg-dark rounded " id="kereses-eredmeny">
          <RouterLink v-for="felh in keresesEredmeny" :to="{name: 'profil', params: {userId: felh.username}}" :key="felh.username" class="m-1 text-light text-decoration-none row">
            <div class="col-sm-3">
              <img :src="felh.jellemzok.kep" :alt="`${felh.username} képe`" decoding="async" class="felhasznalo-kep">
            </div>
            <div class="col-sm-4">
              <p id="keresett-felhasznalo">{{ felh.username }}</p> 
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
          
    <div id="ranglista-tarolo">
      <div class="col-auto justify-content-center">
        <div class="row justify-content-center">
          <div class="row justify-content-center col-lg-6">
            <div class="table-responsive" style="cursor: pointer;">
              <table class="table table-borderless table-sm text-light">
                <tbody>
                  <!-- 10-szer -->
                  <tr>
                    <td class="col-1">1. </td> <!-- Helyezés -->
                    <td class="col-1">
                      <img src="/img/ikon/default-user.webp" alt="Felh. kép" decoding="async" id="ranglista-felhasznalo-kep">
                    <!--
                      <RouterLink :to="{name: 'profil', params: {userId: profil.username}}">
                        <img src="" :alt="profil.username + ' képe'">
                      </RouterLink>
                    -->
                    </td>
                    <td class="col-3" style="text-align: left;">Lucas Smith</td> <!-- Név -->
                    <td class="col-1">@LukeAFK</td> <!-- Felhasználónév -->
                    <td class="col-3">42069 pont</td> <!-- Pont -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg justify-content-center">
            <div class="table-responsive">
              <div id="seged-ranglista-felhasznalo-tarolo">
                <a href="/profil">
                  <img src="/img/ikon/default-user.webp" alt="Felhasználó kép" decoding="async" id="seged-ranglista-felhasznalo-kep">
                </a>
                <div>
                  <div id="felhasznalo-tarolo">
                    <span id="felhasznalo-nev">LukeAFK</span>
                    <div style="display: flex; justify-content: center;">
                      <Szint :exp="100" magassag="30px" szelesseg="200px" betumeret="18pt"/> <!-- exp-t írdd át -->
                    </div>
                  </div>
                </div>
                
              </div>
              <table class="table table-hover table-borderless table-sm text-light">
                <thead>
                  <tr class="szemelyes-rekord-sor">
                    <td>Pontszám</td>
                    <td>42069</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td>Helyes / Helytelen</td>
                    <td>20 / 0</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td>Téma</td>
                    <td>Szórakoztatóipar</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td>Nehézség</td>
                    <td>Nehéz</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td>Idő kérdésenként</td>
                    <td>10 mp</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td>Kérdésszám</td>
                    <td>20</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td>Válaszszám</td>
                    <td>6</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #tartalom{
    padding-top: 100px;
    width: 100%;
  }

  table {
    background: rgb(16,16,16);
  }

  #szuro-tarolo{
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
    margin-bottom: 20px;
  }

  .dropdown-toggle{
    margin: 5px;
    width: 130px;
  }

  li span{
    margin-left: 15px;
  }

  .dropdown-item:active {
    background-color: rgb(255,200,0);
  }

  #ranglista-felhasznalo-kep{
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }

  #seged-ranglista-felhasznalo-kep{
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }

  #ranglista-kereses{
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    justify-content: center;
  }

  .list-group-item {
    background-color: rgb(16,16,16);
    color: white;
    position: sticky;
    top: 0;
  }

  .table{    
    text-align: center;
    overflow-x: visible;
  }

  tr:hover {
    background-color: rgb(20,20,20);
  }

  .table-dark{
    background-color: rgb(16,16,16);
  }

  .container ul{
    width: 100%;
    overflow: hidden;
    list-style-position: inside;
  }

  td{
    line-height: 54px;
  }

  .szemelyes-rekord-sor td{
    font-size: 15pt;
    line-height: 54px;
  }

  #seged-ranglista-felhasznalo-tarolo{
    height: 191px;
    padding: 20px;
    text-align: center;
    background: rgb(16,16,16);
  }

  #felhasznalo-tarolo {
    max-width: 250px;
    width: 95%;
    padding-bottom: 25px;
    display: inline-block;
  }

  #felhasznalo-nev {
    font-size: 22pt;
    font-weight: bold;
    color: white;
  }

  @media screen and (max-width: 407px){
    thead {
      padding-top: 16px;
      padding-bottom: 16px;
    }

    td, .szemelyes-rekord-sor td {
      font-size: 5vw;
      line-height: 27px;
    }
  }
</style>