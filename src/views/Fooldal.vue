<script>

export default {
data() {
  return {
    temak: [
      { id: 'autok', text: 'Autók' },
      { id: 'biologia', text: 'Biológia' },
      { id: 'fizika', text: 'Fizika' },
      { id: 'foldrajz', text: 'Földrajz' },
      { id: 'irodalom', text: 'Irodalom' },
      { id: 'kemia', text: 'Kémia' },
      { id: 'sport', text: 'Sport' },
      { id: 'szorakoztatas', text: 'Szórakoztatás' },
      { id: 'technologia', text: 'Technológia' },
      { id: 'tortenelem', text: 'Történelem' },
      { id: 'zene', text: 'Zene' },
      { id: 'vegyes', text: 'Vegyes' }
    ]
  }
},

emits: ['tema', 'temaNev'],

methods: {
  indit() {
    this.$emit('tema', this.id);
    this.$emit('temaNev', this.text)
    //window.sessionStorage.setItem("temakor", tema);
    
    //window.sessionStorage.setItem("temaKepUtvonal", "../img/"+tema+".png");
    //window.sessionStorage.setItem("temaNev", document.getElementById(tema).innerText);
    //document.getElementById("quizbeallitoForm").submit();
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
    <RouterLink v-for="tema in temak" :key="tema.id" :to="{name: 'quizbeallito', params: {id: tema.id}}" >
      <button type="button" :id="tema.id" class="temaGomb" @click="indit()">{{tema.text}}</button>
      
    </RouterLink>
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
.temaGomb{
  color: white;
  font-size: 29pt;
  font-weight: bold;
  border: none;
  height: 120px;
  width: 95%;
  max-width: 360px;
  border-radius: 25px;
  margin: 25px;
  background-size:cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.temaGomb:hover{
  opacity: 0.8;
}
#autok{
  background-image: url("../img/tema/autok.png");
}
#biologia{
  background-image: url("../img/tema/biologia.png");
}
#fizika{
  background-image: url("../img/tema/fizika.png");
}
#foldrajz{
  background-image: url("../img/tema/foldrajz.png");
}
#irodalom{
  background-image: url("../img/tema/irodalom.png");
}
#kemia{
  background-image: url("../img/tema/kemia.png");
}
#sport{
  background-image: url("../img/tema/sport.png");
}
#szorakoztatas{
  background-image: url("../img/tema/szorakoztatas.png");
}
#technologia{
  background-image: url("../img/tema/technologia.png");
}
#tortenelem{
  background-image: url("../img/tema/tortenelem.png");
}
#zene{
  background-image: url("../img/tema/zene.png");
}
#vegyes{
  background-image: url("../img/tema/vegyes.png");
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