<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid">
      <button class="navbar-toggler" :id="navIkonKattint ? 'open' : 'closed'" ref="hamburger" type="button" data-bs-toggle="collapse"
        data-bs-target=".navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false"
        aria-label="Hamburger menü" @click="keresett = ''; navIkonKattint = !navIkonKattint">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <RouterLink to="/">
        <img src="/img/ikon/quizterlogo_kicsi.webp" alt="Quizter Logó" decoding="async" class="navbar-brand" width="119" height="40">
      </RouterLink>
      <div v-if="felhasznalo.bejelentkezett">
        <div class="collapse navbar-collapse jobb-nav" style="top:6px;">
          <div id="felhasznalo-tarolo">
            <span id="felhasznalo-nev">{{ felhasznalo.felhasznalonev }}</span>
            <Szint :exp="felhasznalo.statisztika.exp" magassag="16px" szelesseg="100px" betumeret="10pt" />
          </div>
        </div>
        <div class="dropdown jobb-nav">
          <div class="dropdown-toggle text-light" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="felhasznalo.jellemzok.kep" alt="Kép" decoding="async" class="felhasznalo-kep" width="40" height="40">
          </div>
          <div class="dropdown-menu dropdown-menu-dark" id="felhasznaloDropdownMenu">
            <RouterLink :to="{ name: 'profil', params: { felhasznaloId: felhasznalo.felhasznalonev } }" class="dropdown-item">Profil
            </RouterLink>
            <button class="dropdown-item" @click="kijelentkezes()">Kijelentkezés</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="dropdown jobb-nav">
          <div class="dropdown-toggle text-light" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/img/ikon/login.webp" alt="Kép" decoding="async" class="felhasznalo-kep" width="40" height="40">
          </div>
          <div class="dropdown-menu dropdown-menu-dark" id="felhasznaloDropdownMenu">
            <RouterLink to="/bejelentkezes" class="dropdown-item">Bejelentkezés</RouterLink>
            <RouterLink to="/regisztracio" class="dropdown-item">Regisztráció</RouterLink>
          </div>
        </div>
      </div>
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <RouterLink to="/" class="nav-item nav-link" :class="aktiv('fooldal')">Főoldal</RouterLink>
          <RouterLink :to="{ name: 'profil', params: { felhasznaloId: felhasznalo.felhasznalonev } }" class="nav-item nav-link"
            :class="aktiv('profil')">Profil</RouterLink>
          <RouterLink to="/ranglista" class="nav-item nav-link" :class="aktiv('ranglista')">Ranglista</RouterLink>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" :class="aktiv('quizbeallito')" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Témák
            </a>
            <div class="dropdown-menu dropdown-menu-dark">
              <RouterLink v-for="t in temak" :key="t.id" :to="{ name: 'quizbeallito', params: { temaId: t.id } }"
                class="dropdown-item">{{ t.szoveg }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="kereso-tarolo collapse navbar-collapse">
        <div class="input-group">
          <input class="form-control" id="nav-kereses-szoveg" v-model="keresett" type="search" placeholder="Felhasználó"
            aria-label="Kereső Mező">
          <button class="btn btn-warning" id="nav-kereses-gomb" @click="keresoGomb" aria-label="Keresés Gomb">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="fixed-top" id="kereses-eredmeny-tarolo">
    <div class="bg-dark rounded" :class="keres ? '' : 'd-none'" id="kereses-eredmeny">
      <div v-if="hiba" class="d-flex justify-content-center pt-5 mt-5">
        <button class="btn btn-dark" @click="getUsersByName()">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
        </button>
      </div>
      <Toltes v-else-if="toltes" />
      <div v-else>
        <RouterLink v-for="felh in keresesEredmeny" :to="{ name: 'profil', params: { felhasznaloId: felh.felhasznalonev } }"
          :key="felh.felhasznalonev" class="m-1 text-light text-decoration-none row">
          <div class="col-3">
            <img :src="felh.jellemzok.kep" alt="kép" decoding="async" class="felhasznalo-kep" width="40" height="40">
          </div>
          <div class="col">
            <p id="keresett-felhasznalo">{{ felh.felhasznalonev }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import Toltes from './Toltes.vue';
import Szint from './Szint.vue';
import { mapWritableState } from 'pinia';
import { useFelhasznaloStore } from '../stores/felhasznalo';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  components: {
    Toltes,
    Szint
  },

  data() {
    return {
      toltes: true,
      hiba: false,
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
      keresesMegszakit: false,
      keresett: "",
      keres: false,
      keresesEredmeny: [],
      debounce: null
    }
  },

  computed: {
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo']),
  },

  
  watch: {
    $route() {
      // visszaállítja a navbart egy kattintással ha ki van nyitva
      if(this.navIkonKattint) {
        this.$refs.hamburger.dispatchEvent(new Event('click'));
      }
    },

    keresett(ujKeresett) {
      if (ujKeresett !== "") {
        this.getUsersByName();
      }
      else {
        this.keres = false;
        if (this.keresesMegszakit) {
          this.keresesMegszakit.cancel();
        }
      }
    }
  },

  methods: {
    aktiv(name) {
      if (this.$router.currentRoute.value.name === name) {
        return "active";
      }
    },

    kijelentkezes() {
      this.felhasznalo.bejelentkezett = false;
      Cookies.remove('auth_token');
      useFelhasznaloStore().$reset();
      this.$router.push("/");
    },

    async getUsersByName() {
      if (this.keresesMegszakit) {
        this.keresesMegszakit.cancel();
      }

      if (this.debounce) {
        clearTimeout(this.debounce);
      }

      this.keres = true;
      this.keresesMegszakit = axios.CancelToken.source();
      this.hiba = false;
      this.toltes = true;

      this.debounce = setTimeout(async() => {
        await axios.get(`${import.meta.env.VITE_API_URL}/getUsersByName/${this.keresett}`, {cancelToken: this.keresesMegszakit.token})
          .then(response => {
            this.keresesEredmeny = response.data;
            this.toltes = false;
          })
          .catch(error => {
            if (!axios.isCancel(error)) {
              this.hiba = true;
              console.log('Hiba:', error.message);
            }
          });
      }, 500)
    },

    keresoGomb() {
      if(this.keresett !== "" && this.keresesEredmeny.length != 0) {
        this.$router.push({ name: 'profil', params: { felhasznaloId: this.keresesEredmeny[`felhasznalo1`].felhasznalonev } });
      }
    }
  }
}
</script>

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
}

.navbar-toggler span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: whitesmoke;
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

#closed span:nth-child(2),
#navbar-toggler span:nth-child(3) {
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
  margin-right: 40px;
}

.navbar-brand:hover {
  opacity: 0.8;
}

#nav-kereses-szoveg {
  color-scheme: light;
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
  color: whitesmoke;
}

.jobb-nav {
  position: absolute;
  right: 12px;
  top: 10px;
}

.felhasznalo-kep {
  border-radius: 20px;
}

#felhasznaloDropdownMenu {
  left: auto;
  right: 0;
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
  height: 350px;
  width: 220px;
  overflow-y: scroll;
}

#keresett-felhasznalo {
  line-height: 40px;
  font-weight: 500;
}

.dropdown-item:active {
  background-color: rgb(255, 200, 0);
}

.dropdown-menu, #kereses-eredmeny {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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