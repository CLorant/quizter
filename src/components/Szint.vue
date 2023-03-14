<script>
 export default {
  props: {
    exp: 0,
    magassag: '16px',
    szelesseg: '100px',
    betumeret: '10pt'
  },

  data() {
    return {
      szint: 0,
      szintHaladas: 0,
      szuksegesXp: [100,200,300,500,750,1000,1500,2000,3500,5000,7500,10000,15000,20000,30000,50000,75000,100000,200000,300000,400000,500000,600000,700000,800000,900000,1000000,1100000,1200000]
    }
  },

  mounted() {
    this.szint = this.szintKezelo()
    this.szintHaladas = this.szintHaladasKezelo()
  },

  methods: {
    szintKezelo() {
      for (let i = 0; i < this.szuksegesXp.length; i++) {
        if(this.exp < this.szuksegesXp[i]) {
          return i + 1
        }
        if(this.exp >= 1200000) {
          return 30
        }
      }
    },

    szintHaladasKezelo() {
      let szXpMax = this.szuksegesXp[this.szint-1], szXpMin, slope, yIntercept
      if(this.szint === 30){
        return 100
      }
      else if(this.szint === 1) {
        szXpMin = 0
      }
      else {
        szXpMin = this.szuksegesXp[this.szint-2]
      }
      slope = 100 / (szXpMax - szXpMin)
      yIntercept = -1 * slope * szXpMin
      return Math.max(slope * this.exp + yIntercept, 0) //minimum 0 a szélesség
    }
  }
 }
</script>

<template>
  <div id="szint-tarolo" :style="{height: magassag, width: szelesseg}">
    <div class="d-flex justify-content-center">
      <span id="szint" :style="{fontSize: betumeret}">{{ szint }}.&nbsp;szint</span>
    </div>
    <div id="szint-haladas" :style="{width: szintHaladas + '%'}"></div>
  </div>
</template>

<style scoped>
  #szint-tarolo {
    background-color: white;
  }

  #szint {
    position: absolute;
    color: black;
    font-weight: bold;
  }

  #szint-haladas {
    background-color: rgb(255, 200, 0);
    height: 100%;
  }
</style>