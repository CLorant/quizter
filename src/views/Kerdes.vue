<script>
import { mapWritableState } from 'pinia';
import { useKerdesStore } from '../stores/kerdes';
import axios from 'axios';
export default {
  data() {
    return {
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'],
      valasztottTema: 'autok',
      nehezsegek: ['konnyu', 'kozepes', 'nehez'],
      valasztottNehezseg: 'konnyu',
      modKerdesSzoveg: '',
      modKep: null,
      modKepUrl: null,
      modValasz1: '',
      modValasz2: '',
      modValasz3: '',
      modValasz4: '',
      modValasz5: '',
      modValasz6: '',
      kepMegjelenit: false,
      modositas: false,
      torles: false
    }
  },

  beforeMount() {
    if (this.tema === "nem-meghatarozott") {
      this.$router.push("/kerdesek");
    }
  },

  computed: {
    ...mapWritableState(useKerdesStore, ['tema', 'nehezseg', 'kerdes', 'valaszok'])
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
      this.modKep = file;
      this.modKepUrl = URL.createObjectURL(file);
    },

    async updateQuestion() {
      try {
        // statek beállítása
        this.tema = this.valasztottTema;
        this.nehezseg = this.valasztottNehezseg;
        this.kerdes.szoveg = this.modKerdesSzoveg;
        this.kerdes.kep = this.modKepUrl;
        this.valaszok.valasz1.szoveg = this.modValasz1;
        this.valaszok.valasz2.szoveg = this.modValasz2;
        this.valaszok.valasz3.szoveg = this.modValasz3;
        this.valaszok.valasz4.szoveg = this.modValasz4;
        this.valaszok.valasz5.szoveg = this.modValasz5;
        this.valaszok.valasz6.szoveg = this.modValasz6;
        this.modositas = false;
        const formData = new FormData();

        formData.append('tema', this.valasztottTema);
        formData.append('nehezseg', this.valasztottNehezseg);
        formData.append('kerdes', this.modKerdesSzoveg);
        formData.append('valasz1', this.modValasz1);
        formData.append('valasz2', this.modValasz2);
        formData.append('valasz3', this.modValasz3);
        formData.append('valasz4', this.modValasz4);
        formData.append('valasz5', this.modValasz5);
        formData.append('valasz6', this.modValasz6);

        if (this.modKep) {
          formData.append('kep', this.modKep);
        }

        await axios.patch('api/updateQuestion', formData);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteQuestion() {
      try {
        this.$router.push("/kerdesek");
        await axios.delete(`api/deleteQuestion/${this.$route.params.kerdesId}`);
      } catch (error) {
        console.log(error);
      }
    },

    modositasKezelo() {
      // értékek beállítása
      this.valasztottTema = this.tema;
      this.valasztottNehezseg = this.nehezseg;
      this.modKerdesSzoveg = this.kerdes.szoveg;
      this.modKepUrl = this.kerdes.kep;
      this.modValasz1 = this.valaszok.valasz1.szoveg;
      this.modValasz2 = this.valaszok.valasz2.szoveg;
      this.modValasz3 = this.valaszok.valasz3.szoveg;
      this.modValasz4 = this.valaszok.valasz4.szoveg;
      this.modValasz5 = this.valaszok.valasz5.szoveg;
      this.modValasz6 = this.valaszok.valasz6.szoveg;
      this.modositas = true;
    }
  }
}
</script>

<template>
  <div id="tartalom">
    <div v-if="modositas">
      <div id="szuro-tarolo">
        <div class="dropdown my-1">
          <button type="button" class="btn btn-dark dropdown-toggle szuroGomb" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" :value="valasztottTema">{{ temaSzoveg(valasztottTema) }}</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li v-for="tema in temak" :key="tema" class="dropdown-item" @click="valasztottTema = tema">{{ temaSzoveg(tema) }}</li>
          </ul>
        </div>
        <div class="dropdown my-1">
          <button type="button" class="btn btn-dark dropdown-toggle szuroGomb" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" :value="valasztottNehezseg"> {{ nehezsegSzoveg(valasztottNehezseg)
            }}</button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li v-for="nehezseg in nehezsegek" :key="nehezseg" class="dropdown-item"
              @click="valasztottNehezseg = nehezseg">{{ nehezsegSzoveg(nehezseg) }}</li>
          </ul>
        </div>
      </div>
      <input id="kerdes" type="text" v-model="modKerdesSzoveg" class="form-control text-light border-secondary w-100">
      <input v-if="kepMegjelenit === false" type="file" id="kep" name="kep" @change="onFileChange" accept="image/*"
        class="form-control text-light border-secondary w-100">
      <img v-else id="kep" :src="modKepUrl" alt="Kérdés képe" decoding="async" />
      <button v-if="modKep || modKepUrl !== null" class="btn mb-3" :class="kepMegjelenit ? 'btn-secondary' : 'btn-light'"
        @click="kepMegjelenit = !kepMegjelenit">Kép {{ kepMegjelenit ? 'Elrejtése' : 'Megjelenítése' }}</button>
      <div id="gombTarolo">
        <div id="gombDiv">
          <input class="valaszGomb" v-model="modValasz1">
          <input class="valaszGomb" v-model="modValasz2">
          <input class="valaszGomb" v-model="modValasz3">
          <input class="valaszGomb" v-model="modValasz4">
          <input class="valaszGomb" v-model="modValasz5">
          <input class="valaszGomb" v-model="modValasz6">
        </div>
      </div>
    </div>
    <div v-else>
      <div id="szuro-tarolo">
        <div class="btn btn-dark szuroGomb my-1">
          {{ temaSzoveg(tema) }}
        </div>
        <div class="btn btn-dark szuroGomb my-1">
          {{ nehezsegSzoveg(nehezseg) }}
        </div>
      </div>
      <h3 id="kerdes">{{ kerdes.szoveg }}</h3>
      <img id="kep" :src="kerdes.kep" alt="Kérdés képe" decoding="async" />
      <div id="gombTarolo">
        <div id="gombDiv">
          <button v-for="(value, index) in valaszok" :key="index" class="valaszGomb">
            {{ value.szoveg }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="modositas">
      <button class="btn btn-lg btn-secondary muveletGomb" @click="modositas = false">
        Mégse
      </button>
      <button class="btn btn-lg btn-success muveletGomb" @click="updateQuestion">Mentés</button>
    </div>
    <div v-else-if="torles" class="d-flex flex-column">
      <div class="mb-4">
        <b class="fs-2">Biztos törli?</b>
      </div>
      <div>
        <button class="btn btn-lg btn-secondary muveletGomb" @click="torles = false">Mégse</button>
        <button class="btn btn-lg btn-danger muveletGomb" @click="deleteQuestion">Törlés</button>
      </div>
    </div>
    <div v-else>
      <RouterLink to="/kerdesek" class="btn btn-lg btn-secondary muveletGomb">Vissza</RouterLink>
      <button class="btn btn-lg btn-success muveletGomb" @click="modositasKezelo">Módosítás</button>
      <button class="btn btn-lg btn-danger muveletGomb" @click="torles = true">Törlés</button>
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

.szuroGomb {
  width: 130px;
  height: 40px;
  margin: 5px;
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
  border-radius: 15px;
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
  background-color: firebrick;
  font-size: 14pt;
  color: white;
  height: 80px;
  max-width: 246px;
  width: 42%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  white-space: pre-wrap;
}

.valaszGomb:focus {
  background-color: firebrick;
}

#gombDiv .valaszGomb:nth-child(1) {
  background-color: green;
}

.muveletGomb {
  width: 140px;
  margin: 10px;
}

input,
input:focus {
  background-color: #0D1117;
}

.valaszGomb:hover,
#folytatasGomb:hover {
  opacity: 0.8;
}

@media screen and (max-height: 800px) {
  #kep {
    height: 20vh;
  }

  #kerdes {
    font-size: 3vw;
  }

  .valaszGomb {
    height: 8vh;
    font-size: 1.5vw;
  }

  .muveletGomb {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 1.5vw;
  }
}

@media screen and (max-width: 997px) {
  #korSzamlalo {
    font-size: 2.5vw;
  }

  #kep {
    height: 20vh;
    object-fit: cover;
  }

  #kerdes {
    font-size: 4vw;
  }

  .valaszGomb {
    margin: 1vw;
    height: 5.5vh;
    font-size: 2.5vw;
  }
}

@media screen and (max-width: 500px) {
  #korSzamlalo {
    font-size: 4.5vw;
  }

  #kerdes {
    position: relative;
    font-size: 6vw;
  }

  .valaszGomb {
    height: 7.5vh;
    font-size: 3.5vw;
  }

  #gombDiv {
    width: 100%;
  }

  .muveletGomb {
    font-size: 3.5vw;
    width: 30%;
    margin: 4px;
  }
}
</style>