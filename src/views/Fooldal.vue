<script>
import TemaGomb from '../components/fooldal/TemaGomb.vue';

export default {
  components: {
    TemaGomb
  },
  data() {
    return {
      temak: [
        { tema: 'autok', temaNev: 'Autók' },
        { tema: 'biologia', temaNev: 'Biológia' },
        { tema: 'fizika', temaNev: 'Fizika' },
        { tema: 'foldrajz', temaNev: 'Földrajz' },
        { tema: 'irodalom', temaNev: 'Irodalom' },
        { tema: 'kemia', temaNev: 'Kémia' },
        { tema: 'sport', temaNev: 'Sport' },
        { tema: 'szorakoztatas', temaNev: 'Szórakoztatás' },
        { tema: 'technologia', temaNev: 'Technológia' },
        { tema: 'tortenelem', temaNev: 'Történelem' },
        { tema: 'zene', temaNev: 'Zene' },
        { tema: 'vegyes', temaNev: 'Vegyes' }
      ]
    }
  }
}
</script>

<template>
<div id="tartalom">
  <div id="cim">
    <img id="cim-logo" src="../img/ikon/quizterlogo.png">
    <h2>Teszteld a tudásod</h2>
  </div>
  <div id="temaValasztoGombok">
    <TemaGomb v-for="t in temak" :key="t.tema" :tema="t.tema" :temaNev="t.temaNev"/>
  </div>
</div>
</template>

<style scoped>
#tartalom{
  margin-top: 120px;
}
#cim{
  color: rgb(255, 225, 0);
  text-align: center;
}
#cim-logo{
  width: 90%;
  max-width: 600px;
  height: auto;
}
#temaValasztoGombok{
  text-align: center;
  padding-top: 80px;
  padding-bottom: 100px;
}
@media screen and (max-width: 420px){
  .temaGomb{
    margin: 0px;
    margin-bottom: 25px;
  }
  #cim h2{
    font-size: 6vw;
  }
}
</style>