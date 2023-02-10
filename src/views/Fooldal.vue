<script>
import TemaGomb from '../components/fooldal/TemaGomb.vue'

export default {
  components: {
    TemaGomb
  },
  data() {
    return {
      temak: [
        { id: 'autok', szoveg: 'Autók', magyarazat: 'Kérdések autókról, gyártókról, a legelső autótól a legutóbbiig.' },
        { id: 'biologia', szoveg: 'Biológia', magyarazat: 'Kérdések emberi és állati anatómiáról, biológiai egyenletekről, elméletekről, fontos személyekről.' },
        { id: 'fizika', szoveg: 'Fizika', magyarazat: 'Kérdések fizikai egyenletekről, elméletekről, fontos személyekről.' },
        { id: 'foldrajz', szoveg: 'Földrajz', magyarazat: 'Kérdések országokról, városokról és azok politikájáról.' },
        { id: 'irodalom', szoveg: 'Irodalom', magyarazat: 'Kérdések irodalmi művekről, fontos személyekről.' },
        { id: 'kemia', szoveg: 'Kémia', magyarazat: 'Kérdések kémiai egyenletekről, elméletekről, fontos személyekről.' },
        { id: 'sport', szoveg: 'Sport', magyarazat: 'Kérdések különböző sportágakról, azok szabályairól, eseményekről, fontos személyekről.' },
        { id: 'szorakoztatas', szoveg: 'Szórakoztatás', magyarazat: 'Kérdések filmekről, sorozatokról, hírességekről.' },
        { id: 'technologia', szoveg: 'Technológia', magyarazat: 'Kérdések a modern technológiáról, nagyrészt informatikáról.' },
        { id: 'tortenelem', szoveg: 'Történelem', magyarazat: 'Kérdések történelmi eseményekről, fontos személyekről.' },
        { id: 'zene', szoveg: 'Zene', magyarazat: 'Kérdések modern pop zenétől a klasszikus zenéig. Ebbe tartoznak a zenészek és együttesek is.' },
        { id: 'vegyes', szoveg: 'Vegyes', magyarazat: 'Kérdések az összes témából, véletlenszerűen.' }
      ]
    }
  }
}
</script>

<template>
<div id="tartalom">
  <div id="cim">
    <img id="cim-logo">
    <h2>Teszteld a tudásod</h2>
  </div>
  <div id="temaValasztoGombok">
    <TemaGomb v-for="t in temak" :key="t.id" :id="t.id" :szoveg="t.szoveg" :magyarazat="t.magyarazat"/>
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
  content: url("../img/ikon/quizterlogo.png");
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