<script>
import { mapWritableState } from 'pinia'
import { useQuizBeallitoStore } from '../stores/stores.js'

export default {
  data() {
    return {
      tema: localStorage.getItem("tema"),
      temaNev: localStorage.getItem("temaNev"),
      temaMagyarazat: localStorage.getItem("temaMagyarazat"),
      beallitas: [
        {}
      ]
    }
  },
  computed: {
    ...mapWritableState(useQuizBeallitoStore, ['nehezseg', 'ido', 'kerdesSzam', 'valaszSzam']),
  },
  state() {

  },
  methods: {
    kepAllito(id) {
      return "../src/img/tema/"+id+".png"
    },

    indit() {
      //apinak: tema, nehezseg, kerdesSzam, valaszSzam
    },

    nehezsegGomb(p){
      szinezo(this.$refs.de, this.$refs.dm, this.$refs.dh, "konnyu", "kozepes", "nehez", this.nehezseg)
    },

    idoGomb(p){
      let e = this.$refs.te
      let m = this.$refs.tm
      let h = this.$refs.th
      e.style=""
      m.style=""
      h.style=""

      if(p==="30"){
        e.style.backgroundColor="green"
      }
      else if(p==="20"){
        m.style.backgroundColor="rgb(210, 180, 0)"
      }
      else if(p==="10"){
        h.style.backgroundColor="firebrick"
      }
      else{
        alert("Hibás paraméter!")
        return
      }

      useQuizBeallitoStore().$patch(
        this.kerdesSzam=p
      )
    },

    kerdesGomb(p){
      let e = this.$refs.qe
      let m = this.$refs.qm
      let h = this.$refs.qh
      e.style=""
      m.style=""
      h.style=""

      if(p==="10"){
        e.style.backgroundColor="green"
      }
      else if(p==="15"){
        m.style.backgroundColor="rgb(210, 180, 0)"
      }
      else if(p==="20"){
        h.style.backgroundColor="firebrick"
      }
      else{
        alert("Hibás paraméter!")
        return
      }
      useQuizBeallitoStore().$patch(
        this.kerdesSzam=p
      )
    },

    valaszGomb(p){
      let e = this.$refs.ae
      let m = this.$refs.am
      let h = this.$refs.ah
      e.style=""
      m.style=""
      h.style=""

      if(p==="2"){
        e.style.backgroundColor="green"
      }
      else if(p==="4"){
        m.style.backgroundColor="rgb(210, 180, 0)"
      }
      else if(p==="6"){
        h.style.backgroundColor="firebrick"
      }
      else{
        alert("Hibás paraméter!")
        return
      }
      useQuizBeallitoStore().$patch(
        this.valaszSzam=p
      )
    },
    
    szinezo(r1, r2, r3, p1, p2, p3, state){
      r1.style=""
      r2.style=""
      r3.style=""

      if(p===p1){
        r1.style.backgroundColor="green"
      }
      else if(p===p2){
        r2.style.backgroundColor="rgb(210, 180, 0)"
      }
      else if(p===p3){
        r3.style.backgroundColor="firebrick"
      }
      else{
        alert("Hibás paraméter!")
        return
      }

      useQuizBeallitoStore().$patch(
        this.state=p
      )
    }
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
  text-align: center;
}

.beallitas{
  display: inline-block;
  text-align: center;
  padding: 80px;
}

@media screen and (max-width: 850px){
  #temaKep{
      width: 95%;
  }
  #temaKepSzoveg{
      font-size: 12vw;
  }
  .beallitas{
      padding: 0px;
      padding-top: 50px;
      padding-bottom: 50px;
  }
}

@media screen and (min-width: 850px){
  #temaKep{
    width: 800px;
  }
  #temaKepSzoveg{
    font-size: 74pt;
  }
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

.konnyu{
  background-color: green;
}

.kozepes{
  background-color: rgb(210, 180, 0);
}

.nehez{
  background-color: firebrick;
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
</style>