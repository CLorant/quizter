<script>
export default {
  methods:{
    active(){
      
    }
  }
}
</script>

<template>

<nav class="navbar navbar-expand-lg fixed-top navbar-dark">
  <button id="navbar-icon" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#elrejt" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
  <RouterLink to="/" class="navbar-brand" id="logo"></RouterLink>
  <div class="collapse navbar-collapse" id="elrejt">
    <div class="navbar-nav">
      <RouterLink to="/" class="nav-item nav-link active">Főoldal</RouterLink> <!--ACTIVE CLASST TEDD DINAMIKUSSÁ-->
      <RouterLink to="/rolunk" class="nav-item nav-link">Rólunk</RouterLink>
      <RouterLink to="/profil" class="nav-item nav-link">Profil</RouterLink>
      <RouterLink to="/ranglista" class="nav-item nav-link">Ranglista</RouterLink>
    </div>
  </div>
  <div class="collapse navbar-collapse justify-content-end"  id="elrejt">
    <form class="form-inline my-2 my-lg-0" id="kereses-form">
      <input class="form-control mr-sm-2" id="kereses-szoveg" type="search" placeholder="Keresés" aria-label="Search">
      <button class="btn btn-warning my-2 my-sm-0" id="kereses-gomb" type="submit">Keresés</button>
    </form>
    <div id="felhasznalo-tarolo">
      <span id="felhasznalo-nev">LukeAFK</span>
      <div id="szint-tarolo">
        <div class="d-flex justify-content-center">
          <span id="szint">1.&nbsp;szint</span>
        </div>
        <div id="szint-haladas"></div>
      </div>
    </div>
    <a href="profil">
      <img alt="Felhasználó kép" id="felhasznalo-kep">
    </a>
  </div>
</nav>
</template>

<style scoped>
#navbar-icon{
  border: none;
  height: 27px;
  width: 40px;
  margin-right: 20px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}
  
#navbar-icon span{
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: white;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}
#navbar-icon span:nth-child(1) {
  top: 0px;
}
#navbar-icon span:nth-child(2),#navbar-icon span:nth-child(3) {
  top: 12px;
}
#navbar-icon span:nth-child(4) {
  top: 24px;
}
#navbar-icon.open span:nth-child(1) {
  top: 15px;
  width: 0%;
  left: 50%;
}
#navbar-icon.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
#navbar-icon.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
#navbar-icon.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}
.navbar{
  background-color: #0b0c0e;
}
.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus {
  outline: none;
  box-shadow: none;
}
.navbar-brand{
  height: 40px;
  content: url("../img/ikon/quizterlogo.png");
}
#kereses-form{
  padding-right: 50px;
}
#kereses-gomb{
  background-color: #c7940a;
  color: #ffffff;
}
#kereses-gomb:hover{
  opacity: 0.8;
}
#felhasznalo-tarolo{
  display: inline-block;
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
}
#felhasznalo-nev{
  font-size: 10pt;
  font-weight: bold;
  color: white;
}
#szint-tarolo{
  background-color: white;
  height: 16px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
}
#szint{
  position: absolute;
  font-size: 10pt;
  color: black;
  font-weight: bold;
}
#szint-haladas{
  background-color: rgb(255, 225, 0);
  height: 16px;
  width: 50%;
}
#felhasznalo-kep{
  float: left;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  content: url("../img/felhasznalo/luke.png");
}
</style>