<template>
  <Hiba v-if="hiba"/>
  <Toltes v-else-if="toltes" />
  <div v-else id="tartalom">
    <div id="szuro-tarolo">
      <div class="dropdown">
        <button type="button" class="btn btn-dark dropdown-toggle szuroGomb" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" :value="valasztottTema">{{ temaSzoveg(valasztottTema) }}</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="tema in temak" :key="tema" class="dropdown-item" @click="valasztottTema = tema">{{ temaSzoveg(tema) }}</li>
        </ul>
      </div>
      <div class="dropdown">
        <button type="button" class="btn btn-dark dropdown-toggle szuroGomb" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" :value="valasztottNehezseg"> {{ nehezsegSzoveg(valasztottNehezseg) }}</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="nehezseg in nehezsegek" :key="nehezseg" class="dropdown-item" @click="valasztottNehezseg = nehezseg">{{ nehezsegSzoveg(nehezseg) }}</li>
        </ul>
      </div>
      <button class="btn btn-warning fw-semibold szuroGomb" @click="getQuestions">
        Szűrés
      </button>
    </div>
    <table id="kerdes-valasz-tarolo" class="my-5">
      <tbody>
        <br>
        <tr v-for="(value, index) in kerdesvalaszok" :key="index" @click="$router.push(`kerdes/${index}`);">
          <td class="text-center"><img :src="value.kerdes.kep" alt="Kérdés Képe" id="kep" decoding="async" width="80" height="40"></td>
          <td class="fw-bold">{{ value.kerdes.szoveg }}</td>
          <td class="text-success">{{ value.valaszok.valasz1.szoveg }}</td>
          <td class="text-danger">{{ value.valaszok.valasz2.szoveg }}</td>
          <td class="text-danger">{{ value.valaszok.valasz3.szoveg }}</td>
          <td class="text-danger">{{ value.valaszok.valasz4.szoveg }}</td>
          <td class="text-danger">{{ value.valaszok.valasz5.szoveg }}</td>
          <td class="text-danger">{{ value.valaszok.valasz6.szoveg }}</td>
        </tr>
        <br>
      </tbody>
    </table>
  </div>
</template>

<script>
import Toltes from '../components/Toltes.vue';
import Hiba from '../components/Hiba.vue';
import { mapWritableState } from 'pinia';
import { useKerdesStore } from '../stores/kerdes';
import axios from 'axios';
import Cookies from 'js-cookie';
import { temaSzoveg, nehezsegSzoveg } from '../tema-nehezseg-szoveg'

export default {
  components: {
    Toltes,
    Hiba
  },

  data() {
    return {
      toltes: true,
      hiba: false,
      kerdesvalaszok: {},
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'],
      valasztottTema: 'autok',
      nehezsegek: ['konnyu', 'kozepes', 'nehez'],
      valasztottNehezseg: 'konnyu'
    }
  },

  created() {
    this.getQuestions();
  },

  computed: {
    ...mapWritableState(useKerdesStore, ['tema', 'nehezseg', 'kerdes', 'valaszok'])
  },

  methods: {
    async getQuestions() {
      await axios.get(`${import.meta.env.VITE_API_URL}/getQuestions/${this.valasztottTema}/${this.valasztottNehezseg}`,{
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        })
        .then(response => {
          this.kerdesvalaszok = response.data;
          this.toltes = false;
        })
        .catch(error => {
          this.hiba = true;
          console.log('Hiba:', error.message);
        });
    },
    
    temaSzoveg,
    nehezsegSzoveg
  }
}
</script>

<style scoped>
#tartalom {
  margin-top: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#szuro-tarolo {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

.szuroGomb {
  width: 130px;
  height: 40px;
  margin: 5px;
}

.dropdown-item:active {
  background-color: rgb(255, 200, 0);
}

ul {
  cursor: pointer;
}

#kerdes-valasz-tarolo {
  width: 95%;
  border-collapse: collapse;
  background-color: rgb(16, 16, 16);
  border-radius: 15px;
}

#kep {
  width: auto;
}

#kerdes-valasz-tarolo td {
  cursor: pointer;
  padding: 10px;
}

#kerdes-valasz-tarolo tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

table, button, .dropdown-menu {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media only screen and (max-width: 900px) {
  .text-danger {
    display: none;
  }
}

@media only screen and (max-width: 350px) {
  td {
    font-size: 4vw;
  }
}
</style>