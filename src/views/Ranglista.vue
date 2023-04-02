<template>
  <Hiba v-if="hiba" />
  <Toltes v-else-if="toltes" />
  <div v-else id="tartalom">
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
      <button class="btn btn-warning fw-semibold my-auto szuroGomb" @click="getUsersByRecord">
        Szűrés
      </button>
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
                    <td class="col-1"><img :src="item.jellemzok.kep" :alt="item.felhasznalonev + ' képe'" decoding="async" id="ranglista-felhasznalo-kep" width="45" height="45"></td>
                    <td class="col-3" style="text-align: left;">{{ item.jellemzok.nev }}</td>
                    <td class="col-2">@{{ item.felhasznalonev }}</td>
                    <td class="col-3">{{ item.rekord.pontszam }} pont</td>
                  </tr>
                  <tr>
                    <td colspan="5" @click="getUsersByRecord">
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
                <RouterLink @click="profil = ranglistaAdatok[valasztottIndex]" :to="{ name: 'profil', params: { felhasznaloId: ranglistaAdatok[valasztottIndex].felhasznalonev } }">
                  <img :src="ranglistaAdatok[valasztottIndex].jellemzok.kep" alt="Felhasználó kép" decoding="async" id="seged-ranglista-felhasznalo-kep" width="100" height="100">
                </RouterLink>
                <div>
                  <div id="felhasznalo-tarolo">
                    <span id="felhasznalo-nev">{{ranglistaAdatok[valasztottIndex].felhasznalonev}}</span>
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

<script>
import Toltes from '../components/Toltes.vue';
import Hiba from '../components/Hiba.vue';
import Szint from '../components/Szint.vue';
import { mapWritableState } from 'pinia';
import { useProfilStore } from '../stores/profil';
import axios from 'axios';
import ranglistaJSON from '../ranglista.json'; // átmeneti

export default {
  components: {
    Toltes,
    Hiba,
    Szint
  },

  data() {
    return {
      toltes: true,
      hiba: false,
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

  created() {
    this.getUsersByRecord();
    /*
    this.ranglistaAdatok = ranglistaJSON; // átmeneti
    this.toltes = false; // átmeneti
    */
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
    async getUsersByRecord() {
      await axios.get(`${import.meta.env.VITE_API_URL}/getUsersByRecord/${this.valasztottTema}/${this.valasztottNehezseg}/${this.valasztottIdo}/${this.valasztottKerdesSzam}/${this.valasztottValaszSzam}`)
        .then(response => {
          // nem végleges
          if (this.ranglistaAdatok.length === 0) {
            this.ranglistaAdatok = response.data;
          }
          else {
            this.ranglistaAdatok += response.data;
          }
          this.toltes = false;
        })
        .catch(error => {
          this.hiba = true;
          console.log(error);
        });
      // ha this.ranglistaAdatok.length === 0 akkor '=', más esetben '+=' WIP
    },

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
  }
}
</script>

<style scoped>
#tartalom {
  overflow-x: hidden;
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

.szuroGomb {
  width: 130px;
  margin: 5px;
}

.dropdown-toggle {
  margin: 5px;
  width: 130px;
}

ul {
  cursor: pointer;
}

.dropdown-item:active {
  background-color: rgb(255, 200, 0);
}

.felhasznalo-kep {
  height: 40px;
  width: 40px;
  border-radius: 20px;
}

#ranglista-felhasznalo-kep {
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
  color: whitesmoke;
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