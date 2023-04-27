<template>
  <Hiba v-if="hiba" />
  <Toltes v-else-if="toltes" />
  <div v-else id="tartalom">
    <div id="profil-bio">
      <div class="tarolo">
        <div v-if="bejelentkezettFelh && szerkesztes">
          <label for="file-input">
            <img :src="szerkesztettKepUrl" alt="Felhasználókép" decoding="async" id="profil-kep" class="szerkesztett-profil-kep" width="150" height="150">
          </label>
          <input type="file" accept="image/*" id="file-input" style="display: none;" v-on:change="kepCsere">
        </div>
        <img v-else :src="profil.jellemzok.kep" alt="Felhasználókép" decoding="async" id="profil-kep" width="150" height="150">
        <div id="profil-tarolo">
          <form @submit.prevent="updateUserPage">
            <input v-if="bejelentkezettFelh && szerkesztes" id="szerkesztettNev" type="text" minlength="3" maxlength="20"
              v-model="szerkesztettNev" class="form-control text-light border-secondary w-100" required>
            <h2 v-else>{{ profil.jellemzok.nev }}</h2>
            <h3>@{{ profil.felhasznalonev }}</h3>
            <div id="szintDiv">
              <Szint  :exp="profil.statisztika.exp" magassag="30px" szelesseg="200px" betumeret="18pt" />
            </div>
            <p>Csatlakozott: <b>{{ (profil.csatlakozas).substring(0, 10) }}</b></p>
            <button v-if="bejelentkezettFelh && !szerkesztes" type="button" class="btn btn-dark szerkesztesGomb"
              @click="szerkesztesLenyomva">
              Profil Módosítása
              <img src="/img/ikon/ceruza.svg" alt="ceruza ikon" decoding="async" class="d-inline" width="16" height="16">
            </button>
            <div v-if="bejelentkezettFelh && szerkesztes">
              <button type="button" class="btn btn-secondary mx-1 szerkesztesGomb" @click="szerkesztes = false">
                Mégse
                <img src="/img/ikon/vissza.svg" alt="vissza ikon" decoding="async" width="16" height="16">
              </button>
              <button type="submit" class="btn btn-success mx-1 szerkesztesGomb">
                Mentés
                <img src="/img/ikon/mentes.svg" alt="mentés ikon" decoding="async" width="16" height="16">
              </button>
              <button type="button" class="btn btn-danger mx-1 szerkesztesGomb" @click="torlesPopup = true">
                Törlés
                <img src="/img/ikon/kuka.svg" alt="kuka ikon" decoding="async" width="16" height="16">
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="bio-tarolo">
        <h3>Rólam</h3>
        <input v-if="bejelentkezettFelh && szerkesztes" id="szerkesztettBio" type="text" maxlength="150"
          v-model="szerkesztettBio" class="form-control text-light border-secondary w-100">
        <p v-else>{{ profil.jellemzok.bio }}</p>
      </div>
    </div>

    <form @submit.prevent="deleteUser" class="popup" v-if="bejelentkezettFelh && szerkesztes && torlesPopup">
      <div class="popup-content">
        <h2 class="mb-5">Biztos törli a profilját?</h2>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-secondary m-3" @click="torlesPopup = false">
            Mégse
            <img src="/img/ikon/vissza.svg" alt="vissza ikon" decoding="async" width="16" height="16">
          </button>
          <button type="submit" class="btn btn-danger m-3">
            Törlés
            <img src="/img/ikon/kuka.svg" alt="kuka ikon" decoding="async" width="16" height="16">
          </button>
        </div>
      </div>
    </form>

    <div id="rekord-tema-tarolo">
      <div id="rekord-tarolo">
        <div class="rekord-tablazat">
          <h3>Statisztika</h3><br>
          <p>Játszmák: <b>{{ profil.statisztika.jatszmaSzam }}</b></p>
          <p>Átlagos válaszidő: <b>{{ profil.statisztika.jatszmaSzam > 0 ? (profil.statisztika.valaszIdo / profil.statisztika.jatszmaSzam).toFixed(2) : 0}}</b> mp
          </p>
        </div>
        <div class="rekord-tablazat">
          <h3>Személyes Rekord</h3><br>
          <p>Pontszám: <b>{{ profil.rekord.pontszam }}</b> pont</p>
          <p>Helyes / Helytelen: <b>{{ profil.rekord.helyesHelytelen }}</b></p>
          <p>Téma: <b>{{ temaSzoveg(profil.rekord.tema) }}</b></p>
          <p>Nehézség: <b>{{ nehezsegSzoveg(profil.rekord.nehezseg) }}</b></p>
          <p>Idő kérdésenként: <b>{{ profil.rekord.ido }}</b> mp</p>
          <p>Kérdésszám: <b>{{ profil.rekord.kerdesSzam }}</b></p>
          <p>Válaszszám: <b>{{ profil.rekord.valaszSzam }}</b></p>
        </div>
      </div>

      <div id="tema-tarolo">
        <h3>Kedvenc témakörei</h3>
        <div v-if="bejelentkezettFelh && szerkesztes" id="temaGomb-tarolo">
          <div id="temaDiv">
            <img :src="`/img/tema/nagy/${szerkesztettTema1}.webp`" alt="Téma képe" decoding="async" id="temaKep" width="360" height="120">
            <div id="temaKepSzoveg">
              <div class="dropdown-toggle" role="button" aria-expanded="false" data-bs-toggle="dropdown"
                data-bs-display="static">
                {{ temaSzoveg(szerkesztettTema1) }}
                <div class="dropdown-menu dropdown-menu-dark">
                  <p v-for="t in temak" :key="t" class="dropdown-item"
                    :class="szerkesztettTema1 == t || szerkesztettTema2 == t || szerkesztettTema3 == t ? 'd-none' : ''"
                    @click="szerkesztettTema1 = t">{{ temaSzoveg(t) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div id="temaDiv">
            <img :src="`/img/tema/nagy/${szerkesztettTema2}.webp`" alt="Téma képe" decoding="async" id="temaKep" width="360" height="120">
            <div id="temaKepSzoveg">
              <div class="dropdown-toggle" role="button" aria-expanded="false" data-bs-toggle="dropdown"
                data-bs-display="static">
                {{ temaSzoveg(szerkesztettTema2) }}
              </div>
              <div class="dropdown-menu dropdown-menu-dark">
                <p v-for="t in temak" :key="t" class="dropdown-item"
                  :class="szerkesztettTema1 == t || szerkesztettTema2 == t || szerkesztettTema3 == t ? 'd-none' : ''"
                  @click="szerkesztettTema2 = t">{{ temaSzoveg(t) }}</p>
              </div>
            </div>
          </div>
          <div id="temaDiv">
            <img :src="`/img/tema/nagy/${szerkesztettTema3}.webp`" alt="Téma képe" decoding="async" id="temaKep" width="360" height="120">
            <div id="temaKepSzoveg">
              <div class="dropdown-toggle" role="button" aria-expanded="false" data-bs-toggle="dropdown"
                data-bs-display="static">
                {{ temaSzoveg(szerkesztettTema3) }}
                <div class="dropdown-menu dropdown-menu-dark">
                  <p v-for="t in temak" :key="t" class="dropdown-item"
                    :class="szerkesztettTema1 == t || szerkesztettTema2 == t || szerkesztettTema3 == t ? 'd-none' : ''"
                    @click="szerkesztettTema3 = t">{{ temaSzoveg(t) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else id="temaGomb-tarolo">
          <div id="temaDiv">
            <img :src="`/img/tema/nagy/${profil.jellemzok.tema1}.webp`" alt="Téma képe" decoding="async" id="temaKep" width="360" height="120">
            <div id="temaKepSzoveg">
              {{ temaSzoveg(profil.jellemzok.tema1) }}
            </div>
          </div>
          <div id="temaDiv">
            <img :src="`/img/tema/nagy/${profil.jellemzok.tema2}.webp`" alt="Téma képe" decoding="async" id="temaKep" width="360" height="120">
            <div id="temaKepSzoveg">
              {{ temaSzoveg(profil.jellemzok.tema2) }}
            </div>
          </div>
          <div id="temaDiv">
            <img :src="`/img/tema/nagy/${profil.jellemzok.tema3}.webp`" alt="Téma képe" decoding="async" id="temaKep" width="360" height="120">
            <div id="temaKepSzoveg">
              {{ temaSzoveg(profil.jellemzok.tema3) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toltes from '../components/Toltes.vue';
import Hiba from '../components/Hiba.vue';
import Szint from '../components/Szint.vue';
import { mapWritableState } from 'pinia';
import { useProfilStore } from '../stores/profil';
import { useFelhasznaloStore } from '../stores/felhasznalo';
import axios from 'axios';
import Cookies from 'js-cookie';
import { temaSzoveg, nehezsegSzoveg } from '../tema-nehezseg-szoveg'

export default {
  components: {
    Toltes,
    Hiba,
    Szint
  },

  data() {
    return {
      toltes: true,
      hiba: false,
      bejelentkezettFelh: false,
      szerkesztes: false,
      torlesPopup: false,
      szerkesztettNev: "",
      szerkesztettBio: "",
      szerkesztettKep: null,
      szerkesztettKepUrl: "",
      szerkesztettTema1: "",
      szerkesztettTema2: "",
      szerkesztettTema3: "",
      temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes']
    }
  },
  
  beforeRouteEnter(to, from, next) {
    // ha nincs profil akkor átnavigál a regisztráció oldalra
    if (to.params.felhasznaloId == "nem-meghatarozott") {
      alert("Regisztrálj hogy hozzáférhess a saját profil oldaladhoz");
      next("/regisztracio");
    }
    else {
      next();
    }
  },

  created() {
    this.getUser();
  },

  watch: {
    '$route.params.felhasznaloId'() {
      // visszaáll a kezdő állapot ha változik a felhasználó és vizsgálat hogy a profil oldalra navigál-e
      if(this.$router.currentRoute.value.name == 'profil') {
        this.bejelentkezettFelh = false;
        this.szerkesztes = false;
        this.torlesPopup = false;
        this.toltes = true;
        this.hiba = false;
        this.getUser();
      }
    }
  },

  computed: {
    ...mapWritableState(useProfilStore, ['profil']),
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
  },

  methods: {
    szerkesztesLenyomva() {
      // a state átadva átmeneti szerkeszthető változóknak
      this.szerkesztes = true;
      this.szerkesztettKepUrl = this.profil.jellemzok.kep;
      this.szerkesztettNev = this.profil.jellemzok.nev;
      this.szerkesztettBio = this.profil.jellemzok.bio;
      this.szerkesztettTema1 = this.profil.jellemzok.tema1;
      this.szerkesztettTema2 = this.profil.jellemzok.tema2;
      this.szerkesztettTema3 = this.profil.jellemzok.tema3;
    },

    kepCsere(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.height = 150;
          canvas.width = 150;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], `${this.felhasznalo.felhasznalonev}`, {
              type: 'image/webp',
              lastModified: Date.now()
            });
            this.szerkesztettKep = resizedFile;
            this.szerkesztettKepUrl = URL.createObjectURL(resizedFile); // az átmeneti megtekintésért
          }, file.type);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async getUser() {
      if (this.$route.params.felhasznaloId === this.felhasznalo.felhasznalonev) {
        this.bejelentkezettFelh = true;
      }
      
      await axios.get(`${import.meta.env.VITE_API_URL}/getUser/${this.$route.params.felhasznaloId}`)
        .then(response => {
          // ha nem talált a felhasználó akkor átnavigál a nem talált oldalra
          if (response.data === "Nem létező user!") {
            this.$router.push("/nem-talalt");
            return;
          }

          // beállítja a profil statet
          for (const prop in response.data) {
            if (this.profil.hasOwnProperty(prop)) {
              this.profil[prop] =  response.data[prop];
            }
          }
          this.toltes = false;
        })
        .catch(error => {
          console.log('Hiba:', error.message);
          this.hiba = true;
        });
    },

    async updateUserPage() {
      try {
        this.szerkesztes = false;
        
        // statek beállítása
        this.felhasznalo.jellemzok.kep = this.szerkesztettKepUrl;
        this.felhasznalo.jellemzok.nev = this.szerkesztettNev;
        this.felhasznalo.jellemzok.bio = this.szerkesztettBio;
        this.felhasznalo.jellemzok.tema1 = this.szerkesztettTema1;
        this.felhasznalo.jellemzok.tema2 = this.szerkesztettTema2;
        this.felhasznalo.jellemzok.tema3 = this.szerkesztettTema3;

         // az átmeneti megtekintésért
        for (const prop in this.felhasznalo) {
          if (this.profil.hasOwnProperty(prop)) {
            this.profil[prop] =  this.felhasznalo[prop];
          }
        }

        const formData = new FormData();
        formData.append('nev', this.szerkesztettNev);
        formData.append('bio', this.szerkesztettBio);
        formData.append('tema1', this.szerkesztettTema1);
        formData.append('tema2', this.szerkesztettTema2);
        formData.append('tema3', this.szerkesztettTema3);
        
        if (this.szerkesztettKep) {
          formData.append('file', this.szerkesztettKep);
        }
        
        await axios.patch(`${import.meta.env.VITE_API_URL}/updateUserPage`, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        });
      } catch (error) {
        console.log('Hiba:', error.message);
      }
    },

    async deleteUser() {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUserPage`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })
        .then(() => {
          useFelhasznaloStore().$reset();
          Cookies.remove('auth_token');
          this.$router.push("/");
        })
        .catch(error => {
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
  margin-top: 55px;
  color: rgb(230, 230, 230);
}

#profil-bio {
  background-color: rgb(16, 16, 16);
}

.tarolo {
  display: flex;
  align-items: center;
  margin-left: 25px;
}

#profil-kep {
  position: relative;
  border-radius: 50%;
}

#felhasznalo-tarolo {
  display: inline-block;
  text-align: center;
  margin-right: 55px;
  margin-left: 10px;
}

#felhasznalo-nev {
  font-size: 10pt;
  font-weight: bold;
  color: whitesmoke;
}

#rekord-tarolo {
  width: 40%;
  font-size: 15pt;
}

.rekord-tablazat {
  margin: 20px;
  background: rgb(16, 16, 16);
  border-radius: 15px;
  padding: 30px;
}

.rekord-tablazat h3 {
  text-align: center;
}

#profil-tarolo h2 {
  font-size: 26pt;
  font-weight: bold;
}

#profil-tarolo h3 {
  font-size: 16pt;
  font-weight: bold;
}

#profil-tarolo p {
  margin-top: 10px;
}

#profil-tarolo {
  padding-top: 10px;
  margin-left: 25px;
  margin-top: 25px;
}

#bio-tarolo {
  min-height: 106px;
}

#bio-tarolo h3 {
  font-size: 18pt;
  padding-left: 30px;
  padding-top: 15px;
  font-weight: bold;
}

#bio-tarolo p {
  font-size: 16px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  word-wrap: break-word;
}

#rekord-tema-tarolo {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

#tema-tarolo {
  text-align: center;
  width: 50%;
  margin: 20px;
  background: rgb(16, 16, 16);
  border-radius: 15px;
  padding: 30px;
}

table,
td {
  margin-left: 16px;
  padding: 10px;
  text-align: center;
}

#temaGomb-tarolo {
  margin-top: 64px;
  font-size: 30pt;
  font-weight: bold;
}

#temaDiv {
  position: relative;
  margin-top: 20px;
}

/* hogy ne csússzanak a dropdown-ok a képek alá */
#temaDiv:nth-child(1) {
  z-index: 3;
}

#temaDiv:nth-child(2) {
  z-index: 2;
}

#temaDiv:nth-child(3) {
  z-index: 1;
}

#temaKep {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  width: 60%;
  height: 60%;
  max-width: 490px;
  max-height: 163.32px;
}

#temaKepSzoveg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(1rem, 2.5vw, 3rem);
}

input,
input:focus {
  background-color: #0D1117;
}

#szerkesztettNev {
  height: 40px;
  margin-bottom:10px;
  margin-left: -1px;
  font-size: 26pt;
  font-weight: bold;
  max-width: 400px;
  padding: 0px;
}

#szerkesztettBio {
  height: 54px;
  padding: 0px;
  padding-left: 29px;
  padding-right: 29px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 15px;
}

.btn.btn-dark.szerkesztesGomb {
  width: 200px;
}

form {
  height: 191px;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 4;
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 100px;
}

.dropdown-menu {
  overflow-y: scroll;
  height: 200px
}

.dropdown-item:active {
  background-color: rgb(255, 200, 0);
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

.form-control::-ms-placeholder {
  color: gray;
}

.form-control::placeholder {
  color: gray;
}

.szerkesztett-profil-kep:hover {
  cursor: pointer;
  opacity: 0.8;
}

#profil-bio, #profil-kep, .rekord-tablazat, #tema-tarolo, #temaKep, .szerkesztesGomb, input, .dropdown-menu {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media screen and (max-width: 855px) {
  #rekord-tarolo {
    width: 95%;
  }

  #tema-tarolo {
    width: 90%;
  }

  #temaKepSzoveg {
    font-size: 6vw;
  }
}

@media screen and (max-width: 503px) {
  .tarolo {
    flex-direction: column;
    text-align: center;
    margin: 0px;
  }

  #profil-kep {
    margin-top: 10px;
  }

  #szintDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #profil-tarolo {
    margin: 0px;
    display: flex;
    align-items: center;
  }

  form {
    height: 250px;
  }

  #szerkesztesGomb {
    margin: 10px;
  }

  #szerkesztettNev {
    text-align: center;
  }

  .rekord-tablazat h3,
  #tema-tarolo h3 {
    font-size: 7vw;
  }

  .rekord-tablazat p {
    font-size: 5vw;
  }

  #temaKepSzoveg {
    font-size: 7vw;
  }

  #temaKep {
    width: 90%;
    height: 90%;
  }
}
</style>