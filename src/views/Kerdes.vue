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
        class="form-control text-light border-secondary w-100" aria-label="Kép Input">
      <img v-else id="kep" :src="modKepUrl" alt="Kérdés képe" decoding="async" height="300">
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
        <div class="btn btn-dark szuroGomb my-2">
          {{ temaSzoveg(tema) }}
        </div>
        <div class="btn btn-dark szuroGomb my-2">
          {{ nehezsegSzoveg(nehezseg) }}
        </div>
      </div>
      <h3 id="kerdes">{{ kerdes.szoveg }}</h3>
      <img id="kep" :src="kerdes.kep" alt="Kérdés képe" decoding="async" height="300">
      <div id="gombTarolo">
        <div id="gombDiv">
          <button v-for="(value, index) in valaszok" :key="index" class="valaszGomb">
            <span class="valaszSzoveg">{{ value.szoveg }}</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="modositas">
      <button class="btn btn-lg btn-secondary muveletGomb" @click="modositas = false">
        Mégse
      </button>
      <button class="btn btn-lg btn-success muveletGomb" @click="updateQuestion">Mentés</button>
      <button v-if="modKep || modKepUrl !== null" class="btn btn-lg btn-light muveletGomb"
        @click="kepMegjelenit = !kepMegjelenit">Kép 
        <svg v-if="kepMegjelenit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </svg>
      </button>
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

  created() {
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

    kepCsere(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const aspectRatio = img.width / img.height;
          canvas.height = 450;
          canvas.width = aspectRatio * canvas.height;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            this.modKep = resizedFile;
            this.modKepUrl = URL.createObjectURL(resizedFile);
          }, file.type);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async updateQuestion() {
      try {
        this.modositas = false;

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

        await axios.patch(`${import.meta.env.VITE_API_URL}/updateQuestion`, formData)
          .then(response => {
            console.log(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteQuestion() {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteQuestion/${this.$route.params.kerdesId}`)
        .then(response => {
          console.log(response);
          this.$router.push("/kerdesek");
        })
        .catch(error => {
          console.log(error);
        });
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

<style scoped>
#tartalom {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  margin-top: 50px;
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
  font-weight: 500;
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
  position: relative;
  text-align: center;
}

.valaszSzoveg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
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

@media screen and (max-height: 900px) {
  #kerdes {
    font-size: 20pt;
  }

  #kep {
    height: 20vh;
  }

  .valaszGomb {
    height: 8vh;
    font-size: 12pt;
  }

  .muveletGomb {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 12pt;
  }
}

@media screen and (max-width: 997px) {
  #kep {
    height: 20vh;
    object-fit: cover;
  }

  #kerdes {
    font-size: 20pt;
  }

  #gombDiv {
    width: 100%;
  }

  .valaszGomb {
    margin: 5px;
    height: 7.5vh;
    font-size: 12pt;
  }
}

@media screen and (max-width: 500px) {
  #kerdes {
    font-size: 5vw;
  }

  .valaszGomb {
    font-size: 3.2vw;
  }

  .muveletGomb {
    font-size: 3.2vw;
    width: 30%;
    margin: 4px;
  }
}
</style>