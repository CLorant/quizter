<template>
  <div id="tartalom">
    <div id="cim">
      <img src="/img/ikon/quizterlogo.svg" alt="Quizter Logó" decoding="async" id="cim-logo" width="600" height="150">
      <h2>Teszteld a tudásod</h2>
    </div>
    <div id="temaGombTarolo">
      <div id="temaValasztoGombok">
        <TemaGomb v-for="t in temak" :key="t.id" :tema="t.id" :temaNev="t.szoveg" />
      </div>
    </div>
  </div>
</template>

<script>
import TemaGomb from '../components/TemaGomb.vue';

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

<style scoped>
#cim {
  margin-top: 120px;
  margin-bottom: 60px;
  text-align: center;
  color: rgb(255, 200, 0);
}

#cim-logo {
  max-width: 90%;
  height: auto;
}

#temaGombTarolo {
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
}

#temaValasztoGombok {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  max-width: 1906px;
}

@media screen and (max-width: 420px) {
  #cim h2 {
    font-size: 6vw;
  }
}
</style>