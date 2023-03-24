<script>
import { mapWritableState } from 'pinia';
import { useKerdesStore } from '../stores/kerdes';
import axios from 'axios';
import kerdesvalaszokJSON from '../kerdesvalasz.json'; // átmeneti

export default {
  data() {
    return {
      kerdesvalaszok: null,
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'],
      valasztottTema: 'autok',
      nehezsegek: ['konnyu', 'kozepes', 'nehez'],
      valasztottNehezseg: 'konnyu'
    }
  },

  mounted() {
    this.getQuestions();
  },

  computed: {
    ...mapWritableState(useKerdesStore, ['tema', 'nehezseg', 'kerdes', 'valaszok'])
  },

  methods: {
    async getQuestions() {
      try {
        const res = await axios.get(`api/getQuestions/${this.valasztottTema}/${this.valasztottNehezseg}`);
        this.kerdesvalaszok = res.data;
      } catch (error) {
        console.log(error);
      }
      
      this.kerdesvalaszok = kerdesvalaszokJSON // átmeneti
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

    kerdesOldalNavigacio(value, index) {
      this.tema = this.valasztottTema;
      this.nehezseg = this.valasztottNehezseg;
      this.kerdes = value.kerdes;
      this.valaszok = value.valaszok;
      this.$router.push(`kerdes/${index}`);
    }
  }
}
</script>

<template>
  <div id="tartalom">
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
        <tr v-for="(value, index) in kerdesvalaszok" :key="index" @click="kerdesOldalNavigacio(value, index)">
          <td class="text-center"><img :src="value.kerdes.kep" alt="Kérdés Képe" id="kep" decoding="async"></td>
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
    height: 40px;
  }

  #kerdes-valasz-tarolo td {
    cursor: pointer;
    padding: 10px;
  }

  #kerdes-valasz-tarolo tr:hover {
    background-color: rgba(255, 255, 255, 0.1);
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