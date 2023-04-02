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
      <button v-if="kep !== null" class="btn btn-lg btn-light muveletGomb"
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
</template>

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
            this.kep = resizedFile;
            this.kepUrl = URL.createObjectURL(resizedFile);
          }, file.type);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
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

        await axios.post(`${import.meta.env.VITE_API_URL}/createQuestion`, formData)
          .then(response => {
            console.log(response.data);
          });
      } catch (error) {
        console.log(error);
      }
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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