<template>
  <div id="tartalom">
    <div id="temaDiv">
      <img :src="`/img/tema/nagy/${tema}.webp`" alt="Téma képe" decoding="async" id="temaKep" width="750" height="250">
      <div id="temaKepSzoveg">{{ temaNev }}</div>
    </div>
    <p id="temaMagyarazat">{{ temaMagyarazat }}</p>
    <div id="beallitoDiv">
      <div class="beallitas">
        <h1 class="beallitasNev">Kérdések nehézsége</h1>
        <button class="beallitasGomb" ref="de" @click="nehezsegGomb('konnyu')">Könnyű</button>
        <button class="beallitasGomb" ref="dm" @click="nehezsegGomb('kozepes')">Közepes</button>
        <button class="beallitasGomb" ref="dh" @click="nehezsegGomb('nehez')">Nehéz</button>
      </div>
      <div class="beallitas">
        <h1 class="beallitasNev">Idő kérdésenként</h1>
        <button class="beallitasGomb" ref="te" @click="idoGomb('30')">30 mp</button>
        <button class="beallitasGomb" ref="tm" @click="idoGomb('20')">20 mp</button>
        <button class="beallitasGomb" ref="th" @click="idoGomb('10')">10 mp</button>
      </div>
      <div class="beallitas">
        <h1 class="beallitasNev">Kérdések száma</h1>
        <button class="beallitasGomb" ref="qe" @click="kerdesGomb('10')">10</button>
        <button class="beallitasGomb" ref="qm" @click="kerdesGomb('15')">15</button>
        <button class="beallitasGomb" ref="qh" @click="kerdesGomb('20')">20</button>
      </div>
      <div class="beallitas">
        <h1 class="beallitasNev">Válaszok száma</h1>
        <button class="beallitasGomb" ref="ae" @click="valaszGomb('2')">2</button>
        <button class="beallitasGomb" ref="am" @click="valaszGomb('4')">4</button>
        <button class="beallitasGomb" ref="ah" @click="valaszGomb('6')">6</button>
      </div>
    </div>
    <div id="inditoGombDiv">
      <button id="inditoGomb" @click="indit">Indítás</button>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useTemaStore } from '../stores/tema'
import { useQuizBeallitoStore } from '../stores/quizbeallito'
import { temaSzoveg, temaMagyarazatSzoveg } from '../tema-nehezseg-szoveg'

export default {
  created() {
    useQuizBeallitoStore().$reset();
    this.tema = this.$route.params.temaId
    this.temaNev = temaSzoveg(this.tema);
    this.temaMagyarazat = temaMagyarazatSzoveg(this.tema);
  },

  watch: {
    '$route.params.temaId'() {
      if(this.$router.currentRoute.value.name == 'quizbeallito') {
        this.tema = this.$route.params.temaId
        this.temaNev = temaSzoveg(this.tema);
        this.temaMagyarazat = temaMagyarazatSzoveg(this.tema);
      }
    }
  },

  computed: {
    ...mapWritableState(useTemaStore, ['tema', 'temaNev', 'temaMagyarazat']),
    ...mapWritableState(useQuizBeallitoStore, ['nehezseg', 'ido', 'kerdesSzam', 'valaszSzam'])
  },

  methods: {
    nehezsegGomb(param) {
      this.gombSzinezo(this.$refs.de, this.$refs.dm, this.$refs.dh, param, "konnyu", "kozepes", "nehez");
      this.nehezseg = param;
    },

    idoGomb(param) {
      this.gombSzinezo(this.$refs.te, this.$refs.tm, this.$refs.th, param, "30", "20", "10");
      this.ido = param;
    },

    kerdesGomb(param) {
      this.gombSzinezo(this.$refs.qe, this.$refs.qm, this.$refs.qh, param, "10", "15", "20");
      this.kerdesSzam = param;
    },

    valaszGomb(param) {
      this.gombSzinezo(this.$refs.ae, this.$refs.am, this.$refs.ah, param, "2", "4", "6");
      this.valaszSzam = param;
    },

    gombSzinezo(konnyuGomb, kozepesGomb, nehezGomb, param, konnyu, kozepes, nehez) {
      konnyuGomb.style = "";
      kozepesGomb.style = "";
      nehezGomb.style = "";

      if (param === konnyu) {
        konnyuGomb.style.backgroundColor = "green";
      }
      else if (param === kozepes) {
        kozepesGomb.style.backgroundColor = "rgb(180, 120, 0)";
      }
      else if (param === nehez) {
        nehezGomb.style.backgroundColor = "firebrick";
      }
      else {
        alert("Helytelen beállítás.");
      }
    },

    indit() {
      if (this.nehezseg != "" && this.ido != 0 && this.kerdesSzam != 0 && this.valaszSzam != 0) {
        this.$router.push("/jatekmenet");
      }
      else {
        alert("Nem adott meg elegendő beállítást!");
      }
    }
  }
}
</script>

<style scoped>
#tartalom {
  padding-top: 80px;
  padding-bottom: 80px;
}

#temaDiv {
  position: relative;
  pointer-events: none;
}

#temaKep {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#temaKepSzoveg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 68pt;
  font-weight: bold;
}

#temaMagyarazat {
  padding-top: 15px;
  font-size: 14pt;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#beallitoDiv {
  max-width: 2219px;
  width: 100%;
  height: 40%;
  margin-top: 5%;
  margin-bottom: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.beallitas {
  display: inline-block;
  text-align: center;
  padding: 40px;
}

.beallitasNev {
  font-size: 28pt;
  padding-bottom: 50px;
}

.beallitasGomb {
  border: none;
  color: whitesmoke;
  background-color: #4C4C4C;
  width: 200px;
  height: 100px;
  font-size: 20pt;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#inditoGombDiv {
  text-align: center;
  padding-bottom: 50px;
}

#inditoGomb {
  border: none;
  color: whitesmoke;
  background-color: rgb(180, 120, 0);
  width: 300px;
  height: 80px;
  font-size: 24pt;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.beallitasGomb:hover,
#inditoGomb:hover {
  opacity: 0.8;
}

@media screen and (max-width: 1479px) {
  .beallitas {
    padding: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 50%;
  }

  .beallitasGomb {
    width: 26%;
    margin: 2px;
    font-size: 2vw;
  }
}

@media screen and (max-width: 800px) {
  #temaKep {
    width: 95%;
    height: 95%;
  }

  #temaKepSzoveg {
    font-size: 12vw;
  }

  #temaMagyarazat {
    font-size: 3vw;
  }

  .beallitasNev {
    font-size: 4vw;
    padding: 10px;
  }

  .beallitasGomb {
    height: 10vw;
    font-size: 2.5vw;
    border-radius: 10px;
  }

  #inditoGombDiv {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  #inditoGomb {
    width: 35vw;
    height: 10vw;
    font-size: 3vw;
    border-radius: 10px;
  }
}
</style>