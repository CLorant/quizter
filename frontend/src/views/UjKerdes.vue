<template>
  <div id="tartalom">
    <div id="szuro-tarolo">
      <div class="dropdown my-1">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false" :value="valasztottTema">{{ temaSzoveg(valasztottTema) }}</button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-for="tema in temak" :key="tema" class="dropdown-item" @click="valasztottTema = tema">{{ temaSzoveg(tema) }}</li>
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
    <input v-if="kepMegjelenit === false" type="file" id="kep" name="kep" @change="kepCsere" accept="image/*"
      class="form-control text-light border-secondary w-100" aria-label="Kép Input">
    <img v-else id="kep" :src="kepUrl" alt="Kérdés képe" decoding="async" height="300">
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
    <button class="btn btn-lg btn-success muveletGomb" @click="createQuestion">
        Mentés
      </button>
      <button v-if="kep !== null" class="btn btn-lg btn-primary muveletGomb"
        @click="kepMegjelenit = !kepMegjelenit">Kép 
        <img v-if="kepMegjelenit" src="/img/ikon/szem-athuzva.svg" alt="szem áthúzva ikon" decoding="async" height="16" width="16">
        <img v-else src="/img/ikon/szem.svg" alt="szem ikon" decoding="async" height="16" width="16">
      </button>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { temaSzoveg, nehezsegSzoveg } from '../tema-nehezseg-szoveg'

export default {
  data() {
    return {
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene'],
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
            this.kep = resizedFile;
            this.kepUrl = URL.createObjectURL(resizedFile); // az átmeneti megtekintésért
          }, file.type);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async createQuestion() {
      if(this.valasztottTema === '' || this.valasztottNehezseg === '') {
        alert("Nem választott témát vagy nehézséget!");
        return
      }
      
      try {
        if (!this.kep) {
          alert("Nem választott képet!");
          return
        }

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
        formData.append('file', this.kep);

        await axios.post(`${import.meta.env.VITE_API_URL}/createQuestion`, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        })
          .then(response => {
            console.log(response.data);
            this.kerdes = "";
            this.kep = null;
            this.kepUrl = "";
            this.valasz1 = "";
            this.valasz2 = "";
            this.valasz3 = "";
            this.valasz4 = "";
            this.valasz5 = "";
            this.valasz6 = "";
            this.kepMegjelenit = false;
          });
      } catch (error) {
        console.log('Hiba:', error.message);
      }
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
  margin-bottom: 35px;
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
  border: none;
  border-radius: 15px;
  background-color: firebrick;
  font-size: 14pt;
  color: whitesmoke;
  height: 80px;
  max-width: 246px;
  width: 42%;
  margin: 10px;
  white-space: pre-wrap;
  text-align: center;
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

input, input:focus {
  background-color: #0D1117;
}

.valaszGomb:hover {
  opacity: 0.8;
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

.valaszGomb::-ms-placeholder {
  color: rgb(200, 200, 200);
}

.valaszGomb::placeholder {
  color: rgb(200, 200, 200);
}

.valaszGomb, input, .dropdown-menu, .muveletGomb, .dropdown-toggle {
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

  #mentesGomb {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 12pt;
    height: 7vh;
  }
}

@media screen and (max-width: 997px) {
  #kep {
    height: 20vh;
    object-fit: cover;
  }

  #kerdes {
    font-size: 4vw;
  }

  #gombDiv {
    width: 100%;
  }

  .valaszGomb {
    margin: 5px;
    height: 7.5vh;
    font-size: 12pt;
  }

  #mentesGomb {
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

  #mentesGomb {
    font-size: 3.2vw;
    width: 40%;
  }
}
</style>