<script>
import { mapState, mapWritableState } from 'pinia'
import { useQuizBeallitoStore, useJatekmenetStore } from '../stores/stores.js'
import kerdesvalaszokJSON from '../kerdesvalasz.json'

/* kerdesvalasz object
"kerdesvalasz+szám":{
  "kerdes":{"szoveg":"","kep":""},
  "valaszok":{
    "valasz1":{"szoveg":"","helyes":true},
    "valasz2":{"szoveg":"","helyes":false},
    "valasz3":{"szoveg":"","helyes":false},
    "valasz4":{"szoveg":"","helyes":false},
    "valasz5":{"szoveg":"","helyes":false},
    "valasz6":{"szoveg":"","helyes":false}
  }
}
*/

//kerdesvalaszokJSON-ből vedd ki a helyes property-t és add hozzá dinamikusan

export default {
  data() {
    return {
      kerdesvalaszok: JSON.parse(kerdesvalaszokJSON) //átmeneti
    }
  },
  computed: {
    ...mapState(useQuizBeallitoStore, ['nehezseg', 'ido', 'kerdesSzam', 'valaszSzam']),
    ...mapWritableState(useJatekmenetStore, [
      'korSzamlalo',
      'kerdes',
      'kep',
      'valasz1',
      'valasz2',
      'valasz3',
      'valasz4',
      'valasz5',
      'valasz6',
      'maradtIdo',
      'valaszGombokAktiv',
      'folytatasGombAktiv',
      'pont',
      'helyesValasz',
      'helytelenValasz',
      'atlagosValaszIdo'
    ])
  },
  methods: {
    tombKever(tomb){
      for (let i=tomb.length-1; i>0; i--){
        let j=Math.round(Math.random()*(i + 1));
        let temp=tomb[i];
        tomb[i]=tomb[j];
        tomb[j]=temp;
      }
      //return tomb
    },

    valaszKever(tomb){
      //tombKever(tomb)
      for (let i=tomb.length-1; i>0; i--){
        let j=Math.round(Math.random()*(i + 1));
        let temp=tomb[i];
        tomb[i]=tomb[j];
        tomb[j]=temp;
      }
    
      let igazIndex=0
      for(let i=0;i<tomb.length;i++){
        if(tomb[i][1]==true)
        {
          igazIndex=i
        }
      }
      
      let randomIndex=Math.round(Math.random()*(this.valaszSzam-1))
      let temp=tomb[randomIndex]
      tomb[randomIndex]=tomb[igazIndex]
      tomb[igazIndex]=temp
    },
  }
}
</script>

<template>
  <div id="tartalom">
    <div>
      <p id="korSzamlalo">{{ korSzamlalo }} / {{ kerdesSzam }}</p>
      <h3 id="kerdes">{{ kerdesvalaszok }}</h3>
      <img id="kep" :src="kep"/>
      <div id="gombTarolo">
        <div id="gombDiv" v-for="g in gombok">
          <button id="" class="temaGomb">{{  }}</button>
        </div>
      </div>
    </div>
    <!--Játszma vége-->
    
    <div style="text-align: center;">
      <h1 style="padding-top: 25px;">Játszma adatai</h1>
      <h4 style="padding-top: 50px;">Pontszám: {{ pont }} pont</h4>
      <h4 style="padding-top: 25px;">Helyes: {{ helyes }}</h4>
      <h4 style="padding-top: 25px;">Helytelen: {{ helytelen }}</h4>
      <RouterLink to="/" style="padding-bottom: 25px;">
        <button id='folytatasGomb' style="background-color:#4C4C4C">Kilépés</button>
      </RouterLink>
    </div>
    
  </div>
</template>

<style>
#tartalom{
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  width: 100%;
  height: auto;
}

#korSzamlalo{
  text-align: center;
  padding-top: 10px;
  font-size: 16pt;
}

#kerdes{
  text-align: center;
  margin-bottom: 25px;
  font-size: 28pt;
}

#kep{
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  max-height: 300px;
  max-width: 40%;
  width: auto;
  border-radius: 1vw;
}

#gombTarolo{
  text-align: center;
}

#gombDiv{
  width: 80%;
  padding-bottom: 25px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#visszaSzamoloDiv {
  border-radius: 15px;
  width: 80%;
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
  width: 0;
  background-color: rgb(255, 225, 0);
  box-sizing: border-box;
  font-size: 24pt;
  box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.1);
}

.valaszGomb{
  border: none;
  border-radius: 15px;
  background-color: #4C4C4C;
  font-size: 14pt;
  color: white;
  height: 80px;
  max-width: 246px;
  width: 42%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  white-space:pre-wrap;
}

#folytatasGombDiv{
  padding-top: 50px;
  text-align: center;
  padding-bottom: 50px;
}

#folytatasGomb{
  border: none;
  border-radius: 12px;
  background-color: #333333;
  color: white;
  font-size: 14pt;
  height: 60px;
  width: 160px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.valaszGomb:hover, #folytatasGomb:hover{
  opacity: 0.8;
}

#gif{
  height: 500px;
  padding-top:25px;
  padding-bottom:25px;
}

@media screen and (max-width: 500px){
  #kerdes{
    font-size: 6vw;
  }
  #korSzamlalo{
    font-size: 4vw;
  }
  .valaszGomb{
    height: 7.5vh;
    font-size: 3.5vw;
  }
  #gombDiv{
    width: 100%;
  }
}
</style>