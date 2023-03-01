<script>
import { ref, onMounted } from 'vue';
let navIconClick=false
export default {
  data() {
    return {
      dropdown: null,
      dropdownToggle: null
    }
    
  },
  setup() {
    const dropdown = ref(null);
    const dropdownToggle = ref(null);

    onMounted(() => {
      dropdownToggle.value.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdown.value.classList.toggle('show');
      });
    });
  },
  methods:{
    aktiv(path){
      if(this.$router.currentRoute.value.path === path){
        return "active"
      }
    },
    openCloseNavToggler(){
      navIconClick=!navIconClick
      navIconClick?document.querySelector('.navbar-toggler').id='open':document.querySelector('.navbar-toggler').id='closed'
    }
  }
}
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
  <div class="container-fluid">
    <button class="navbar-toggler collapsed"
    id="closed"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#navbarNav"
		aria-controls="navbarNav"
		aria-expanded="false"
		aria-label="Toggle navigation"
    @click="openCloseNavToggler()">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <RouterLink to="/" class="navbar-brand" id="logo"></RouterLink>

    <!-- Bejelentkezett -->
    <div v-if="true">
      <div class="jobb-nav collapse navbar-collapse" id="navbarNav" style="top:6px;">
        <div id="felhasznalo-tarolo">
          <span id="felhasznalo-nev">LukeAFK</span>
          <div id="szint-tarolo">
            <div class="d-flex justify-content-center">
              <span id="szint">1.&nbsp;szint</span>
            </div>
            <div id="szint-haladas"></div>
          </div>
        </div>
      </div>
      <div class="dropdown jobb-nav">
        <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="../img/felhasznalo/luke.png" alt="Felhasználókép" class="felhasznalo-kep">
        </div>
        <!-- Toggle show class, align dropdown to more right -->
        <div class="dropdown-menu dropdown-menu-dark show" aria-labelledby="dropdownMenuButton">
          <RouterLink to="/profil" class="dropdown-item">Profil</RouterLink>
          <!-- kijelentkezés gomb -->
        </div>
      </div>
    </div>
    
    <!-- Nem bejelentkezett -->
    <!--
      <RouterLink to="/bejelentkezes" class="nav-item nav-link" id="navbarNav" :class="aktiv('/bejelentkezes')">Bejelentkezés</RouterLink>
      <RouterLink to="/regisztracio" class="nav-item nav-link" :class="aktiv('/regisztracio')">Regisztráció</RouterLink> 
    -->
    <div v-else class="justify-content-end">
      <ul v class="navbar-nav ms-auto jobb-nav">
        <li>
          
        </li>
        <li>
          
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="navbar-nav">
        <RouterLink to="/" class="nav-item nav-link" :class="aktiv('/')">Főoldal</RouterLink>
        <RouterLink to="/rolunk" class="nav-item nav-link" :class="aktiv('/rolunk')">Rólunk</RouterLink>
        <RouterLink to="/profil" class="nav-item nav-link" :class="aktiv('/profil')">Profil</RouterLink>
        <RouterLink to="/ranglista" class="nav-item nav-link" :class="aktiv('/ranglista')">Ranglista</RouterLink>
      </div>
    </div>
    
    <div class="collapse navbar-collapse kereso-tarolo" id="navbarNav" >
      <div class="input-group">
        <input class="form-control" id="nav-kereses-szoveg" type="search" placeholder="Keresés" aria-label="Search">
        <button class="btn text-light" id="nav-kereses-gomb" type="submit">Keresés</button>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.navbar-toggler{
  border: none;
  height: 26px;
  width: 40px;
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
.navbar-toggler span{
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
#closed span:nth-child(1) {
  top: 0px;
}
#closed span:nth-child(2),#navbar-toggler span:nth-child(3) {
  top: 13px;
}
#closed span:nth-child(4) {
  top: 26px;
}
#open span:nth-child(1) {
  top: 15px;
  width: 0%;
  left: 50%;
}
#open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
#open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
#open span:nth-child(4) {
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
  margin-right: 40px;
  content: url("../img/ikon/quizterlogo.png");
}
#nav-kereses-szoveg{
  max-width: 206px;
}
#nav-kereses-gomb{
  background-color: #c7940a;
}
#nav-kereses-gomb:hover{
  opacity: 0.8;
}
.kereso-tarolo{
  margin-left: 120px;
  margin-right: 120px;
}
.input-group{
  display: flex;
  justify-content: end;
  margin-right: 50px;
}
#felhasznalo-tarolo{
  display: inline-block;
  text-align: center;
  margin-right: 45px;
  margin-left: 10px;
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
.jobb-nav{
  position:absolute;
  right:12px;
  top:10px;
}
.felhasznalo-kep{
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
}
.col-auto{
  margin-right: 10px;
}
@media screen and (max-width: 991px) {
  .input-group{
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    justify-content: center;
  }
  #felhasznalo-tarolo{
    display: none;
  }
  .kereso-tarolo{
    margin: 0;
  }
}
</style>