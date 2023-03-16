<script>
  import { mapState, mapWritableState } from 'pinia'
  import { useTemaStore } from '../stores/tema'
  import { useQuizBeallitoStore } from '../stores/quizbeallito'
  import { useJatekmenetStore } from '../stores/jatekmenet'
  import { useFelhasznaloStore } from '../stores/felhasznalo'
  import kerdesvalaszokJSON from '../kerdesvalasz.json'

  export default {
    data() {
      return {
        kerdesvalaszok: null,
        interval: null
      }
    },
    beforeRouteLeave() {
      clearInterval(this.interval);
      useJatekmenetStore().$reset()
    },
    computed: {
      // olvasható quizbeállító adatok, írható játékmenet és felhasználó adatok
      ...mapState(useTemaStore, ['tema']),
      ...mapState(useQuizBeallitoStore, ['nehezseg', 'ido', 'kerdesSzam', 'valaszSzam']),
      ...mapWritableState(useFelhasznaloStore, ['felhasznalo']),
      ...mapWritableState(useJatekmenetStore, [
        'kor',
        'kerdes',
        'valaszok',
        'maradtIdo',
        'valaszGombokKikapcsol',
        'folytatasGombKikapcsol',
        'leNyomottValaszGomb',
        'pont',
        'helyesValasz',
        'helytelenValasz',
        'atlagosValaszIdo'
      ])
    },
    mounted() {
      //kezdő állapot
      this.kerdesvalaszok = this.kerdesValaszKezelo()
      this.kerdes = this.kerdesvalaszok.kerdesvalasz1.kerdes
      //Véletlenszerű sorrendű válaszokat ad vissza az objektumból
      this.valaszok = this.valaszKevero(this.kerdesvalaszok.kerdesvalasz1.valaszok)
      this.maradtIdo = this.ido
      this.valaszFigyelo()
    },
    methods: {
      kerdesValaszKezelo(){
        let obj
        obj = kerdesvalaszokJSON //átmeneti

        // hozzáfűz a válaszokhoz egy true vagy false boolt
        for (let i = 0; i < Object.keys(obj).length; i++) {
          let kerdesvalasz = Object.values(obj)[i]
          for (let j = 0; j < this.valaszSzam; j++) {
            let igazE
            if(j === 0){
              igazE = true
            }
            else{
              igazE = false
            }
            kerdesvalasz.valaszok[`valasz${j+1}`].helyes = igazE
          }
          obj[`kerdesvalasz${i+1}`] = kerdesvalasz
        }
        return obj
      },
      
      //Fisher-Yates keverés
      valaszKevero(valaszokObj){
        valaszokObj = Object.values(valaszokObj);
        for (let i = valaszokObj.length - 1; i > 0; i--) {
          const j = Math.round(Math.random() * (i + 1));
          [valaszokObj[i], valaszokObj[j]] = [valaszokObj[j], valaszokObj[i]];
        }
        return valaszokObj
      },
      
      valaszVizsgalat(helyes){
        this.leNyomottValaszGomb = true
        this.valaszGombokKikapcsol = true
        this.folytatasGombKikapcsol = false

        //pont számolás 'ido' nehezítés alapján
        if(helyes){
          this.helyesValasz++
          if(this.ido==10){
            this.pont+=this.maradtIdo*100
          }
          else if(this.ido==20){
            this.pont+=this.maradtIdo*45
          }
          else {
            this.pont+=this.maradtIdo*25
          }
        }
        else {
          this.helytelenValasz++
        }
      },
      
      valaszFigyelo(){
        this.interval = setInterval(() => {
          this.maradtIdo--;
          this.atlagosValaszIdo++;
        }, 1000)
        this.$watch(() => this.maradtIdo, ujIdo => {
          if(ujIdo < 1){
            clearInterval(this.interval)
            this.valaszVizsgalat(false)
          }
        })
        this.$watch(() => this.valaszGombokKikapcsol, kikapcsol => {
          if(kikapcsol===true){
            clearInterval(this.interval)
          }
        })
      },

      folytat(){
        this.kor++
        const obj = Object.values(this.kerdesvalaszok)[this.kor]
        this.kerdes = obj.kerdes
        this.valaszok = this.valaszKevero(obj.valaszok)
        this.leNyomottValaszGomb = false
        this.valaszGombokKikapcsol = false
        this.folytatasGombKikapcsol = true
        this.maradtIdo = this.ido
        this.valaszFigyelo()
      },

      async vege() {
        if(this.nehezseg == "kozepes"){
          this.pont *= 1.25
        }
        else if(this.nehezseg == "nehez"){
          this.pont *= 1.5
        }
        if(this.valaszSzam == 4){
          this.pont *= 1.25
        }
        else if(this.valaszSzam == 6){
          this.pont *= 1.5
        }
        //exp, jatszmaSzam, valaszido mindig frissül
        //rekord frissül ha személyes rekord

        this.felhasznalo.exp += Math.round(this.pont / 100)
        this.felhasznalo.jatszmaSzam++
        // globális válaszidő összeadva a játszmabeli válaszidővel, elosztva a játszmaszámmal majd 2 decimális pontra fixálva 
        // this.valaszIdo = ((this.valaszIdo + this.atlagosValaszIdo) / this.jatszmaSzam).toFixed(2)
        this.felhasznalo.valaszIdo += (this.atlagosValaszIdo / this.kerdesSzam).toFixed(2)

        if(this.pont > this.rekord.pontszam) {
          this.felhasznalo.rekord.pontszam = this.pont
          this.felhasznalo.rekord.helyesHelytelen = this.helyesValasz + " / " + this.helytelenValasz
          this.felhasznalo.rekord.tema = this.tema
          this.felhasznalo.rekord.nehezseg = this.nehezseg
          this.felhasznalo.rekord.ido = this.ido
          this.felhasznalo.rekord.kerdesSzam = this.kerdesSzam
          this.felhasznalo.rekord.valaszSzam = this.valaszSzam

          try {
            const res = await axios.post('/api/', {
              
            });
          }
          catch (error) {
            alert("Hiba az adatok felvitelekor: " + error)
          }
        }
        useJatekmenetStore().$reset()
      }
    }
  }
</script>

<template>
  <div id="tartalom">
    <div v-if="kor < kerdesSzam">
      <p id="korSzamlalo">{{ kor + 1 }} / {{ kerdesSzam }}</p>
      <h3 id="kerdes">{{ kerdes.szoveg }}</h3>
      <img id="kep" :src="kerdes.kep" alt="Kérdés képe" decoding="async"/>
      <div id="gombTarolo">
        <div id="gombDiv">
          <button
            v-for="(value, key) in valaszok"
            :key="key"
            class="valaszGomb"
            :disabled="valaszGombokKikapcsol"
            @click="valaszVizsgalat(value.helyes)"
            :style="{
              //ha a gomb megnyomott akkor a válasz helyessége szerint színezi, ha nem akkor az alapszínt használja
              backgroundColor: leNyomottValaszGomb ? (value.helyes ? 'green' : 'firebrick') : ('#4C4C4C')
            }"
          >
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
        <button
          id=folytatasGomb
          :disabled="folytatasGombKikapcsol"
          @click="kor<kerdesSzam ? (folytat()) : (vege())"
          :style="{
            backgroundColor: folytatasGombKikapcsol ? '#333333' : '#4C4C4C'
          }">
          Folytatás
        </button>
      </div>
    </div>

    <div v-else style="text-align: center;" >
      <h1 style="margin-top: 25px;">Játszma adatai</h1>
      <h4 style="margin-top: 50px;">Pontszám: {{ pont }} pont</h4>
      <h4 style="margin-top: 25px;">Helyes: {{ helyesValasz }}</h4>
      <h4 style="margin-top: 25px;">Helytelen: {{ helytelenValasz }}</h4>
      <h4 style="margin-top: 25px;">Átlagos válaszidő: {{ (atlagosValaszIdo / kerdesSzam).toFixed(2) }} mp</h4>
      <RouterLink to="/">
        <button id='folytatasGomb' style="background-color:#4C4C4C; margin-top: 55px;">Kilépés</button>
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
    margin-top: 50px;
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
    height: 300px;
    max-width: 95%;
    width: auto;
    border-radius: 1vw;
    margin-bottom: 25px;
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
    width: 0;
    background-color: rgb(255, 200, 0);
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
    padding-top: 20px;
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
    #kep{
      height: 100px;
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
    #visszaSzamoloDiv{
      height: 25px; 
    }
    #visszaSzamoloDiv div{
      line-height: 25px; 
      font-size: 12pt;
    }
  }
</style>