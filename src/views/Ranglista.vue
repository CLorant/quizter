<script>
  import Szint from '../components/Szint.vue';

  export default {
    components: {
      Szint
    },

    data() {
      return {
        keresett: "",
        eredmeny: []
      }
    }
  }
</script>

<template>
  <div id="tartalom">
    <div id="szuro-tarolo">
      <div class="dropdown">
          <button type="button" id="datum" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mindenkori</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">Mai</li>
            <li class="dropdown-item">Heti</li>
            <li class="dropdown-item">Havi</li>
            <li class="dropdown-item">Évi</li>
            <li class="dropdown-item">Mindenkori</li>
          </ul>
      </div>
      <div class="dropdown">
          <button type="button" id="tema" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Autók</button>
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
          <button type="button" id="nehezseg" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Könnyű</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">Könnyű</li>
            <li class="dropdown-item">Közepes</li>
            <li class="dropdown-item">Nehéz</li>
          </ul>
      </div>
      <div class="dropdown">
          <button type="button" id="ido" class="btn btn-toggle btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">30 mp</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">30 mp</li>
            <li class="dropdown-item">20 mp</li>
            <li class="dropdown-item">10 mp</li>
          </ul>
      </div>
      <div class="dropdown">
          <button type="button" id="kerdes_szam" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">10 kérdés</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">10 kérdés</li>
            <li class="dropdown-item">15 kérdés</li>
            <li class="dropdown-item">20 kérdés</li>
          </ul>
      </div>
      <div class="dropdown">
          <button type="button" id="valasz_szam" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">2 válasz</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="dropdown-item">2 válasz</li>
            <li class="dropdown-item">4 válasz</li>
            <li class="dropdown-item">6 válasz</li>
          </ul>
      </div>
      <form class="form-inline my-2 my-lg-0" id="ranglista-kereses-form">
        <div class="input-group">
          <input class="form-control bg-dark border-secondary text-light" id="kereses-szoveg" v-model="keresett" type="search" aria-label="Search">
          <button class="btn btn-dark border-secondary" id="kereses-gomb" @click="$router.push(`profil/${keresett}`)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
          
    <div id="ranglista-tarolo">
      <div class="col-auto justify-content-center">
        <div class="row justify-content-center">
          <div class="row justify-content-center col-lg-6">
            <div class="table-responsive" style="cursor: pointer;">
              <table class="table table-hover table-borderless table-sm text-light">
                <tbody>
                  <!-- 10-szer -->
                  <tr>
                    <td class="col-1"></td> <!-- Helyezés -->
                    <td class="col-1">
                    <!--
                      <RouterLink :to="{name: 'profil', params: {userId: profil.username}}">
                        <img src="" :alt="profil.username + ' képe'">
                      </RouterLink>
                    -->
                    </td>
                    <td class="col-3" style="text-align: left;"></td> <!-- Név -->
                    <td class="col-1"></td> <!-- Felhasználónév -->
                    <td class="col-3"></td> <!-- Pont -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg justify-content-center">
            <div class="table-responsive">
              <div id="seged-ranglista-felhasznalo-tarolo">
                <a href="profil">
                  <img id="seged-ranglista-felhasznalo-kep">
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

  #ranglista-kereses-form{
    padding-left: 30px;
    padding-right: 30px;
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
    width:100px;
    border-radius: 50%;
  }

  #ranglista-kereses-form{
    margin-left: 5px;
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
    empty-cells: hide;
    overflow-x: visible;
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