<script>
import axios from 'axios'
  export default {
    data() {
      return {
        kerdes: '',
        kep: '',
        valasz1: '',
        valasz2: '',
        valasz3: '',
        valasz4: '',
        valasz5: '',
        valasz6: '',
        kepMegjelenit: false
      }
    },

    methods: {
      async createQuestion() {
        try {
          await axios.post("api/createQuestion", {
            kerdes: this.kerdes,
            kep: this.kep,
            valasz1: this.valasz1,
            valasz2: this.valasz2,
            valasz3: this.valasz3,
            valasz4: this.valasz4,
            valasz5: this.valasz5,
            valasz6: this.valasz6
          });
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<template>
  <div id="tartalom">
    <div>
      <input id="kerdes" type="text" v-model="kerdes" class="form-control text-light border-secondary w-100">
      <input v-if="kepMegjelenit==false" type="text" v-model="kep" id="kep" class="form-control text-light border-secondary w-100">
      <img v-else id="kep" :src="kep" alt="Kérdés képe" decoding="async" />
      <button v-if="kep !== ''" class="btn" :class="kepMegjelenit ? 'btn-secondary' : 'btn-primary'" @click="kepMegjelenit = !kepMegjelenit">Kép {{ kepMegjelenit ? 'Elrejtése' : 'Megjelenítése' }}</button>
      <div id="gombTarolo">
        <div id="gombDiv">
          <input class="valaszGomb" v-model="valasz1">
          <input class="valaszGomb" v-model="valasz2">
          <input class="valaszGomb" v-model="valasz3">
          <input class="valaszGomb" v-model="valasz4">
          <input class="valaszGomb" v-model="valasz5">
          <input class="valaszGomb" v-model="valasz6">
        </div>
      </div>
      <button class="btn btn-lg btn-success" @click="createQuestion">Mentés</button>
    </div>
  </div>
</template>

<style scoped>
  #tartalom {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
    width: 100%;
    height: auto;
    margin-top: 60px;
    text-align: center;
  }

  #kerdes {
    text-align: center;
    margin-bottom: 25px;
    font-size: 28pt;
  }

  #kep {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 300px;
    max-width: 95%;
    width: auto;
    border-radius: 1vw;
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
    text-align: center;
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
    white-space: pre-wrap;
  }

  input,
  input:focus {
    background-color: #0D1117;
  }

  .valaszGomb:hover,
  #folytatasGomb:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 500px) {
  #kerdes {
    font-size: 6vw;
  }

  #kep {
    height: 100px;
  }

  .valaszGomb {
    height: 7.5vh;
    font-size: 3.5vw;
  }

  #gombDiv {
    width: 100%;
  }
}
</style>