<script>
import { mapState, mapWritableState } from 'pinia';
import { useTemaStore } from '../stores/tema';
import { useQuizBeallitoStore } from '../stores/quizbeallito';
import { useJatekmenetStore } from '../stores/jatekmenet';
import { useFelhasznaloStore } from '../stores/felhasznalo';
import axios from 'axios';
import kerdesvalaszokJSON from '../kerdesvalasz.json'; // átmeneti

export default {
  data() {
    return {
      kerdesvalaszok: null,
      interval: null,
      jatekVege: false
    }
  },

  beforeUnmount() {
    clearInterval(this.interval);
    useJatekmenetStore().$reset();
  },

  computed: {
    // olvasható quizbeállító adatok, írható játékmenet és felhasználó adatok
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

  mounted() {
    // visszanavigál a főoldalra ha helytelen a téma state
    if(this.tema === "") {
      this.$router.push("/");
    }
    //kezdő állapot
    this.kerdesvalaszok = this.kerdesValaszKezelo();
    this.kerdes.szoveg = this.kerdesvalaszok.kerdesvalasz1.kerdes.szoveg;
    this.kerdes.kep = this.kerdesvalaszok.kerdesvalasz1.kerdes.kep;
    //Véletlenszerű sorrendű válaszokat ad vissza az objektumból
    this.valaszok = this.valaszKevero(Object.values(this.kerdesvalaszok.kerdesvalasz1.valaszok));
    this.maradtIdo = this.ido;
    this.valaszFigyelo();
  },
  methods: {
    kerdesValaszKezelo() {
      /*
      try {
        let res = axios.get('/api/getGameQuestions', {
          params: {
            tema: this.tema,
            nehezseg: this.nehezseg,
            kerdesSzam: this.kerdesSzam,
            valaszSzam: this.valaszSzam
          }
        });
        
        // hozzáfűz a válaszokhoz egy true vagy false boolt
        for (let i = 0; i < this.kerdesSzam; i++) {
          let kerdesvalasz = Object.values(res.data)[i];
          for (let j = 0; j < this.valaszSzam; j++) {
            let igazE;
            if (j === 0) {
              igazE = true;
            }
            else {
              igazE = false;
            }
            kerdesvalasz.valaszok[`valasz${j + 1}`].helyes = igazE;
          }
          res.data[`kerdesvalasz${i + 1}`] = kerdesvalasz;
        }
        return res;
      } catch (error) {
        console.log(error);
      }
      */
     
      let obj = kerdesvalaszokJSON; //átmeneti
      // hozzáfűz a válaszokhoz egy true vagy false boolt
      for (let i = 0; i < this.kerdesSzam; i++) {
        let kerdesvalasz = Object.values(obj)[i];
        for (let j = 0; j < this.valaszSzam; j++) {
          let igazE;
          if (j === 0) {
            igazE = true;
          }
          else {
            igazE = false;
          }
          kerdesvalasz.valaszok[`valasz${j + 1}`].helyes = igazE;
        }
        obj[`kerdesvalasz${i + 1}`] = kerdesvalasz;
      }
      return obj
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
      //exp, jatszmaSzam, valaszido mindig frissül
      //rekord frissül ha személyes rekord

      this.felhasznalo.exp += Math.round(this.pont / 100);
      this.felhasznalo.jatszmaSzam++;
      // globális válaszidő összeadva a játszmabeli válaszidővel, elosztva a játszmaszámmal majd 2 decimális pontra fixálva
      this.felhasznalo.valaszIdo += (this.atlagosValaszIdo / this.kerdesSzam).toFixed(2);

      // updateUserStats
      this.updateUser();
    },

    async updateUser() {
      try {
        await axios.patch('/api/updateUserStats', {
          exp: this.felhasznalo.statisztika.exp,
          jatszmaSzam: this.felhasznalo.statisztika.jatszmaSzam,
          valaszIdo: this.felhasznalo.statisztika.valaszIdo
        });

        if (this.pont > this.felhasznalo.rekord.pontszam) {
          this.felhasznalo.rekord.pontszam = this.pont;
          this.felhasznalo.rekord.helyesHelytelen = this.helyesValasz + " / " + this.helytelenValasz;
          this.felhasznalo.rekord.tema = this.tema;
          this.felhasznalo.rekord.nehezseg = this.nehezseg;
          this.felhasznalo.rekord.ido = this.ido;
          this.felhasznalo.rekord.kerdesSzam = this.kerdesSzam;
          this.felhasznalo.rekord.valaszSzam = this.valaszSzam;

          // updateUserRecord
          await axios.patch('/api/updateUserRecord', {
            pontszam: this.felhasznalo.rekord.pontszam,
            helyesHelytelen: this.felhasznalo.rekord.helyesHelytelen,
            tema: this.felhasznalo.rekord.tema,
            nehezseg: this.felhasznalo.rekord.nehezseg,
            ido: this.felhasznalo.rekord.ido,
            kerdesSzam: this.felhasznalo.rekord.kerdesSzam,
            valaszSzam: this.felhasznalo.rekord.valaszSzam
          });
        }
      } catch (error) {
        console.log(error);
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
  }
}
</script>

<template>
  <div id="tartalom">
    <div v-if="!jatekVege">
      <p id="korSzamlalo">{{ kor + 1 }} / {{ kerdesSzam }}</p>
      <h4 id="kerdes">{{ kerdes.szoveg }}</h4>
      <img id="kep" :src="kerdes.kep" alt="Kérdés képe" decoding="async" />
      <div id="gombTarolo">
        <div id="gombDiv">
          <button v-for="(value, key) in valaszok" :key="key" class="valaszGomb" :disabled="leNyomottValaszGomb"
            @click="valaszVizsgalat(value.helyes)" :style="{
              //ha a gomb megnyomott akkor a válasz helyessége szerint színezi, ha nem akkor az alapszínt használja
              backgroundColor: leNyomottValaszGomb ? (value.helyes ? 'green' : 'firebrick') : ('#4C4C4C')
            }">
            {{ value.szoveg }}
          </button>
        </div>
      </div>
      <div id="visszaSzamoloDiv">
        <div :style="{
          width: maradtIdo / ido * 100 + '%'
        }">{{ maradtIdo }}</div>
      </div>
      <div id="folytatasGombDiv">
        <button v-if="kor < kerdesSzam - 1" id=folytatasGomb :disabled="folytatasGombKikapcsol" @click="folytat()"
          :style="{
            backgroundColor: folytatasGombKikapcsol ? '#333333' : '#4C4C4C'
          }">
          Folytatás
        </button>
        <button v-else id=folytatasGomb @click="vege()"
        :style="{
          backgroundColor: folytatasGombKikapcsol ? '#333333' : '#4C4C4C'
        }">
          Befejezés
        </button>
      </div>
    </div>

    <div v-else class="d-flex align-items-center justify-content-center flex-column pt-3">
      <div class="rekord-tablazat">
          <h1>Játszma adatai</h1>
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

<style>
#tartalom {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  width: 100%;
  height: auto;
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

#visszaSzamoloDiv {
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  height: 50px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.1);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  white-space: pre-wrap;
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
  background-color: #333333;
  color: whitesmoke;
  font-size: 14pt;
  height: 60px;
  width: 160px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.rekord-tablazat {
  margin: 20px;
  background: rgb(16, 16, 16);
  border-radius: 15px;
  padding: 30px;
  width: 75%;
}

.rekord-tablazat h1 {
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

@media screen and (max-height: 800px) {
  #kep {
    height: 20vh;
  }

  #kerdes {
    font-size: 3vw;
    max-height: 3vw;
  }

  .valaszGomb {
    height: 8vh;
    font-size: 1.5vw;
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
    font-size: 1.5vw;
    height: 7vh;
  }

  .rekord-tablazat p {
    margin-bottom: 1vh;
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
    max-height: 4vw;
  }

  .valaszGomb {
    margin: 1vw;
    height: 5.5vh;
    font-size: 2.5vw;
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
    font-size: 2.5vw;
  }

  .rekord-tablazat p {
    margin-bottom: 1vh;
  }
}

@media screen and (max-width: 500px) {
  #korSzamlalo {
    font-size: 4.5vw;
  }

  #kerdes {
    position: relative;
    font-size: 5.5vw;
    max-height: 6vw;
  }

  .valaszGomb {
    height: 7.5vh;
    font-size: 3.5vw;
  }

  #gombDiv {
    width: 100%;
  }

  #visszaSzamoloDiv {
    height: 25px;
  }

  #visszaSzamoloDiv div {
    line-height: 25px;
    font-size: 12pt;
  }

  #folytatasGomb {
    font-size: 3.5vw;
    width: 40%;
  }

  .rekord-tablazat {
    width: 95%;
  }

  .rekord-tablazat h1 {
    font-size: 8vw;
  }

  .rekord-tablazat p {
    font-size: 5vw;
  }
}
</style>