<script>
import axios from 'axios'
import Szint from './Szint.vue'
import { mapWritableState } from 'pinia'
import { useFelhasznaloStore } from '../stores/felhasznalo'
import { useProfilStore } from '../stores/profil'
import ranglistaJSON from '../ranglista.json' // átmeneti

export default {
  components: {
    Szint
  },

  data() {
    return {
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
      keresesEredmeny: [],
      throttle: null
    }
  },

  computed: {
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo']),
    ...mapWritableState(useProfilStore, ['profil'])
  },

  // ha a route változik akkor visszaállítja a navbart
  watch: {
    $route() {
      this.navIkonKattint = false;
      this.keresett = "";
      let nav = $(".navbar-collapse");
      if (nav.hasClass("show")) {
        nav.removeClass("show");
      }
    },

    keresett(ujKeresett) {
      if (ujKeresett !== "") {
        this.keres = true;
        if (this.throttle) {
          clearTimeout(this.throttle);
        }
        this.throttle = setTimeout(() => {
          this.getUsersByName();
        }, 500)
      }
      else {
        this.keres = false;
      }
    },
  },

  methods: {
    aktiv(name) {
      if (this.$router.currentRoute.value.name === name) {
        return "active";
      }
    },

    kijelentkezes() {
      this.felhasznalo.bejelentkezett = false;
      useFelhasznaloStore().$reset();
      this.$router.push("/");
    },

    async getUsersByName() {
      /*
      await axios.get(`${import.meta.env.VITE_API_URL}/getUsersByName/${this.keresett}`)
        .then(response => {
          this.keresesEredmeny = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      */
      this.keresesEredmeny = ranglistaJSON; // átmeneti
    },

    keresoGomb() {
      if(this.keresett !== "" && this.keresesEredmeny.length != 0) {
        this.profil = this.keresesEredmeny.felhasznalo1;
        this.$router.push({ name: 'profil', params: { felhasznaloId: this.keresesEredmeny[`felhasznalo1`].felhasznalonev } });
      }
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid">
      <button class="navbar-toggler" :id="this.navIkonKattint ? 'open' : 'closed'" type="button" data-bs-toggle="collapse"
        data-bs-target=".navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false"
        aria-label="Toggle navigation" @click="keresett = ''; navIkonKattint = !navIkonKattint">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <RouterLink to="/">
        <img src="/img/ikon/quizterlogo_kicsi.webp" alt="Quizter Logó" decoding="async" class="navbar-brand">
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
            <img :src="felhasznalo.jellemzok.kep" alt="Kép" decoding="async" class="felhasznalo-kep">
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
            <img src="/img/ikon/login.webp" alt="Kép" decoding="async" class="felhasznalo-kep">
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
      <div class="kereso-tarolo navbar-collapse collapse">
        <div class="input-group">
          <input class="form-control" id="nav-kereses-szoveg" v-model="keresett" type="search" placeholder="Felhasználó"
            aria-label="Search">
          <button class="btn btn-warning" id="nav-kereses-gomb" @click="keresoGomb" aria-label="Search Button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
              viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="fixed-top" id="kereses-eredmeny-tarolo">
    <div class="bg-dark rounded" :class="keres ? '' : 'd-none'" id="kereses-eredmeny">
      <RouterLink v-for="(item, index) in keresesEredmeny" :to="{ name: 'profil', params: { felhasznaloId: item.felhasznalonev } }"
        :key="item.felhasznalonev" class="m-1 text-light text-decoration-none row" @click="profil = keresesEredmeny[index]">
        <div class="col-3">
          <img :src="item.jellemzok.kep" :alt="`${item.felhasznalonev} képe`" decoding="async" class="felhasznalo-kep">
        </div>
        <div class="col">
          <p id="keresett-felhasznalo">{{ item.felhasznalonev }}</p>
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
  height: 40px;
  width: 116px;
  margin-right: 40px;
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
  color: whitesmoke;
}

.jobb-nav {
  position: absolute;
  right: 12px;
  top: 10px;
}

.felhasznalo-kep {
  height: 40px;
  width: 40px;
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
}</style>