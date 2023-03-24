<script>
import axios from 'axios'
  export default {
    data() {
      return {
        temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'],
        valasztottTema: 'autok',
        nehezsegek: ['konnyu', 'kozepes', 'nehez'],
        valasztottNehezseg: 'konnyu',
        kerdes: '',
        kep: null,
        kepUrl: '',
        valasz1: '',
        valasz2: '',
        valasz3: '',
        valasz4: '',
        valasz5: '',
        valasz6: '',
        kepMegjelenit: false,
        modositas: false,
        torles: false
      }
    },

    beforeMount() {

      /*
      try {
        const res = axios.get(`/api/getQuestion/${this.$route.params.kerdesId}`);
      } catch (error) {
        console.log(error);
      }
      */
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

      onFileChange(event) {
        const file = event.target.files[0];
        this.kep = file;
        this.kepUrl = URL.createObjectURL(file);
      },

      async updateQuestion() {
        try {
          const formData = new FormData();

          formData.append('tema', this.valasztottTema);
          formData.append('nehezseg', this.valasztottNehezseg);
          formData.append('kerdes', this.kerdes);
          formData.append('valasz1', this.valasz1);
          formData.append('valasz2', this.valasz2);
          formData.append('valasz3', this.valasz3);
          formData.append('valasz4', this.valasz4);
          formData.append('valasz5', this.valasz5);
          formData.append('valasz6', this.valasz6);

          if (this.kep) {
            formData.append('kep', this.kep);
          }

        await axios.patch('api/updateQuestion', formData);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>

<template>
  <div id="tartalom">
    <div v-if="modositas">
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
      </div>
      <input id="kerdes" type="text" v-model="kerdes" class="form-control text-light border-secondary w-100">
      <input v-if="kepMegjelenit===false" type="file" id="kep" name="kep" @change="onFileChange" accept="image/*" class="form-control text-light border-secondary w-100">
      <img v-else id="kep" :src="kepUrl" alt="Kérdés képe" decoding="async" />
      <button v-if="kep !== null" class="btn mb-3" :class="kepMegjelenit ? 'btn-secondary' : 'btn-light'" @click="kepMegjelenit = !kepMegjelenit">Kép {{ kepMegjelenit ? 'Elrejtése' : 'Megjelenítése' }}</button>
      <div id="gombTarolo">
        <div id="gombDiv">
          <input class="valaszGomb" v-model="valasz1">
          <input class="valaszGomb" v-model="valasz2">
          <input class="valaszGomb" v-model="valasz3">
          <input class="valaszGomb" v-model="valasz4">
          <input class="valaszGomb" v-model="valasz5">
          <input class="valaszGomb" v-model="valasz6">
        </div>
      </div>
    </div>
    <div v-else>
      <h3 id="kerdes">{{ kerdes.szoveg }}</h3>
      <img id="kep" :src="kerdes.kep" alt="Kérdés képe" decoding="async" />
      <div id="gombTarolo">
        <div id="gombDiv">
          <button v-for="(value, index) in valaszok" :key="index" class="valaszGomb" :style="{backgroundColor: index === 0 ? 'green' : 'firebrick'}">
            {{ value.szoveg }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="modositas">
      <button class="btn btn-lg btn-secondary m-2" @click="modositas = false">Mégse</button>
      <button class="btn btn-lg btn-success m-2" @click="updateQuestion">Módosítás</button>
    </div>
    <div v-else-if="torles" class="d-flex flex-column">
      <div class="mb-4">
        <b class="fs-2">Biztos törli?</b>
      </div>
      <div>
        <button class="btn btn-lg btn-secondary m-2" @click="torles = false">Mégse</button>
        <button class="btn btn-lg btn-danger m-2" @click="deleteQuestion">Törlés</button>
      </div>
    </div>
    <div v-else>
      <RouterLink to="/kerdesek" class="btn btn-lg btn-secondary m-2">Vissza</RouterLink>
      <button class="btn btn-lg btn-success m-2" @click="modositas = true">Módosítás</button>
      <button class="btn btn-lg btn-danger m-2" @click="torles = true">Törlés</button>
    </div>
  </div>
</template>

<style scoped>
  #tartalom {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
    width: 100%;
    height: auto;
    margin-top: 60px;
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

  ul {
    cursor: pointer;
  }

  #kerdes {
    text-align: center;
    margin-bottom: 25px;
    font-size: 28pt;
  }

  #kep {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 300px;
    max-width: 95%;
    width: auto;
    border-radius: 1vw;
    margin-bottom: 25px;
  }

  #gombTarolo {
    text-align: center;
  }

  #gombDiv {
    width: 80%;
    padding-bottom: 25px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .valaszGomb {
    text-align: center;
    border: none;
    border-radius: 15px;
    background-color: #4C4C4C;
    font-size: 14pt;
    color: white;
    height: 80px;
    max-width: 246px;
    width: 42%;
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    white-space: pre-wrap;
  }

  input,
  input:focus {
    background-color: #0D1117;
  }

  .valaszGomb:hover,
  #folytatasGomb:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 500px) {
  #kerdes {
    font-size: 6vw;
  }

  #kep {
    height: 100px;
  }

  .valaszGomb {
    height: 7.5vh;
    font-size: 3.5vw;
  }

  #gombDiv {
    width: 100%;
  }
}
</style>