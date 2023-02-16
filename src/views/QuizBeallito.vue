<script>
import { mapWritableState } from 'pinia'
import { useQuizBeallitoStore } from '../stores/stores.js'

export default {
  data() {
    return {
      tema: localStorage.getItem("tema"),
      temaNev: localStorage.getItem("temaNev"),
      temaMagyarazat: localStorage.getItem("temaMagyarazat"),
    }
  },
  computed: {
    ...mapWritableState(useQuizBeallitoStore, ['nehezseg', 'ido', 'kerdesSzam', 'valaszSzam']),
  },
  methods: {
    kepAllito(id) {
      return "../src/img/tema/"+id+".png"
    },

    indit() {
      //apinak: tema, nehezseg, kerdesSzam, valaszSzam
    },

    nehezsegGomb(param){
      this.gombSzinezo(this.$refs.de, this.$refs.dm, this.$refs.dh, param, "konnyu", "kozepes", "nehez")
      useQuizBeallitoStore().$patch(
        this.nehezseg=param
      )
    },

    idoGomb(param){
      this.gombSzinezo(this.$refs.te, this.$refs.tm, this.$refs.th, param, "30", "20", "10")
      useQuizBeallitoStore().$patch(
        this.ido=param
      )
    },

    kerdesGomb(param){
      this.gombSzinezo(this.$refs.qe, this.$refs.qm, this.$refs.qh, param, "10", "15", "20")
      useQuizBeallitoStore().$patch(
        this.kerdesSzam=param
      )
    },

    valaszGomb(param){
      this.gombSzinezo(this.$refs.ae, this.$refs.am, this.$refs.ah, param, "2", "4", "6")
      useQuizBeallitoStore().$patch(
        this.valaszSzam=param
      )
    },

    gombSzinezo(ref1, ref2, ref3, param, konnyu, kozepes, nehez){
      ref1.style=""
      ref2.style=""
      ref3.style=""

      if(param===konnyu){
        ref1.style.backgroundColor="green"
      }
      else if(param===kozepes){
        ref2.style.backgroundColor="rgb(210, 180, 0)"
      }
      else if(param===nehez){
        ref3.style.backgroundColor="firebrick"
      }
      else{
        alert("Hibás paraméter! Alapérték lesz használva.")
      }
    },
  },
}
</script>

<template>
<div id="tartalom">
  <div id="temaDiv">
    <img :src="kepAllito(tema)" id="temaKep">
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
    <RouterLink to="/jatekmenet">
      <button id="inditoGomb" @click="indit()">Indítás</button>
    </RouterLink>
  </div>
</div>
</template>

<style scoped>
#tartalom{
  padding-top: 80px;
  padding-bottom: 80px;
}

#temaDiv{
  position: relative;
  pointer-events: none;
}

#temaKep{
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2vw;
  width: 60%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#temaKepSzoveg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6vw;
  font-weight: bold;
}

#temaMagyarazat{
  padding-top: 15px;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#beallitoDiv{
  width: 100%;
  height: 40%;
  margin-top: 5%;
  margin-bottom: 30px;
  text-align: center;
}

.beallitas{
  display: inline-block;
  text-align: center;
  padding: 40px;
}

.beallitasNev{
  font-size: 28pt;
  padding-bottom: 50px;
}

.beallitasGomb{
  border: none;
  color: white;
  background-color: #4C4C4C;
  width: 200px;
  height: 100px;
  font-size: 20pt;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#inditoGombDiv{
  text-align: center;
  padding-bottom: 50px;
}

#inditoGomb{
  border: none;
  color: white;
  background-color: #c7940a;
  width: 300px;
  height: 80px;
  font-size: 24pt;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.beallitasGomb:hover, #inditoGomb:hover{
  opacity: 0.8;
}

@media screen and (max-width: 750px){
  #temaKep{
    width: 95%;
  }
  #temaKepSzoveg{
    font-size: 12vw;
  }
  .beallitas{
    padding: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 50%;
  }
  .beallitasNev{
    font-size: 4.5vw;
    padding: 10px;
  }
  .beallitasGomb{
    width: 26%;
    height: 12vw;
    margin: 2px;
    font-size: 2.6vw;
    border-radius: 2.5vw;
  }
  #inditoGombDiv{
    padding-bottom: 0px;
  }
  #inditoGomb{
    width: 45vw;
    height: 15vw;
    font-size: 5vw;
  }
}

@media screen and (min-width: 750px){
  #temaKep{
    width: 750px;
  }
  #temaKepSzoveg{
    font-size: 68pt;
  }
}
</style>