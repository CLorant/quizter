<script>
  import TemaGomb from '../components/TemaGomb.vue'

  export default {
    components: {
      TemaGomb
    },
    data() {
      return {
        temak: [
          { id: 'autok', szoveg: 'Autók' },
          { id: 'biologia', szoveg: 'Biológia' },
          { id: 'fizika', szoveg: 'Fizika' },
          { id: 'foldrajz', szoveg: 'Földrajz' },
          { id: 'irodalom', szoveg: 'Irodalom' },
          { id: 'kemia', szoveg: 'Kémia' },
          { id: 'sport', szoveg: 'Sport' },
          { id: 'szorakoztatas', szoveg: 'Szórakoztatás' },
          { id: 'technologia', szoveg: 'Technológia' },
          { id: 'tortenelem', szoveg: 'Történelem' },
          { id: 'zene', szoveg: 'Zene' },
          { id: 'vegyes', szoveg: 'Vegyes' }
        ]
      }
    }
  }
</script>

<template>
  <div id="tartalom">
    <div id="cim">
      <img src="/img/ikon/quizterlogo.webp" alt="Quizter Logó" id="cim-logo">
      <h2>Teszteld a tudásod</h2>
    </div>
    <div id="temaValasztoGombok">
      <TemaGomb v-for="t in temak" :key="t.id" :tema="t.id" :temaNev="t.szoveg"/>
    </div>
  </div>
</template>

<style scoped>
  #tartalom{
    margin-top: 120px;
  }
  #cim{
    color: rgb(255, 200, 0);
    text-align: center;
  }
  #cim-logo{
    height: 90%;
    width: 90%;
    max-width: 600px;
  }
  #temaValasztoGombok{
    text-align: center;
    padding-top: 80px;
    padding-bottom: 100px;
  }

  @media screen and (max-width: 420px){
    #cim h2{
      font-size: 6vw;
    }
  }
</style>