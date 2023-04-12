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
          aria-haspopup="true" aria-expanded="false" :value="valasztottValaszSzam">{{ valasztottValaszSzam }} válasz</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="valaszSzam in valaszSzamok" :key="valaszSzam" class="dropdown-item" @click="valasztottValaszSzam = valaszSzam">{{ valaszSzam }} válasz</li>
        </ul>
      </div>
      <button class="btn btn-warning fw-semibold my-auto szuroGomb" @click="getUsersByRecord">
        Szűrés
      </button>
    </div>

    <div class="row justify-content-center">
      <div class="row col-lg-8" ref="fo_ranglista">
        <div class="table-responsive">
          <table class="table table-borderless table-sm text-light" id="fo-ranglista">
            <tbody>
              <tr v-for="(item, index) in ranglistaAdatok" :key="index" @click="indexAllit(index)">
                <td class="col-auto helyezes">{{ index.substring(11) }}.</td>
                <td class="col-1"><img :src="item.kep" alt="kép" decoding="async" id="ranglista-felhasznalo-kep" width="45" height="45"></td>
                <td class="col-auto text-start">{{ item.nev }}</td>
                <td class="col-auto handle">@{{ item.felhasznalonev }}</td>
                <td class="col-auto">{{ item.rekord.pontszam }} pont</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-4 justify-content-center seged-ranglista" ref="seged_ranglista">
        <div class="table-responsive">
          <div id="seged-ranglista-felhasznalo-tarolo">
            <RouterLink :to="{ name: 'profil', params: { felhasznaloId: ranglistaAdatok[valasztottIndex].felhasznalonev } }">
              <img :src="ranglistaAdatok[valasztottIndex].kep" alt="Felhasználó kép" decoding="async" id="seged-ranglista-felhasznalo-kep" width="100" height="100">
            </RouterLink>
            <div>
              <div id="felhasznalo-tarolo">
                <span id="felhasznalo-nev">{{ranglistaAdatok[valasztottIndex].felhasznalonev}}</span>
                <div>
                  <Szint :exp="ranglistaAdatok[valasztottIndex].exp" magassag="30px" szelesseg="200px" betumeret="18pt" />
                </div>
              </div>
            </div>
          </div>
          <table class="table table-borderless table-sm text-light">
            <tbody>
              <tr class="szemelyes-rekord-sor">
                <td>Pontszám</td>
                <td>{{ ranglistaAdatok[valasztottIndex].rekord.pontszam }}</td>
              </tr>
              <tr class="szemelyes-rekord-sor">
                <td>Helyes / Helytelen</td>
                <td>{{ ranglistaAdatok[valasztottIndex].rekord.helyesHelytelen }}</td>
              </tr>
              <tr class="szemelyes-rekord-sor">
                <td>Téma</td>
                <td>{{ temaSzoveg(ranglistaAdatok[valasztottIndex].rekord.tema) }}</td>
              </tr>
              <tr class="szemelyes-rekord-sor">
                <td>Nehézség</td>
                <td>{{ nehezsegSzoveg(ranglistaAdatok[valasztottIndex].rekord.nehezseg) }}</td>
              </tr>
              <tr class="szemelyes-rekord-sor">
                <td>Idő kérdésenként</td>
                <td>{{ ranglistaAdatok[valasztottIndex].rekord.ido }} mp</td>
              </tr>
              <tr class="szemelyes-rekord-sor">
                <td>Kérdésszám</td>
                <td>{{ ranglistaAdatok[valasztottIndex].rekord.kerdesSzam }}</td>
              </tr>
              <tr class="szemelyes-rekord-sor">
                <td>Válaszszám</td>
                <td>{{ ranglistaAdatok[valasztottIndex].rekord.valaszSzam }}</td>
              </tr>
            </tbody>
          </table>
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
import { temaSzoveg, nehezsegSzoveg } from '../tema-nehezseg-szoveg';

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
      ranglistaAdatok: []
    }
  },

  created() {
    this.getUsersByRecord();
  },

  computed: {
    ...mapWritableState(useProfilStore, ['profil'])
  },

  methods: {
    async getUsersByRecord() {
      await axios.get(`${import.meta.env.VITE_API_URL}/getUsersByRecord/${this.valasztottTema}/${this.valasztottNehezseg}/${this.valasztottIdo}/${this.valasztottKerdesSzam}/${this.valasztottValaszSzam}`)
        .then(response => {
          this.ranglistaAdatok = response.data;
          this.toltes = false;
        })
        .catch(error => {
          this.hiba = true;
          console.log('Hiba:', error.message);
        });
    },

    indexAllit(index) {
      this.valasztottIndex = index;
      if(window.matchMedia('(max-width: 991px)').matches) {
        this.$refs.seged_ranglista.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    
    temaSzoveg,
    nehezsegSzoveg
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

#fo-ranglista {
  cursor: pointer;
}

#fo-ranglista tbody tr:nth-child(1) .helyezes {
  background-color: rgb(155, 110, 0); /* sötét arany */
  color: white;
  font-weight: bold;
}

#fo-ranglista tbody tr:nth-child(2) .helyezes {
  background-color: rgb(100, 100, 100); /* sötét ezüst */
  color: white;
  font-weight: bold;
}

#fo-ranglista tbody tr:nth-child(3) .helyezes {
  background-color: rgb(150, 75, 30); /* sötét bronz */
  color: white;
  font-weight: bold;
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

td {
  line-height: 54px;
}

.szemelyes-rekord-sor {
  text-align: left;
}

.szemelyes-rekord-sor td {
  font-size: 14pt;
  line-height: 54px;
}

.szemelyes-rekord-sor td:nth-child(1) {
  padding-left: 5%;
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

#felhasznalo-tarolo div {
  display: flex;
  justify-content: center;
}

#felhasznalo-nev {
  font-size: 22pt;
  font-weight: bold;
  color: whitesmoke;
}

table, button, .dropdown-menu {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media screen and (max-width: 991px) {
  .seged-ranglista {
    width: 500px;
  }

  .table-responsive {
    padding-left: 0;
    padding-right: 0;
  }
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
    line-height: 32pt;
    font-size: 12pt;
  }
}

@media screen and (max-width: 400px) {
  .text-start {
    display: none;
  }

  .handle {
    text-align: left;
  } 
}
</style>