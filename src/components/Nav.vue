<script>
  import Szint from './Szint.vue'
  import { mapWritableState } from  'pinia'
  import { useFelhasznaloStore } from '../stores/felhasznalo'
  import { useProfilStore } from '../stores/profil'
  import felhasznaloJSON from '../felhasznalo.json'

  export default {
    components: {
      Szint
    },

    data() {
      return {
        bejelentkezett: null,
        felhasznaloKattint: false,
        navIkonKattint: false,
        temak: [
          { id: 'autok', szoveg: 'Autók' },
          { id: 'biologia', szoveg: 'Biológia' },
          { id: 'fizika', szoveg: 'Fizika' },
          { id: 'foldrajz', szoveg: 'Földrajz' },
          { id: 'irodalom', szoveg: 'Irodalom' },
          { id: 'kemia', szoveg: 'Kémia' },
          { id: 'sport', szoveg: 'Sport' },
          { id: 'szorakoztatas', szoveg: 'Szórakoztatás' },
          { id: 'technologia', szoveg: 'Technológia' },
          { id: 'tortenelem', szoveg: 'Történelem' },
          { id: 'zene', szoveg: 'Zene' },
          { id: 'vegyes', szoveg: 'Vegyes' }
        ],
        keresett: "",
        keres: false,
        eredmeny: [],
        throttle: null
      }
    },

    beforeMount() {
      this.bejelentkezett = true // átmeneti
      this.felhasznalo = felhasznaloJSON // átmeneti
    },

    computed: {
      ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
    },

    // ha a route változik akkor visszaállítja a navbart
    watch:{
      $route() {
        this.felhasznaloKattint = false
        this.navIkonKattint = false
        this.keresett = ""
        let nav = $(".navbar-collapse");
        if (nav.hasClass("show")) {
          nav.removeClass("show");
        }
      },
      keresett(ujKeresett) {
        if(ujKeresett!==""){
          this.keres=true
          if(this.throttle) {
            clearTimeout(this.throttle)
          }
          this.throttle = setTimeout(() => {
            this.kereses(ujKeresett)
          }, 500)
        }
        else{
          this.keres=false
        }
      }
    },

    methods:{
      aktiv(name){
        if(this.$router.currentRoute.value.name === name){
          return "active"
        }
      },

      kijelentkezes(){
        this.bejelentkezett = false
        useFelhasznaloStore().$reset()
        this.$router.push("/")
      },

      kereses(keresettElem) {
        console.log(keresettElem) // átmeneti
        /*
        axios
          .get("/search", {
            params: {
              q: keresettElem,
            },
          })
          .then((res) => {
            this.eredmeny = res.data;
          });
        */
      },

      lenyilasKezelo(){
        this.navIkonKattint = !this.navIkonKattint;
        this.keresett = ""
      }
    }
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid">
      <button class="navbar-toggler"
      :id="this.navIkonKattint ? 'open' : 'closed'"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      @click="lenyilasKezelo">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <RouterLink to="/" class="navbar-brand">
        <img src="" alt="Quizter Logó">
      </RouterLink>
      <div v-if="bejelentkezett">
        <div class="jobb-nav collapse navbar-collapse" id="navbarNav" style="top:6px;">
          <div id="felhasznalo-tarolo">
            <span id="felhasznalo-nev">{{ felhasznalo.username }}</span>
            <Szint :exp="felhasznalo.exp" magassag="16px" szelesseg="100px" betumeret="10pt"/>
          </div>
        </div>
        <div class="dropdown dropdown-toggle text-light jobb-nav">
          <img :src="felhasznalo.kep" alt="Felhasználókép" class="felhasznalo-kep" @click="felhasznaloKattint = !felhasznaloKattint">
          <div class="dropdown-menu dropdown-menu-dark" :class="felhasznaloKattint ? 'show' : ''" style="right:0;">
            <RouterLink :to="{name: 'profil', params: {userId: felhasznalo.username}}" class="dropdown-item">Profil</RouterLink>
            <button class="dropdown-item" @click="kijelentkezes()">Kijelentkezés</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="dropdown dropdown-toggle text-light jobb-nav">
          <img src="/img/ikon/login.webp" alt="Felhasználókép" class="felhasznalo-kep" @click="felhasznaloKattint = !felhasznaloKattint">
          <div class="dropdown-menu dropdown-menu-dark" :class="this.felhasznaloKattint ? 'show' : ''" style="right:0;">
            <RouterLink to="/bejelentkezes" class="dropdown-item">Bejelentkezés</RouterLink>
            <RouterLink to="/regisztracio" class="dropdown-item">Regisztráció</RouterLink>
          </div>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <RouterLink to="/" class="nav-item nav-link" :class="aktiv('fooldal')">Főoldal</RouterLink>
          <RouterLink :to="{name: 'profil', params: {userId: felhasznalo.username}}" class="nav-item nav-link" :class="aktiv('profil')">Profil</RouterLink>
          <RouterLink to="/ranglista" class="nav-item nav-link" :class="aktiv('ranglista')">Ranglista</RouterLink>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" :class="aktiv('quizbeallito')" id="quizBeallitoDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Témák
            </a>
            <div class="dropdown-menu dropdown-menu-dark">
              <RouterLink v-for="t in temak" :key="t.id" :to="{name: 'quizbeallito', params: {temaId: t.id}}" class="dropdown-item">{{ t.szoveg }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="kereso-tarolo navbar-collapse collapse" id="navbarNav" >
        <div class="input-group">
          <input class="form-control" id="nav-kereses-szoveg" v-model="keresett" type="search" placeholder="Felhasználó" aria-label="Search">
          <button class="btn btn-warning" id="nav-kereses-gomb" @click="$router.push(`profil/${keresett}`)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="fixed-top" id="kereses-eredmeny-tarolo">
    <div class="bg-dark rounded " :class="keres ? '' : 'd-none'" id="kereses-eredmeny">
      <RouterLink v-for="felh in eredmeny" :to="{name: 'profil', params: {userId: felh.username}}" :key="felh.username" class="m-1 text-light text-decoration-none row">
        <div class="col-sm-3">
          <img :src="felh.kep" alt="képe" class="felhasznalo-kep">
        </div>
        <div class="col-sm-4">
          <p id="keresett-felhasznalo">{{ felh }}</p> 
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  .navbar-toggler {
    border: none;
    height: 26px;
    width: 40px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    cursor: pointer;
  }
  .navbar-toggler span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: white;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
  }
  #closed span:nth-child(1) {
    top: 0px;
  }
  #closed span:nth-child(2),#navbar-toggler span:nth-child(3) {
    top: 13px;
  }
  #closed span:nth-child(4) {
    top: 26px;
  }
  #open span:nth-child(1) {
    top: 15px;
    width: 0%;
    left: 50%;
  }
  #open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  #open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  #open span:nth-child(4) {
    top: 18px;
    width: 0%;
    left: 50%;
  }

  .navbar {
    background-color: #0b0c0e;
  }

  .navbar-toggler:focus,
  .navbar-toggler:active,
  .navbar-toggler-icon:focus {
    outline: none;
    box-shadow: none;
  }

  .navbar-brand {
    height: 40px;
    margin-right: 40px;
    content: url("/img/ikon/quizterlogo.webp");
  }

  .navbar-brand:hover {
    opacity: 0.8;
  }

  #nav-kereses-szoveg {
    max-width: 206px;
  }

  .kereso-tarolo {
    margin-right: 120px;
  }

  .input-group {
    display: flex;
    justify-content: end;
    margin-right: 50px;
  }

  #felhasznalo-tarolo {
    display: inline-block;
    text-align: center;
    margin-right: 55px;
    margin-left: 10px;
  }

  #felhasznalo-nev {
    font-size: 10pt;
    font-weight: bold;
    color: white;
  }

  .jobb-nav {
    position:absolute;
    right:12px;
    top:10px;
  }

  .felhasznalo-kep {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
  }

  .col-auto {
    margin-right: 10px;
  }

  #kereses-eredmeny-tarolo {
    display: flex;
    justify-content: end;
    margin-top: 56px;
    margin-right: 215px;
  }

  #kereses-eredmeny {
    width: 220px;
  }

  #keresett-felhasznalo {
    line-height: 40px;
    font-weight: 500;
  }

  .dropdown-item:active {
    background-color: rgb(255,200,0);
  }

  @media screen and (max-width: 991px) {
    .input-group {
      margin-top: 10px;
      margin-bottom: 10px;
      width: 100%;
      justify-content: center;
    }
    #felhasznalo-tarolo {
      display: none;
    }
    .kereso-tarolo {
      margin: 0;
    }
    #kereses-eredmeny-tarolo {
      justify-content: center;
      margin-top: 274px;
      margin-right: 40px;
    }
  }
</style>