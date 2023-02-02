<script>
export default {
  
  methods: {

  }
  
}
</script>

<template>
<div id="tartalom">
  <div id="temaDiv">
    <img id="temaKep">
    <div id="temaKepSzoveg"></div>
  </div>
  <p id="temaMagyarazat"></p>
  <div id="beallitoDiv">
    <div class="beallitas">
      <h1 class="beallitasNev">Kérdések nehézsége</h1>
      <button class="beallitasGomb" id="nehezseg:konnyu" value="nehezseg:konnyu">Könnyű</button>
      <button class="beallitasGomb" id="nehezseg:kozepes" value="nehezseg:kozepes">Közepes</button>
      <button class="beallitasGomb" id="nehezseg:nehez" value="nehezseg:nehez">Nehéz</button>
    </div>
    <div class="beallitas">
      <h1 class="beallitasNev">Idő kérdésenként</h1>
      <button class="beallitasGomb" id="ido:konnyu" value="ido:30">30 mp</button>
      <button class="beallitasGomb" id="ido:kozepes" value="ido:20">20 mp</button>
      <button class="beallitasGomb" id="ido:nehez" value="ido:10">10 mp</button>
    </div>
    <div class="beallitas">
      <h1 class="beallitasNev">Kérdések száma</h1>
      <button class="beallitasGomb" id="kerdes:konnyu" value="kerdes:10">10</button>
      <button class="beallitasGomb" id="kerdes:kozepes" value="kerdes:15">15</button>
      <button class="beallitasGomb" id="kerdes:nehez" value="kerdes:20">20</button>
    </div>
    <div class="beallitas">
      <h1 class="beallitasNev">Válaszok száma</h1>
      <button class="beallitasGomb" id="valasz:konnyu" value="valasz:2">2</button>
      <button class="beallitasGomb" id="valasz:kozepes" value="valasz:4">4</button>
      <button class="beallitasGomb" id="valasz:nehez" value="valasz:6">6</button>
    </div>
  </div>
  <div id="inditoGombDiv">
    <RouterLink to="/jatekmenet">
      <button type="button" id="inditoGomb" @click="indit()">Indítás</button>
    </RouterLink>
  </div>
</div>
</template>

<style scoped>
#tartalom{
  padding-top: 80px;
  padding-bottom: 80px;
}

#temaDiv{
  position: relative;
  pointer-events: none;
}

#temaKep{
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2vw;
  max-width: 800px;
  width: 60%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#temaKepSzoveg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6vw;
  font-weight: bold;
}

#temaMagyarazat{
  padding-top: 15px;
  font-size: 16pt;
  text-align: center;
  padding-left: 20%;
  padding-right: 20%;
}

#beallitoDiv{
  width: 100%;
  height: 40%;
  text-align: center;
}

.beallitas{
  display: inline-block;
  text-align: center;
  padding: 80px;
}

@media screen and (max-width: 850px){
  #temaKep{
      width: 95%;
  }
  #temaKepSzoveg{
      font-size: 12vw;
  }
  .beallitas{
      padding: 0px;
      padding-top: 50px;
      padding-bottom: 50px;
  }
}

.beallitasNev{
  font-size: 28pt;
  padding-bottom: 50px;
}

.beallitasGomb{
  border: none;
  color: white;
  background-color: #4C4C4C;
  width: 200px;
  height: 100px;
  font-size: 20pt;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#inditoGombDiv{
  text-align: center;
  padding-bottom: 50px;
}

#inditoGomb{
  border: none;
  color: white;
  background-color: #c7940a;
  width: 300px;
  height: 80px;
  font-size: 24pt;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.beallitasGomb:hover, #inditoGomb:hover{
  opacity: 0.8;
}
</style>