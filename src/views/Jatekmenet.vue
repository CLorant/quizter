<template>
  <Hiba v-if="hiba"/>
  <Toltes v-else-if="toltes" />
  <div v-else id="tartalom">
    <div v-if="!jatekVege">
      <p id="korSzamlalo">{{ kor + 1 }} / {{ kerdesSzam }}</p>
      <h4 id="kerdes">{{ kerdes.szoveg }}</h4>
      <img id="kep" :src="kerdes.kep" alt="Kérdés képe" decoding="async" height="300">
      <div id="gombTarolo">
        <div id="gombDiv">
          <button v-for="(value, key) in valaszok" :key="key" class="valaszGomb" :disabled="leNyomottValaszGomb"
            @click="leNyomottValaszGomb ? '' : valaszVizsgalat(value.helyes)" :style="{
              //ha a gomb megnyomott akkor a válasz helyessége szerint színezi, ha nem akkor az alapszínt használja
              backgroundColor: leNyomottValaszGomb ? (value.helyes ? 'green' : 'firebrick') : ('#4C4C4C')
            }">
            <span class="valaszSzoveg">{{ value.szoveg }}</span>
          </button>
        </div>
      </div>
      <div id="visszaSzamoloDiv">
        <div :style="{
          width: maradtIdo / ido * 100 + '%'
        }">{{ maradtIdo }}</div>
      </div>
      <div id="folytatasGombDiv">
        <button v-if="kor < kerdesSzam - 1" id=folytatasGomb :disabled="folytatasGombKikapcsol" @click="folytatasGombKikapcsol ? '' : folytat()"
          :style="{
            backgroundColor: folytatasGombKikapcsol ? '#333333' : '#4C4C4C'
          }">
          Folytatás
        </button>
        <button v-else id=folytatasGomb @click="folytatasGombKikapcsol ? '' : vege()"
        :style="{
          backgroundColor: folytatasGombKikapcsol ? '#333333' : '#4C4C4C'
        }">
          Befejezés
        </button>
      </div>
    </div>
    <div v-else class="d-flex align-items-center justify-content-center flex-column pt-3">
      <div v-if="pont > felhasznalo.rekord.pontszam" class="rekord-tablazat mb-0">
        <h2 class="mb-0">Új Személyes Rekord!</h2>
      </div>
      <div class="rekord-tablazat">
        <h2>Játszma adatai</h2>
        <p>Pontszám: <b>{{ pont }}</b> pont</p>
        <p>Helyes: <b>{{ helyesValasz }}</b></p>
        <p>Helytelen: <b>{{ helytelenValasz }}</b></p>
        <p>Téma: <b>{{ temaNev }}</b></p>
        <p>Nehézség: <b>{{ nehezsegSzoveg(nehezseg) }}</b></p>
        <p>Idő kérdésenként: <b>{{ ido }}</b> mp</p>
        <p>Kérdésszám: <b>{{ kerdesSzam }}</b></p>
        <p>Válaszszám: <b>{{ valaszSzam }}</b></p>
        <p>Átlagos válaszidő: <b>{{ (atlagosValaszIdo / kerdesSzam).toFixed(2) }}</b> mp</p>
      </div>
      <button id="folytatasGomb" class="my-4 fs-6" @click="$router.push('/')">Kilépés</button>
    </div>
  </div>
</template>

<script>
import Toltes from '../components/Toltes.vue';
import Hiba from '../components/Hiba.vue';
import { mapState, mapWritableState } from 'pinia';
import { useTemaStore } from '../stores/tema';
import { useQuizBeallitoStore } from '../stores/quizbeallito';
import { useJatekmenetStore } from '../stores/jatekmenet';
import { useFelhasznaloStore } from '../stores/felhasznalo';
import axios from 'axios';
import Cookies from 'js-cookie';
import { nehezsegSzoveg } from '../tema-nehezseg-szoveg'

export default {
  components: {
    Toltes,
    Hiba
  },

  data() {
    return {
      toltes: true,
      hiba: false,
      kerdesvalaszok: {},
      interval: null,
      jatekVege: false,
    }
  },

  beforeUnmount() {
    clearInterval(this.interval);
    useJatekmenetStore().$reset();
  },

  computed: {
    ...mapState(useTemaStore, ['tema', 'temaNev']),
    ...mapState(useQuizBeallitoStore, ['nehezseg', 'ido', 'kerdesSzam', 'valaszSzam']),
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo']),
    ...mapWritableState(useJatekmenetStore, [
      'kor',
      'kerdes',
      'valaszok',
      'maradtIdo',
      'folytatasGombKikapcsol',
      'leNyomottValaszGomb',
      'pont',
      'helyesValasz',
      'helytelenValasz',
      'atlagosValaszIdo'
    ])
  },
  
  created() {
    // hibás téma paraméterkor vagy oldal frissítéskor visszanavigál a főoldalra
    if(this.tema === "default") {
      this.$router.push("/");
    }

    this.getGameQuestions();
  },
  
  methods: {
    async getGameQuestions() {
      await axios.get(`${import.meta.env.VITE_API_URL}/getGameQuestions/${this.tema}/${this.nehezseg}/${this.kerdesSzam}/${this.valaszSzam}`)
        .then(response => {
          let igazE;
          for (let i = 0; i < this.kerdesSzam; i++) {
            let kerdesvalasz = Object.values(response.data)[i];
            for (let j = 0; j < this.valaszSzam; j++) {
              if (j === 0) {
                igazE = true;
              }
              else {
                igazE = false;
              }
              kerdesvalasz.valaszok[`valasz${j + 1}`].helyes = igazE;
            }
            this.kerdesvalaszok[`kerdesvalasz${i + 1}`] = kerdesvalasz;
          }
          this.kerdes = this.kerdesvalaszok.kerdesvalasz1.kerdes;
          this.valaszok = this.valaszKevero(Object.values(this.kerdesvalaszok.kerdesvalasz1.valaszok));
          this.maradtIdo = this.ido;
          this.toltes = false;
          this.valaszFigyelo();
        })
        .catch(error => {
          this.hiba = true;
          console.log('Hiba:', error.message);
        });
    },

    async updateUser() {
      //exp, jatszmaSzam, valaszido mindig frissül
      //rekord frissül ha személyes rekord
      try {
        this.felhasznalo.statisztika.exp += Math.round(this.pont / 100);
        this.felhasznalo.statisztika.jatszmaSzam++;
        this.felhasznalo.statisztika.valaszIdo += (this.atlagosValaszIdo / this.kerdesSzam).toFixed(2);

        await axios.patch(`${import.meta.env.VITE_API_URL}/updateUserStats`, {
          xp: this.felhasznalo.statisztika.exp,
          jatszmaSzam: this.felhasznalo.statisztika.jatszmaSzam,
          valaszIdo: this.felhasznalo.statisztika.valaszIdo
        },{
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        });

        if (this.pont > this.felhasznalo.rekord.pontszam) {
          this.felhasznalo.rekord.pontszam = this.pont;
          this.felhasznalo.rekord.helyesHelytelen = this.helyesValasz + " / " + this.helytelenValasz;
          this.felhasznalo.rekord.tema = this.tema;
          this.felhasznalo.rekord.nehezseg = this.nehezseg;
          this.felhasznalo.rekord.ido = this.ido;
          this.felhasznalo.rekord.kerdesSzam = this.kerdesSzam;
          this.felhasznalo.rekord.valaszSzam = this.valaszSzam;

          await axios.patch(`${import.meta.env.VITE_API_URL}/updateUserRecord`, {
            pontszam: this.felhasznalo.rekord.pontszam,
            helyesHelytelen: this.felhasznalo.rekord.helyesHelytelen,
            tema: this.felhasznalo.rekord.tema,
            nehezseg: this.felhasznalo.rekord.nehezseg,
            ido: this.felhasznalo.rekord.ido,
            kerdesSzam: this.felhasznalo.rekord.kerdesSzam,
            valaszSzam: this.felhasznalo.rekord.valaszSzam
          },{
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get('auth_token')}`
            }
          });
        }
      } catch (error) {
        console.log('Hiba:', error);
      }
    },

    //Fisher-Yates keverés
    valaszKevero(valaszokObj) {
      for (let i = valaszokObj.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [valaszokObj[i], valaszokObj[j]] = [valaszokObj[j], valaszokObj[i]];
      }
      return valaszokObj;
    },

    valaszVizsgalat(helyes) {
      //pont számolás 'ido' nehezítés alapján
      if (helyes) {
        this.helyesValasz++;
        if (this.ido == 10) {
          this.pont += this.maradtIdo * 100;
        }
        else if (this.ido == 20) {
          this.pont += this.maradtIdo * 45;
        }
        else {
          this.pont += this.maradtIdo * 25;
        }
      }
      else {
        this.helytelenValasz++;
      }

      this.leNyomottValaszGomb = true;
      this.folytatasGombKikapcsol = false;
    },

    valaszFigyelo() {
      this.interval = setInterval(() => {
        this.maradtIdo--;
        this.atlagosValaszIdo++;
      }, 1000)
      this.$watch(() => this.leNyomottValaszGomb, (kikapcsol) => {
        if (kikapcsol === true) {
          clearInterval(this.interval);
        }
      })
      this.$watch(() => this.maradtIdo, (ujIdo) => {
        if (ujIdo < 1) {
          clearInterval(this.interval);
          this.valaszVizsgalat(false);
        }
      })
    },

    folytat() {
      this.folytatasGombKikapcsol = true;
      this.kor++;
      const obj = Object.values(this.kerdesvalaszok)[this.kor];
      this.kerdes = obj.kerdes;
      this.valaszok = this.valaszKevero(Object.values(obj.valaszok));
      this.maradtIdo = this.ido;
      this.leNyomottValaszGomb = false;
      this.valaszFigyelo();
    },

    vege() {
      this.jatekVege = true

      if (this.nehezseg == "kozepes") {
        this.pont *= 1.25;
      }
      else if (this.nehezseg == "nehez") {
        this.pont *= 1.5;
      }

      if (this.valaszSzam == 4) {
        this.pont *= 1.25;
      }
      else if (this.valaszSzam == 6) {
        this.pont *= 1.5;
      }

      if(this.felhasznalo.bejelentkezett && Cookies.get('auth_token')) {
        this.updateUser();
      }
    },

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
}

#korSzamlalo {
  text-align: center;
  padding-top: 10px;
  font-size: 16pt;
}

#kerdes {
  text-align: center;
  margin-bottom: 35px;
  font-size: 28pt;
  max-height: 28pt;
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
  font-size: 14pt;
  color: whitesmoke;
  height: 80px;
  max-width: 246px;
  width: 42%;
  margin: 10px;
  position: relative;
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

#visszaSzamoloDiv {
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  height: 50px;
  background-color: whitesmoke;
}

#visszaSzamoloDiv div {
  border-radius: 15px;
  color: black;
  height: 100%;
  text-align: right;
  padding: 0 10px;
  line-height: 50px;
  background-color: rgb(255, 200, 0);
  box-sizing: border-box;
  font-size: 24pt;
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
}

#folytatasGombDiv {
  padding-top: 20px;
  text-align: center;
  padding-bottom: 50px;
}

#folytatasGomb {
  font-weight: 500;
  border: none;
  border-radius: 12px;
  background-color: #4C4C4C;
  color: whitesmoke;
  font-size: 14pt;
  height: 60px;
  width: 160px;
  margin: 10px;
}

.rekord-tablazat {
  margin: 20px;
  background: rgb(16, 16, 16);
  border-radius: 15px;
  padding: 30px;
  width: 75%;
}

.rekord-tablazat h2 {
  text-align: center;
  margin-bottom: 50px;
}

.rekord-tablazat p {
  font-size: 16pt;
}

.valaszGomb:hover,
#folytatasGomb:hover {
  opacity: 0.8;
}

.valaszGomb, #visszaSzamoloDiv, #folytatasGomb {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media screen and (max-height: 900px){
  #korSzamlalo {
    font-size: 14pt;
  }

  #kerdes {
    position: relative;
    font-size: 20pt;
    max-height: 20pt;
  }

  #kep {
    height: 20vh;
  }

  .valaszGomb {
    height: 8vh;
    font-size: 12pt;
  }

  #visszaSzamoloDiv {
    margin-top: 0px;
    height: 35px;
  }

  #visszaSzamoloDiv div {
    line-height: 35px;
    font-size: 16pt;
  }

  #folytatasGomb {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 12pt;
    height: 7vh;
  }

  .rekord-tablazat p {
    margin-bottom: 1vh;
  }
}

@media screen and (max-width: 997px) {
  #korSzamlalo {
    font-size: 16pt;
  }

  #kep {
    height: 20vh;
    object-fit: cover;
  }

  #kerdes {
    position: relative;
    font-size: 20pt;
    max-height: 20pt;
  }

  #gombDiv {
    width: 100%;
  }

  .valaszGomb {
    margin: 5px;
    height: 7.5vh;
    font-size: 12pt;
  }

  #visszaSzamoloDiv {
    height: 35px;
    margin-bottom: 0px;
  }

  #visszaSzamoloDiv div {
    line-height: 35px;
    font-size: 16pt;
  }

  #folytatasGomb {
    font-size: 12pt;
  }

  .rekord-tablazat p {
    margin-bottom: 1vh;
  }
}

@media screen and (max-width: 500px) {
  #korSzamlalo {
    font-size: 4vw;
  }

  #kerdes {
    position: relative;
    font-size: 5vw;
    max-height: 6vw;
  }

  .valaszGomb {
    font-size: 3.2vw;
  }

  #visszaSzamoloDiv {
    height: 25px;
  }

  #visszaSzamoloDiv div {
    line-height: 25px;
    font-size: 12pt;
  }

  #folytatasGomb {
    font-size: 3.2vw;
    width: 40%;
  }

  .rekord-tablazat {
    width: 95%;
  }

  .rekord-tablazat h2 {
    font-size: 8vw;
  }

  .rekord-tablazat p {
    font-size: 5vw;
  }
}
</style>