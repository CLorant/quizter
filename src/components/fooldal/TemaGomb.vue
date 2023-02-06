<script>
  export default {
    props: {
      tema: String,
      temaNev: String
    },
    methods: {
      indit() {
        sessionStorage.setItem("tema", this.tema);
        sessionStorage.setItem("temaKep", "../../img/"+this.tema+".png");
        sessionStorage.setItem("temaNev", document.getElementById(this.tema).innerText);
      }
    }
  }
  
</script>

<template>
  <RouterLink :to="{name: 'quizbeallito', params: {id: tema}}" >
    <button class='temaGomb' :id="tema" @click="indit(tema)">{{temaNev}}</button>
  </RouterLink>
</template>

<style>
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
    background-image: url('../../img/tema/autok.png');
  }
  #biologia{
    background-image: url('../../img/tema/biologia.png');
  }
  #fizika{
    background-image: url('../../img/tema/fizika.png');
  }
  #foldrajz{
    background-image: url('../../img/tema/foldrajz.png');
  }
  #irodalom{
    background-image: url('../../img/tema/irodalom.png');
  }
  #kemia{
    background-image: url('../../img/tema/kemia.png');
  }
  #sport{
    background-image: url('../../img/tema/sport.png');
  }
  #szorakoztatas{
    background-image: url('../../img/tema/szorakoztatas.png');
  }
  #technologia{
    background-image: url('../../img/tema/technologia.png');
  }
  #tortenelem{
    background-image: url('../../img/tema/tortenelem.png');
  }
  #zene{
    background-image: url('../../img/tema/zene.png');
  }
  #vegyes{
    background-image: url('../../img/tema/vegyes.png');
  }
  @media screen and (max-width: 820px){
    .temaGomb{
      font-size: 6vw;
      width: 45%;
      background-position: center;
      margin-left: 5px;
      margin-right: 5px;
      margin-bottom: 25px;
    }
  }
</style>