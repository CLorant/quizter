<script>
  import Szint from '../components/Szint.vue' 
  import { mapWritableState } from 'pinia'
  import { useProfilStore } from '../stores/profil'
  import { useFelhasznaloStore } from '../stores/felhasznalo'
  import profilJSON from '../profil.json'

  export default {
    components: {
      Szint
    },

    data() {
      return {
        bejelentkezettFelh: false,
        szerkesztes: false,
        torlesPopup: false,
        szerkesztettNev: "",
        szerkesztettBio: "",
        szerkesztettKep: "",
        szerkesztettTema1: "",
        szerkesztettTema2: "",
        szerkesztettTema3: "",
        temak: ['autok', 'biologia', 'fizika', 'foldrajz', 'irodalom', 'kemia', 'sport', 'szorakoztatas', 'technologia', 'tortenelem', 'zene', 'vegyes'],
      }
    },

    beforeRouteEnter(to, from, next) {
      if (to.params.userId == "nem-meghatarozott-felhasznalo"){
        alert("Regisztrálj hogy hozzáférhess a saját profil oldaladhoz")
        next("/regisztracio")
      }
      else {
        next()
      }
    },

    beforeMount() {
      this.getFelhasznalo()
    },

    watch: {
      '$route.params.userId'() {
        this.bejelentkezettFelh = false
        this.szerkesztes =  false
        this.torlesPopup = false
        useProfilStore().$reset()
        this.getFelhasznalo()
      }
    },

    computed: {
      ...mapWritableState(useProfilStore, ['profil']),
      ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
    },

    methods: {
      temaSzoveg(tema) {
        switch (tema) {
          case "autok":
            return "Autók"
          
          case "biologia":
            return "Biológia"

          case "fizika":
            return "Fizika"

          case "foldrajz":
            return "Földrajz"

          case "irodalom":
            return "Irodalom"

          case "kemia":
            return "Kémia"

          case "sport":
            return "Sport"

          case "szorakoztatas":
            return "Szórakoztatás"

          case "technologia":
            return "Technológia"

          case "tortenelem":
            return "Történelem"

          case "zene":
            return "Zene"

          case "vegyes":
            return "Vegyes"

          // Helytelen "tema" paraméterkor
          default:
            return "Autók"
        }
      },

      nehezsegSzoveg(nehezseg) {
        switch(nehezseg) {
          case "konnyu":
            return "Könnyű"

          case "kozepes":
            return "Közepes"

          case "nehez":
            return "Nehéz"

          // Helytelen "nehezseg" paraméterkor
          default:
            return "Könnyű"
        }
      },

      szerkesztesLenyomva(){
        this.szerkesztes = true
        this.szerkesztettKep = this.profil.jellemzok.kep
        this.szerkesztettNev = this.profil.jellemzok.name
        this.szerkesztettBio = this.profil.jellemzok.bio
        this.szerkesztettTema1 = this.profil.jellemzok.tema1
        this.szerkesztettTema2 = this.profil.jellemzok.tema2
        this.szerkesztettTema3 = this.profil.jellemzok.tema3
      },

      kepCsere(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            canvas.getContext('2d').drawImage(img, 0, 0, 150, 150);
            this.szerkesztettKep = canvas.toDataURL(file.type);
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      },

      getFelhasznalo() {
        if (this.$route.params.userId === this.felhasznalo.username){
          this.bejelentkezettFelh = true
          for (const prop in this.felhasznalo) {
            if (this.profil.hasOwnProperty(prop)) {
              this.profil[prop] = this.felhasznalo[prop];
            }
          }
        }
        else {
          // getFelhasznalo
          const res = profilJSON // átmeneti
          for (const prop in res) {
            if (this.profil.hasOwnProperty(prop)) {
              this.profil[prop] = res[prop];
            }
          }
          
          // ha fetch nem sikerül akkor -> NemTalalt.vue
        }
      },

      updateUser() {
        this.szerkesztes = false
        // profil state (oldalon látható)
        this.profil.jellemzok.kep = this.szerkesztettKep
        this.profil.jellemzok.name = this.szerkesztettNev
        this.profil.jellemzok.bio = this.szerkesztettBio
        this.profil.jellemzok.tema1 = this.szerkesztettTema1
        this.profil.jellemzok.tema2 = this.szerkesztettTema2
        this.profil.jellemzok.tema3 = this.szerkesztettTema3

        // felhasznalo state (oldalon nem látható)
        this.felhasznalo.jellemzok.kep = this.profil.jellemzok.kep
        this.felhasznalo.jellemzok.name = this.profil.jellemzok.name
        this.felhasznalo.jellemzok.bio = this.profil.jellemzok.bio
        this.felhasznalo.jellemzok.tema1 = this.profil.jellemzok.tema1
        this.felhasznalo.jellemzok.tema2 = this.profil.jellemzok.tema2
        this.felhasznalo.jellemzok.tema3 = this.profil.jellemzok.tema3

        // updateUser
      },

      deleteUser() {
        // deleteUser
        useFelhasznaloStore().$reset()
        this.$router.push("/")
      }
    } 
  }
</script>

<template>
  <div id="tartalom">
    <div id="profil-bio">
      <div class="tarolo">
        <div v-if="bejelentkezettFelh && szerkesztes">
          <label for="file-input">
            <img :src="szerkesztettKep" alt="Felhasználókép" decoding="async" id="profil-kep">
          </label>
          <input type="file" accept="image/*" id="file-input" style="display: none;" v-on:change="kepCsere">
        </div>
        <img v-else :src="profil.jellemzok.kep" alt="Felhasználókép" decoding="async" id="profil-kep">
        <div id="profil-tarolo">
          <input v-if="bejelentkezettFelh && szerkesztes" id="szerkesztettNev" type="text" maxlength="20" v-model="szerkesztettNev" class="form-control text-light border-secondary w-100">
          <h2 v-else>{{ profil.jellemzok.name }}</h2>
          <h3>@{{ profil.username }}</h3>
          <Szint :exp="profil.statisztika.exp" magassag="30px" szelesseg="200px" betumeret="18pt"/>
        <p>Csatlakozott: <b>{{ profil.csatlakozas }}</b></p>
        <button v-if="bejelentkezettFelh && !szerkesztes" id="szerkesztesGomb" class="btn btn-dark" @click="szerkesztesLenyomva" style="width: 200px;">
          Profil Módosítása
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="d-inline" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
          </svg>
        </button>
        <button v-if="bejelentkezettFelh && szerkesztes" class="btn btn-secondary m-1" @click="szerkesztes=false">
          Mégse
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
          </svg>
        </button>
        <button v-if="bejelentkezettFelh && szerkesztes" class="btn btn-success m-1" @click="updateUser">
          Mentés
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"/>
            <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
          </svg>
        </button>
        <button v-if="bejelentkezettFelh && szerkesztes" class="btn btn-danger m-1" @click="torlesPopup=true">
          Törlés
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 text-danger" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </button>
      </div>
    </div>
      <div id="bio-tarolo">
        <h3>Rólam</h3>
        <input v-if="bejelentkezettFelh && szerkesztes" id="szerkesztettBio" type="text" maxlength="150" v-model="szerkesztettBio" class="form-control text-light border-secondary w-100">
        <p v-else>{{ profil.jellemzok.bio }}</p>
      </div>
    </div>
    
    <div class="popup" v-if="bejelentkezettFelh && szerkesztes && torlesPopup">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: 100px;">
        <h1>Biztosan törölni szeretnéd a profilod?</h1>
        <div style="display: flex; width: 50%; justify-content: space-around; margin-top: 10%;">
          <button class="btn btn-lg btn-secondary m-1" @click="torlesPopup = false">
            Mégse
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
              <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
              <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
            </svg>
          </button>
          <button class="btn btn-lg btn-danger m-1" @click="deleteUser">
            Törlés
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 text-danger" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div id="rekord-tema-tarolo">
      <div id="rekord-tarolo">
        <div class="rekord-tablazat">
          <h3>Statisztika</h3><br>
          <p>Játszmák: <b>{{ profil.statisztika.jatszmaSzam }}</b></p>
          <p>Átlagos válaszidő: <b>{{ (profil.statisztika.valaszIdo / profil.statisztika.jatszmaSzam).toFixed(2) }}</b> mp</p>
        </div>
        <div class="rekord-tablazat">
          <h3>Személyes Rekord</h3><br>
          <p>Pontszám: <b>{{ profil.rekord.pontszam }}</b> pont</p>
          <p>Helyes / Helytelen: <b>{{ profil.rekord.helyesHelytelen }}</b></p>
          <p>Téma: <b>{{ temaSzoveg(profil.rekord.tema)  }}</b></p>
          <p>Nehézség: <b>{{ nehezsegSzoveg(profil.rekord.nehezseg) }}</b></p>
          <p>Idő kérdésenként: <b>{{ profil.rekord.ido }}</b> mp</p>
          <p>Kérdésszám: <b>{{ profil.rekord.kerdesSzam }}</b></p>
          <p>Válaszszám: <b>{{ profil.rekord.valaszSzam }}</b></p>
        </div>
      </div>
      
      <div id="tema-tarolo">
        <h3>Kedvenc témakörei</h3>
        <div id="temaGomb-tarolo">
          <div v-if="bejelentkezettFelh && szerkesztes" id="temaDiv" style="z-index: 3;">
            <img :src="`/img/tema/nagy/${szerkesztettTema1}.webp`" alt="Téma képe" decoding="async" id="temaKep">
            <div id="temaKepSzoveg">
              <div class="dropdown-toggle" role="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static">
                {{ temaSzoveg(szerkesztettTema1) }}
                <div class="dropdown-menu dropdown-menu-dark" style="overflow-y: scroll; height: 200px">
                  <p v-for="t in temak" :key="t" class="dropdown-item" :class="szerkesztettTema1==t || szerkesztettTema2==t || szerkesztettTema3==t ? 'd-none' : ''" @click="szerkesztettTema1=t">{{ temaSzoveg(t) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else id="temaDiv">
            <img :src="`/img/tema/nagy/${profil.jellemzok.tema1}.webp`" alt="Téma képe" decoding="async" id="temaKep">
            <div id="temaKepSzoveg">
              {{ temaSzoveg(profil.jellemzok.tema1) }}
            </div>
          </div>
          
          <div v-if="bejelentkezettFelh && szerkesztes" id="temaDiv" style="z-index: 2;">
            <img :src="`/img/tema/nagy/${szerkesztettTema2}.webp`" alt="Téma képe" decoding="async" id="temaKep">
            <div id="temaKepSzoveg">
              <div  class="dropdown-toggle" role="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static">
                {{ temaSzoveg(szerkesztettTema2) }}
              </div>
              <div class="dropdown-menu dropdown-menu-dark" style="overflow-y: scroll; height: 200px">
                <p v-for="t in temak" :key="t" class="dropdown-item" :class="szerkesztettTema1==t || szerkesztettTema2==t || szerkesztettTema3==t ? 'd-none' : ''" @click="szerkesztettTema2=t">{{ temaSzoveg(t) }}</p>
              </div>
            </div>
          </div>

          <div v-else id="temaDiv">
            <img :src="`/img/tema/nagy/${profil.jellemzok.tema2}.webp`" alt="Téma képe" decoding="async" id="temaKep">
            <div id="temaKepSzoveg">
              {{ temaSzoveg(profil.jellemzok.tema2) }}
            </div>
          </div>

          <div v-if="bejelentkezettFelh && szerkesztes" id="temaDiv" style="z-index: 1;">
            <img :src="`/img/tema/nagy/${szerkesztettTema3}.webp`" alt="Téma képe" decoding="async" id="temaKep">
            <div id="temaKepSzoveg">
              <div  class="dropdown-toggle" role="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static">
                {{ temaSzoveg(szerkesztettTema3) }}
                <div class="dropdown-menu dropdown-menu-dark" style="overflow-y: scroll; height: 200px">
                  <p v-for="t in temak" :key="t" class="dropdown-item" :class="szerkesztettTema1==t || szerkesztettTema2==t || szerkesztettTema3==t ? 'd-none' : ''" @click="szerkesztettTema3=t">{{ temaSzoveg(t) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else id="temaDiv">
            <img :src="`/img/tema/nagy/${profil.jellemzok.tema3}.webp`" alt="Téma képe" decoding="async" id="temaKep">
            <div id="temaKepSzoveg">
              {{ temaSzoveg(profil.jellemzok.tema3) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #tartalom{
    margin-top: 55px;
  }

  #profil-bio{
    background-color: rgb(16,16,16);
  }

  .tarolo {
    display: flex;
    align-items: center;
    margin-left: 25px;
  }

  #profil-kep {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position:relative;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
  }

  #felhasznalo-tarolo{
    display: inline-block;
    text-align: center;
    margin-right: 55px;
    margin-left: 10px;
  }

  #felhasznalo-nev{
    font-size: 10pt;
    font-weight: bold;
    color: white;
  }

  #rekord-tarolo{
    width: 40%;
    font-size: 15pt;
  }

  .rekord-tablazat{
    margin:20px;
    background: rgb(16,16,16);
    border-radius: 15px;
    padding: 30px;
  }

  .rekord-tablazat h3{
    text-align: center;
  }

  #profil-tarolo h2{
    font-size: 26pt;
    font-weight: bold;
  }

  #profil-tarolo h3{
    font-size: 16pt;
    font-weight: bold;
  }

  #profil-tarolo{
    padding-top: 10px;
    margin-left: 25px;
    margin-top: 25px;
  }

  #bio-tarolo h3{
    font-size: 18pt;
    padding-left: 30px;
    padding-top: 15px;
    font-weight: bold;
  }

  #bio-tarolo p{
    font-size: 16px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    word-wrap: break-word;
  }

  #rekord-tema-tarolo{
    display: flex;
    justify-content: space-evenly;
    flex-wrap:wrap;
  }

  #tema-tarolo{
    text-align: center;
    width: 50%;
    margin:20px;
    background: rgb(16,16,16);
    border-radius: 15px;
    padding: 30px;
  }

  table, td {
    margin-left: 16px;
    padding: 10px;
    text-align: center;
  }

  #temaGomb-tarolo{
    margin-top: 64px;
    font-size: 30pt;
    font-weight: bold;
  }

  #temaDiv{
    position: relative;
    margin-top: 20px;
  }

  #temaKep{
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 25px;
    width: 60%;
    height: 60%;
    max-width: 490px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  #temaKepSzoveg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  input, input:focus {
    background-color: #0D1117;
  }

  #szerkesztettNev{
    font-size: 26pt;
    font-weight: bold;
    max-width: 400px;
    height: 50px;
    padding: 0px;
  }

  #szerkesztettBio{
    height: 50px;
    padding: 0px;
    padding-left: 30px;
    padding-right:30px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 15px;
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

  .dropdown-item:active {
    background-color: rgb(255,200,0);
  }

  @media screen and (max-width: 855px){
    #rekord-tarolo{
      width: 95%;
    }
    #tema-tarolo{
      width: 90%;
    }
    #temaKepSzoveg{
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
    #profil-tarolo {
      margin: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #szerkesztesGomb{
      margin: 10px;
    }
    #szerkesztettNev{
      text-align: center;
    }
    .rekord-tablazat h3, #tema-tarolo h3{
      font-size: 7vw;
    }
    .rekord-tablazat p{
      font-size: 5vw;
    }
  }
</style>