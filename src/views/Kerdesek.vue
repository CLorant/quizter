<script>
import axios from 'axios';
import kerdesvalaszokJSON from '../kerdesvalasz.json' // átmeneti
import TemaGomb from '../components/TemaGomb.vue';

export default {
  components: {
    TemaGomb
  },

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
  }
}
</script>

<template>
  <div id="tartalom">
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
      <button class="btn btn-warning fw-semibold my-auto szuroGomb" @click="getQuestions">
        Szűrés
      </button>
    </div>
    
    <div id="kerdes-valasz-tarolo" class="my-5">
      <RouterLink to="/kerdes/1" v-for="(value, key) in kerdesvalaszok" :key="key" class="row w-100 my-3 text-decoration-none text-light">
        <div class="col-2 d-flex align-items-center justify-content-center">
          <img :src="value.kerdes.kep" alt="Kérdés Képe" id="kep">
        </div>
        <p class="col-3 fw-bold">{{ value.kerdes.szoveg }}</p>&nbsp;
        <p class="col-1 text-success">{{ value.valaszok.valasz1.szoveg }}</p>&nbsp;
        <p class="col-1 text-danger">{{ value.valaszok.valasz2.szoveg }}</p>&nbsp;
        <p class="col-1 text-danger">{{ value.valaszok.valasz3.szoveg }}</p>&nbsp;
        <p class="col-1 text-danger">{{ value.valaszok.valasz4.szoveg }}</p>&nbsp;
        <p class="col-1 text-danger">{{ value.valaszok.valasz5.szoveg }}</p>&nbsp;
        <p class="col-1 text-danger">{{ value.valaszok.valasz6.szoveg }}</p>
      </RouterLink>
    </div>
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
  }

  .szuroGomb {
    width: 130px;
    margin: 5px;
  }

  .dropdown-toggle {
    margin: 5px;
    width: 130px;
  }

  .dropdown-item:active {
    background-color: rgb(255, 200, 0);
  }

  ul {
    cursor: pointer;
  }

  #kerdes-valasz-tarolo {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(16, 16, 16);
    border-radius: 15px;
    cursor: pointer;
  }

  #kep {
    height: 40px;
  }

  #kerdes-valasz-tarolo div p {
    font-size: 12pt;
  }

  .row:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 600px) {
    #kerdes-valasz-tarolo {
      align-items: unset;
      justify-content: unset;
    }

    #kep {
      height: 7vw;
    }
  }
</style>