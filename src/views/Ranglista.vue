<script>
import { mapWritableState } from 'pinia';
import { useProfilStore } from '../stores/profil';
import axios from 'axios';
import Szint from '../components/Szint.vue';
import ranglistaJSON from '../ranglista.json';

export default {
  components: {
    Szint
  },

  data() {
    return {
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'],
      valasztottTema: 'autok',
      nehezsegek: ['konnyu', 'kozepes', 'nehez'],
      valasztottNehezseg: 'nehez',
      idok: [30, 20, 10],
      valasztottIdo: 10,
      kerdesSzamok: [10, 15, 20],
      valasztottKerdesSzam: 20,
      valaszSzamok: [2, 4, 6],
      valasztottValaszSzam: 6,
      valasztottIndex: "felhasznalo1",
      keresett: "",
      keres: false,
      throttle: null,
      ranglistaAdatok: [],
      keresesEredmeny: []
    }
  },

  beforeMount() {
    this.getUsersByRecord(this.valasztottTema, this.valasztottNehezseg, this.valasztottIdo, this.valasztottKerdesSzam, this.valasztottValaszSzam);
  },

  watch: {
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

  computed: {
    ...mapWritableState(useProfilStore, ['profil'])
  },

  methods: {
    temaSzoveg(tema) {
      switch (tema) {
        case "autok":
          return "Autók";

        case "biologia":
          return "Biológia";

        case "fizika":
          return "Fizika";

        case "foldrajz":
          return "Földrajz";

        case "irodalom":
          return "Irodalom";

        case "kemia":
          return "Kémia";

        case "sport":
          return "Sport";

        case "szorakoztatas":
          return "Szórakoztatás";

        case "technologia":
          return "Technológia";

        case "tortenelem":
          return "Történelem";

        case "zene":
          return "Zene";

        case "vegyes":
          return "Vegyes";

        // Helytelen "tema" paraméterkor
        default:
          return "Autók";
      }
    },

    nehezsegSzoveg(nehezseg) {
      switch (nehezseg) {
        case "konnyu":
          return "Könnyű";

        case "kozepes":
          return "Közepes";

        case "nehez":
          return "Nehéz";

        // Helytelen "nehezseg" paraméterkor
        default:
          return "Könnyű";
      }
    },

    getUsersByRecord() {
      /*
      try {
        const getRes = axios.get('/api/getUsersByRecord', {
          params: {
            tema: this.valasztottTema,
            nehezseg: this.valasztottNehezseg,
            ido: this.valasztottIdo,
            kerdesSzam: this.valasztottKerdesSzam,
            valaszSzam: this.valasztottValaszSzam
          }
        });
        this.ranglistaAdatok = getRes;
      } catch (error) {
        console.log(error)
      }
      */
      this.ranglistaAdatok = ranglistaJSON; // átmeneti
    },

    getUsersByName() {
      /*
      try {
        const getRes = axios.get('/api/getUsersByName', {
          params: {
            felhasznalo: this.keresett
          }
        });
        this.keresesEredmeny = getRes;
      } catch (error) {
        console.log(error)
      }
      */
      this.keresesEredmeny = ranglistaJSON; // átmeneti
    },

    keresoGomb() {
      if (this.keresett !== "") {
        this.ranglistaAdatok = this.keresesEredmeny;
      }
    },

    singleUser(i) {
      this.valasztottIndex = i;
      this.ranglistaAdatok = {[i]: {...this.keresesEredmeny[i]}};
    }
  }
}
</script>

<template>
  <div id="tartalom" style="overflow-x: hidden;">
    <div id="szuro-tarolo">
      <div class="dropdown my-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" :value="valasztottTema">{{ temaSzoveg(valasztottTema) }}</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="tema in temak" :key="tema" class="dropdown-item" @click="valasztottTema = tema">{{ temaSzoveg(tema) }}</li>
        </ul>
      </div>
      <div class="dropdown my-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" :value="valasztottNehezseg"> {{ nehezsegSzoveg(valasztottNehezseg) }}</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="nehezseg in nehezsegek" :key="nehezseg" class="dropdown-item" @click="valasztottNehezseg = nehezseg">{{ nehezsegSzoveg(nehezseg) }}</li>
        </ul>
      </div>
      <div class="dropdown my-1">
        <button type="button" class="btn btn-toggle btn-dark dropdown-toggle" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" :value="valasztottIdo">{{ valasztottIdo }} mp</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="ido in idok" :key="ido" class="dropdown-item" @click="valasztottIdo = ido">{{ ido }} mp</li>
        </ul>
      </div>
      <div class="dropdown my-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" :value="valasztottKerdesSzam">{{ valasztottKerdesSzam }} kérdés</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="kerdesSzam in kerdesSzamok" :key="kerdesSzam" class="dropdown-item" @click="valasztottKerdesSzam = kerdesSzam">{{ kerdesSzam }} kérdés</li>
        </ul>
      </div>
      <div class="dropdown my-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" value="2">{{ valasztottValaszSzam }} válasz</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="valaszSzam in valaszSzamok" :key="valaszSzam" class="dropdown-item" @click="valasztottValaszSzam = valaszSzam">{{ valaszSzam }} válasz</li>
        </ul>
      </div>
      <button class="btn btn-warning fw-semibold my-auto" style="width: 130px; margin: 5px;" @click="getUsersByRecord">
        Szűrés
      </button>
      <div id="ranglista-kereses" class="my-2">
        <div class="input-group">
          <input class="form-control bg-dark border-secondary text-light" id="kereses-szoveg" v-model="keresett"
            type="search" aria-label="Search">
          <button class="btn btn-warning" id="kereses-gomb" @click="keresoGomb" aria-label="Search Button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <div id="kereses-eredmeny-tarolo">
          <div class="bg-dark rounded" :class="keres ? '' : 'd-none'" id="kereses-eredmeny">
            <div v-for="(item, index) in keresesEredmeny"
              :key="item.felhasznaloNev" class="m-1 text-light text-decoration-none row" @click="singleUser(index)">
              <div class="col-3">
                <img :src="item.jellemzok.kep" :alt="`${item.felhasznaloNev} képe`" decoding="async" class="felhasznalo-kep">
              </div>
              <div class="col">
                <p id="keresett-felhasznalo">{{ item.felhasznaloNev }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="ranglista-tarolo">
      <div class="col-auto justify-content-center">
        <div class="row justify-content-center">
          <div class="row justify-content-center col-lg-6 px-2">
            <div class="table-responsive" style="cursor: pointer;">
              <table class="table table-borderless table-sm text-light">
                <tbody>
                  <tr v-for="(item, index) in ranglistaAdatok" :key="index" @click="valasztottIndex = index">
                    <td class="col-1">{{ index.substring(11) }}.</td>
                    <td class="col-1">
                      <RouterLink :to="{ name: 'profil', params: { userId: item.felhasznaloNev } }">
                        <img :src="item.jellemzok.kep" :alt="item.felhasznaloNev + ' képe'" decoding="async" id="ranglista-felhasznalo-kep">
                      </RouterLink>
                    </td>
                    <td class="col-3" style="text-align: left;">{{ item.jellemzok.nev }}</td>
                    <td class="col-2">@{{ item.felhasznaloNev }}</td>
                    <td class="col-3">{{ item.rekord.pontszam }} pont</td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg justify-content-center px-2" >
            <div class="table-responsive">
              <div id="seged-ranglista-felhasznalo-tarolo">
                <RouterLink @click="profil = ranglistaAdatok[valasztottIndex]" :to="{ name: 'profil', params: { userId: ranglistaAdatok[valasztottIndex].felhasznaloNev } }">
                  <img :src="ranglistaAdatok[valasztottIndex].jellemzok.kep" alt="Felhasználó kép" decoding="async" id="seged-ranglista-felhasznalo-kep">
                </RouterLink>
                <div>
                  <div id="felhasznalo-tarolo">
                    <span id="felhasznalo-nev">{{ranglistaAdatok[valasztottIndex].felhasznaloNev}}</span>
                    <div style="display: flex; justify-content: center;">
                      <Szint :exp="ranglistaAdatok[valasztottIndex].statisztika.exp" magassag="30px" szelesseg="200px" betumeret="18pt" />
                    </div>
                  </div>
                </div>
              </div>
              <table class="table table-borderless table-sm text-light">
                <thead>
                  <tr class="szemelyes-rekord-sor">
                    <td class="col-2">Pontszám</td>
                    <td class="col-2">{{ ranglistaAdatok[valasztottIndex].rekord.pontszam }}</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td class="col-2">Helyes / Helytelen</td>
                    <td class="col-2">{{ ranglistaAdatok[valasztottIndex].rekord.helyesHelytelen }}</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td class="col-2">Téma</td>
                    <td class="col-2">{{ temaSzoveg(ranglistaAdatok[valasztottIndex].rekord.tema) }}</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td class="col-2">Nehézség</td>
                    <td class="col-2">{{ nehezsegSzoveg(ranglistaAdatok[valasztottIndex].rekord.nehezseg) }}</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td class="col-2">Idő kérdésenként</td>
                    <td class="col-2">{{ ranglistaAdatok[valasztottIndex].rekord.ido }} mp</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td class="col-2">Kérdésszám</td>
                    <td class="col-2">{{ ranglistaAdatok[valasztottIndex].rekord.kerdesSzam }}</td>
                  </tr>
                  <tr class="szemelyes-rekord-sor">
                    <td class="col-2">Válaszszám</td>
                    <td class="col-2">{{ ranglistaAdatok[valasztottIndex].rekord.valaszSzam }}</td>
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
#tartalom {
  padding-top: 100px;
  width: 100%;
}

table {
  background: rgb(16, 16, 16);
  text-align: center;
}

#szuro-tarolo {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.dropdown-toggle {
  margin: 5px;
  width: 130px;
}

li {
  cursor: pointer;
}

.dropdown-item:active {
  background-color: rgb(255, 200, 0);
}

#ranglista-kereses {
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
}

#kereses-eredmeny-tarolo {
  cursor: pointer;
  position: absolute;
  z-index: 2;
  margin-top: 40px;
  margin-right: 40px;
}

#kereses-eredmeny {
  width: 220px;
}

.felhasznalo-kep {
  height: 40px;
  width: 40px;
  border-radius: 20px;
}

#keresett-felhasznalo {
  line-height: 40px;
  font-weight: 500;
}

#ranglista-felhasznalo-kep {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

tr:hover {
  background-color: rgb(20, 20, 20);
}

.container ul {
  width: 100%;
  overflow: hidden;
  list-style-position: inside;
}

td {
  line-height: 54px;
}

.szemelyes-rekord-sor td {
  font-size: 15pt;
  line-height: 54px;
}

#seged-ranglista-felhasznalo-tarolo {
  height: 191px;
  padding-top: 10px;
  padding-bottom: 20px;
  text-align: center;
  background: rgb(16, 16, 16);
}

#seged-ranglista-felhasznalo-kep {
  height: 100px;
  width: 100px;
  border-radius: 50%;
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

@media screen and (max-width: 540px) {
  tr {
    font-size: 12px;
  }

  #ranglista-felhasznalo-kep {
    height: 30px;
    width: 30px;
  }

  td {
    line-height: 30px;
  }
  
  .szemelyes-rekord-sor td {
    font-size: 16px;
    line-height: 32pt;
  }
}
</style>