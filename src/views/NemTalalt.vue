<template>
  <div>
    <div id="tartalom">
      <img id="cim-logo"/>
      <h2>A keresett oldal nem található!</h2>
      <RouterLink to="/">
        <button id="visszaGomb">
          Vissza a főoldalra
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  #tartalom{
    color: white;
    min-height: calc(100vh - 300px);
    text-align: center;
    margin-top: 120px;
  }
  #cim-logo{
    width: 90%;
    max-width: 600px;
    height: auto;
    margin-bottom: 25px;
    content: url("../img/ikon/quizterlogo.png");
  }
  #visszaGomb{
    margin-top: 80px;
    border: none;
    border-radius: 12px;
    background-color: #4C4C4C;
    color: white;
    font-size: 14pt;
    height: 60px;
    width: 160px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  #visszaGomb:hover{
    opacity: 0.8;
  }
</style>