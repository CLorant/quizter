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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="d-inline" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
              </svg>
            </button>
            <div v-if="bejelentkezettFelh && szerkesztes">
              <button type="button" class="btn btn-secondary mx-1 szerkesztesGomb" @click="szerkesztes = false">
                Mégse
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                  <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                </svg>
              </button>
              <button type="submit" class="btn btn-success mx-1 szerkesztesGomb">
                Mentés
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
                  <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
                </svg>
              </button>
              <button type="button" class="btn btn-danger mx-1 szerkesztesGomb" @click="torlesPopup = true">
                Törlés
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
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
        <h2>Írja be a felhasználónevét és jelszavát a profilja törléséhez</h2>
        <input type="text" pattern="[a-zA-Z0-9]+$" v-model="torlesFelhasznalonev" class="form-control text-light mt-5 torlesInput" :class="helytelen ? 'border-danger' : 'border-secondary'" placeholder="Felhasználónév" required>
        <div style="height: 24px">
          <div class="text-danger" :class="helytelen ? 'd-block' : 'd-none'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            Helytelen felhasználónév
          </div>
        </div>
        <input type="password" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$" v-model="torlesJelszo" class="form-control text-light mt-3 torlesInput" :class="helytelen ? 'border-danger' : 'border-secondary'" placeholder="Jelszó" required>
        <div style="height: 24px;">
          <div class="text-danger" :class="helytelen ? 'd-block' : 'd-none'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            Helytelen jelszó
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-secondary m-3" @click="torlesPopup = false; helytelen = false; torlesFelhasznalonev = ''; torlesJelszo = ''">
            Mégse
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
              <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
            </svg>
          </button>
          <button type="submit" class="btn btn-danger m-3">
            Törlés
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
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
      torlesFelhasznalonev: "",
      torlesJelszo: "",
      helytelen: false,
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
    if (to.params.felhasznaloId == "nem-meghatarozott") {
      alert("Regisztrálj hogy hozzáférhess a saját profil oldaladhoz");
      next("/regisztracio");
    }
    else {
      next();
    }
  },

  created() {
    this.getUserByName();
  },

  watch: {
    '$route.params.felhasznaloId'() {
      this.bejelentkezettFelh = false;
      this.szerkesztes = false;
      this.torlesPopup = false;
      this.helytelen = false;
      this.toltes = true;
      this.hiba = false;
      this.getUserByName();
    }
  },

  computed: {
    ...mapWritableState(useProfilStore, ['profil']),
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
  },

  methods: {
    szerkesztesLenyomva() {
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
              lastModified: Date.now(),
            });
            this.szerkesztettKep = resizedFile;
            this.szerkesztettKepUrl = URL.createObjectURL(resizedFile);
          }, file.type);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async getUserByName() {
      if (this.$route.params.felhasznaloId === this.felhasznalo.felhasznalonev) {
        this.bejelentkezettFelh = true;
        for (const prop in this.felhasznalo) {
          if (this.profil.hasOwnProperty(prop)) {
            this.profil[prop] = this.felhasznalo[prop];
          }
        }
        this.toltes = false;
      }
      if (this.profil.felhasznalonev === "nem-meghatarozott") {
        await axios.get(`${import.meta.env.VITE_API_URL}/getUser/${this.$route.params.felhasznaloId}`)
          .then(response => {
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
      }
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

        const formData = new FormData();
        formData.append('nev', this.szerkesztettNev);
        formData.append('bio', this.szerkesztettBio);
        formData.append('tema1', this.szerkesztettTema1);
        formData.append('tema2', this.szerkesztettTema2);
        formData.append('tema3', this.szerkesztettTema3);
        
        if (this.szerkesztettKep) {
          formData.append('kep', this.szerkesztettKep);
        }

        await axios.patch(`${import.meta.env.VITE_API_URL}/updateUserPage`, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        });
      } catch (error) {
        console.log('Hiba:', error);
      }
    },

    async deleteUser() {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUserPage`, {
        username: this.torlesFelhasznalonev,
        password: this.torlesJelszo
      },{
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
          this.helytelen = true;
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

.form-control::placeholder {
  color: gray;
}

.torlesInput {
  width: 280px;
  max-width: 95%
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