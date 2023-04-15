<template>
  <Hiba v-if="hiba" />
  <Toltes v-else-if="toltes" />
  <div v-else id="tartalom">
    <div class="row justify-content-center">
      <div class="row col-lg-8" ref="fo_ranglista">
        <div class="table-responsive fo-ranglista-tarolo">
          <table class="table table-borderless table-sm text-light" id="fo-ranglista">
            <tbody>
              <tr>
                <td colspan="5">
                  <div class="d-flex justify-content-around flex-row mb-3">
                    <div id="szuresDiv">
                      <img :src="`/img/tema/kicsi/${valasztottTema}.webp`" alt="Téma képe" decoding="async" id="szuresKep" width="360" height="80">
                      <div id="szuresKepSzoveg">
                        <div class="dropdown-toggle" role="button" aria-expanded="false" data-bs-toggle="dropdown">
                          {{ temaSzoveg(valasztottTema) }}
                          <div class="dropdown-menu dropdown-menu-dark mt-3">
                            <p v-for="t in temak" :key="t" class="dropdown-item" :class="valasztottTema == t ? 'disabled' : ''"
                              @click="valasztottTema = t; getLeaderboard()">{{ temaSzoveg(t) }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="szuresDiv">
                      <div id="szuresKep" :class="valasztottNehezseg"></div>
                      <div id="szuresKepSzoveg">
                        <div class="dropdown-toggle" role="button" aria-expanded="false" data-bs-toggle="dropdown">
                          {{ nehezsegSzoveg(valasztottNehezseg) }}
                          <div class="dropdown-menu dropdown-menu-dark mt-3">
                            <p v-for="n in nehezsegek" :key="n" class="dropdown-item" :class="valasztottNehezseg == n ? 'disabled' : ''"
                              @click="valasztottNehezseg = n; getLeaderboard()">{{ nehezsegSzoveg(n) }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
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
      lekerdezesMegszakit: false,
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'],
      valasztottTema: 'foldrajz',
      nehezsegek: ['konnyu', 'kozepes', 'nehez'],
      valasztottNehezseg: 'konnyu',
      valasztottIndex: 'felhasznalo1',
      ranglistaAdatok: []
    }
  },

  created() {
    this.getLeaderboard();
  },

  methods: {
    async getLeaderboard() {
      if (this.keresesMegszakit) {
        this.keresesMegszakit.cancel();
      }
      this.keresesMegszakit = axios.CancelToken.source();
      
      await axios.get(`${import.meta.env.VITE_API_URL}/getLeaderboard/${this.valasztottTema}/${this.valasztottNehezseg}`, {cancelToken: this.lekerdezesMegszakit.token})
        .then(response => {
          this.ranglistaAdatok = response.data;
          this.toltes = false;
        })
        .catch(error => {
          if (!axios.isCancel(error)) {
            this.hiba = true;
            console.log('Hiba:', error.message);
          }
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

.fo-ranglista-tarolo {
  background: rgb(16, 16, 16);
  min-height: 600px;
  margin-bottom: 10px;
}

#szuresDiv {
  position: relative;
  margin-top: 20px;
  width: 90%;
}

#szuresKep {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  height: 80px;
  width: 100%;
  max-width: 360px;
  object-fit: cover;
}

#szuresKepSzoveg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(1rem, 2.5vw, 2rem);
}

.konnyu {
  background-color: green;
}

.kozepes {
  background-color: rgb(180, 120, 0);
}

.nehez {
  background-color: firebrick;
}

.dropdown-item {
  line-height: 24px;
  margin: 0;
}

table {
  background: rgb(16, 16, 16);
  text-align: center;
}

#fo-ranglista {
  cursor: pointer;
}

#fo-ranglista tbody tr:nth-child(2) .helyezes {
  background-color: rgb(155, 110, 0); /* sötét arany */
  color: white;
  font-weight: bold;
}

#fo-ranglista tbody tr:nth-child(3) .helyezes {
  background-color: rgb(100, 100, 100); /* sötét ezüst */
  color: white;
  font-weight: bold;
}

#fo-ranglista tbody tr:nth-child(4) .helyezes {
  background-color: rgb(150, 75, 30); /* sötét bronz */
  color: white;
  font-weight: bold;
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

#fo-ranglista tbody tr:nth-child(1) {
  cursor: default;
}

#fo-ranglista tbody tr:not(:nth-child(1)):hover {
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

button, table:nth-child(2), .dropdown-menu, .fo-ranglista-tarolo {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media screen and (max-width: 991px) {
  #szuresKepSzoveg {
    font-size: 4vw;
  }

  .seged-ranglista {
    width: 500px;
  }

  .table-responsive {
    padding-left: 0;
    padding-right: 0;
  }
}

@media screen and (max-width: 540px) {
  #szuresKepSzoveg {
    font-size: 5vw;
  }

  #szuresKep {
    height: 60px;
    width: 90%;
  }

  .fo-ranglista-tarolo {
    min-height: 500px;
  }

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