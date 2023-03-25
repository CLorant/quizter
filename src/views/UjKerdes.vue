<script>
import axios from 'axios'
export default {
  data() {
    return {
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'],
      valasztottTema: '',
      nehezsegek: ['konnyu', 'kozepes', 'nehez'],
      valasztottNehezseg: '',
      kerdes: '',
      kep: null,
      kepUrl: '',
      valasz1: '',
      valasz2: '',
      valasz3: '',
      valasz4: '',
      valasz5: '',
      valasz6: '',
      kepMegjelenit: false
    }
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
          return "Téma";
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
          return "Nehézség";
      }
    },

    onFileChange(event) {
      const file = event.target.files[0];
      this.kep = file;
      this.kepUrl = URL.createObjectURL(file);
    },

    async createQuestion() {
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

        await axios.post('api/createQuestion', formData);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<template>
  <div id="tartalom">
    <div id="szuro-tarolo">
      <div class="dropdown my-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false" :value="valasztottTema">{{ temaSzoveg(valasztottTema) }}</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="tema in temak" :key="tema" class="dropdown-item" @click="valasztottTema = tema">{{ temaSzoveg(tema)
          }}</li>
        </ul>
      </div>
      <div class="dropdown my-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false" :value="valasztottNehezseg"> {{ nehezsegSzoveg(valasztottNehezseg) }}</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="nehezseg in nehezsegek" :key="nehezseg" class="dropdown-item" @click="valasztottNehezseg = nehezseg">
            {{ nehezsegSzoveg(nehezseg) }}</li>
        </ul>
      </div>
    </div>
    <input type="text" id="kerdes" v-model="kerdes" class="form-control text-light border-secondary w-100"
      placeholder="Kérdés">
    <input v-if="kepMegjelenit === false" type="file" id="kep" name="kep" @change="onFileChange" accept="image/*"
      class="form-control text-light border-secondary w-100" aria-label="Kép Input">
    <img v-else id="kep" :src="kepUrl" alt="Kérdés képe" decoding="async" />
    <button v-if="kep !== null" class="btn mb-3" :class="kepMegjelenit ? 'btn-secondary' : 'btn-light'"
      @click="kepMegjelenit = !kepMegjelenit">Kép {{ kepMegjelenit ? 'Elrejtése' : 'Megjelenítése' }}</button>
    <div id="gombTarolo">
      <div id="gombDiv">
        <input class="valaszGomb" v-model="valasz1" placeholder="Igaz válasz">
        <input class="valaszGomb" v-model="valasz2" placeholder="Hamis válasz">
        <input class="valaszGomb" v-model="valasz3" placeholder="Hamis válasz">
        <input class="valaszGomb" v-model="valasz4" placeholder="Hamis válasz">
        <input class="valaszGomb" v-model="valasz5" placeholder="Hamis válasz">
        <input class="valaszGomb" v-model="valasz6" placeholder="Hamis válasz">
      </div>
    </div>
    <div id="mentesGombDiv">
      <button id=mentesGomb class="bg-success" @click="createQuestion">
        Mentés
      </button>
    </div>
  </div>
</template>

<style scoped>
#tartalom {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  width: 100%;
  height: auto;
  margin-top: 60px;
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

.dropdown-item:active {
  background-color: rgb(255, 200, 0);
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
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.valaszGomb {
  font-weight: 500;
  text-align: center;
  border: none;
  border-radius: 15px;
  background-color: firebrick;
  font-size: 14pt;
  color: whitesmoke;
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

#mentesGombDiv {
  padding-top: 20px;
  text-align: center;
  padding-bottom: 50px;
}

#mentesGomb {
  font-weight: 500;
  border: none;
  border-radius: 12px;
  color: whitesmoke;
  font-size: 14pt;
  height: 60px;
  width: 160px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

input,
input:focus {
  background-color: #0D1117;
}

.valaszGomb:hover,
#folytatasGomb:hover {
  opacity: 0.8;
}

.form-control::-webkit-input-placeholder {
  color: gray;
}

.valaszGomb::-webkit-input-placeholder {
  color: rgb(200, 200, 200)
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

  #mentesGomb {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 1.5vw;
    height: 7vh;
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

  #mentesGomb {
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

  #mentesGomb {
    font-size: 4.5vw;
    width: 40%;
  }
}
</style>