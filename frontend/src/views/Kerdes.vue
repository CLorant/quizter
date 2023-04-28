<template>
  <Hiba v-if="hiba" />
  <Toltes v-else-if="toltes" />
  <div v-else id="tartalom">
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
      <input v-if="kepMegjelenit === false" type="file" id="kep" name="kep" @change="kepCsere" accept="image/*"
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
      <button v-if="modKep || modKepUrl !== null" class="btn btn-lg btn-primary muveletGomb"
        @click="kepMegjelenit = !kepMegjelenit">Kép 
        <img v-if="kepMegjelenit" src="/img/ikon/szem-athuzva.svg" alt="szem áthúzva ikon" decoding="async" height="16" width="16">
        <img v-else src="/img/ikon/szem.svg" alt="szem ikon" decoding="async" height="16" width="16">
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
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene'],
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

  watch: {
    '$route.params.kerdesId'() {
      // visszaáll a kezdő állapot ha változik a kérdés
      this.toltes = true;
      this.hiba = false;
      this.valasztottTema = "autok";
      this.valasztottNehezseg = "konnyu";
      this.modKerdesSzoveg = "";
      this.modKep = null,
      this.modKepUrl = null,
      this.modValasz1 = "",
      this.modValasz2 = "",
      this.modValasz3 = "",
      this.modValasz4 = "",
      this.modValasz5 = "",
      this.modValasz6 = "",
      this.kepMegjelenit = false,
      this.modositas = false,
      this.torles = false
      this.getQuestion();
    }
  },

  created() {
    this.getQuestion();
  },

  computed: {
    ...mapWritableState(useKerdesStore, ['tema', 'nehezseg', 'kerdes', 'valaszok'])
  },

  methods: {
    async getQuestion() {
      await axios.get(`${import.meta.env.VITE_API_URL}/getQuestion/${this.$route.params.kerdesId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }})
        .then(response => {
          this.tema = response.data.tema;
          this.nehezseg = response.data.nehezseg;
          this.kerdes = response.data.kerdes;
          this.valaszok = response.data.valaszok;
          this.toltes = false;
        })
        .catch(error => {
          console.log('Hiba:', error.message);
          this.hiba = true;
        });
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
              lastModified: Date.now()
            });
            this.modKep = resizedFile;
            this.modKepUrl = URL.createObjectURL(resizedFile); // az átmeneti megtekintésért
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
        formData.append('kerdes_id', this.$route.params.kerdesId);
        formData.append('tema', this.valasztottTema);
        formData.append('nehezseg', this.valasztottNehezseg);
        formData.append('kerdes', this.modKerdesSzoveg);
        formData.append('valasz1', this.modValasz1);
        formData.append('valasz2', this.modValasz2);
        formData.append('valasz3', this.modValasz3);
        formData.append('valasz4', this.modValasz4);
        formData.append('valasz5', this.modValasz5);
        formData.append('valasz6', this.modValasz6);
        formData.append('file', this.modKep);

        await axios.patch(`${import.meta.env.VITE_API_URL}/updateQuestion`, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        })
          .then(response => {
            console.log(response.data);
          });
      } catch (error) {
        console.log(error.message);
      }
    },

    async deleteQuestion() {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteQuestion/${this.$route.params.kerdesId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        })
          .then(response => {
            console.log(response.data);
            this.$router.push("/kerdesek");
          })
          .catch(error => {
            console.log('Hiba:', error.message);
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
    },

    temaSzoveg,
    nehezsegSzoveg
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
  margin-bottom: 55px;
  font-size: 28pt;
  height: 48px;
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

.form-control::-webkit-input-placeholder {
  color: gray;
}

.form-control::-moz-placeholder {
  color: gray;
}

.form-control:-moz-placeholder {
  color: gray;
}

.form-control:-ms-placeholder {
  color: gray;
}

.form-control::placeholder {
  color: gray;
}

.valaszGomb::-webkit-input-placeholder {
  color: rgb(200, 200, 200);
}

.valaszGomb::-moz-placeholder {
  color: rgb(200, 200, 200);
}

.valaszGomb:-moz-placeholder {
  color: rgb(200, 200, 200);
}

.valaszGomb:-ms-placeholder {
  color: rgb(200, 200, 200);
}

.valaszGomb::placeholder {
  color: rgb(200, 200, 200);
}

.valaszGomb:hover {
  opacity: 0.8;
}

.valaszGomb, input, .dropdown-menu, .muveletGomb, .szuroGomb {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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