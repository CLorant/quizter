<script>
import { RouterLink } from 'vue-router'

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
  methods: {
    hirlevel(){
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxTZtkYZvlKYAyhLJMGvrHO3oVYyRlGM_kv7Tpdx1QdO9JRhd3teVJ34NYl-3rpD5dK/exec'
      const form = document.forms['submit-to-google-sheet']
      form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      })
    }
  }
}
</script>

<template>
<footer>
  <div class="sor fo">
    <div class="oszlop rolunk-footer">
      <div class="logo-tarolo">
        <RouterLink to="/" class="logo"></RouterLink>
      </div>
      <p>
        A Quizter egy magyar nyelvű kvízes weboldal, ahol 11
        különböző témában érhetőek el kvízek. A fejlesztése 2022-ben
        kezdődött.
      </p>
      <div class="kozossegi-tarolo">
        <a
          href="https://www.youtube.com"
          target="_blank"
          class="kozossegi-gomb youtube"
        ></a>
        <a
          href="https://www.reddit.com/r/quizter"
          target="_blank"
          class="kozossegi-gomb reddit"
        ></a>
        <a
          href="https://github.com/CLorant/quizter"
          target="_blank"
          class="kozossegi-gomb github"
        ></a>
      </div>
    </div>
    <div class="oszlop linkek-tarolo">
      <h3>Oldalak</h3>
      <ul>
        <li>
          <RouterLink to="/">Főoldal</RouterLink>
        </li>
        <li>
          <RouterLink to="/rolunk">Rólunk</RouterLink>
        </li>
        <li>
          <RouterLink to="/profil">Profil</RouterLink>
        </li>
        <li>
          <RouterLink to="/ranglista">Ranglista</RouterLink>
        </li>
        <li>
          <RouterLink to="/aszf">ÁSZF</RouterLink>
        </li>
        <!--
        <li>
          <RouterLink to="/bejelentkezes">Bejelentkezés</RouterLink>
        </li>
        <li>
          <RouterLink to="/regisztracio">Regisztráció</RouterLink>
        </li>-->
        <li>
          <RouterLink to="/suti-tajekoztato">Süti tájékoztató</RouterLink>
        </li>
      </ul>
      <ul style="float: left;">
        
      </ul>
    </div>
    <div class="oszlop linkek-tarolo">
      <h3>Témák</h3>
      <ul>
        <li v-for="tema in temak" :key="tema.id">
          <RouterLink to="/quizbeallito/">{{tema.text}}</RouterLink>
        </li>
      </ul>
    </div>
    <div class="oszlop linkek-tarolo">
      <h3>Elérhetőség</h3>
      <ul>
        
        <li>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=quizterhelp@gmail.com"
            target="_blank"
            >Email</a
          >
        </li>
      </ul>
    </div>
    <!--
    <div class="oszlop feliratkozas-tarolo">
      <h3>Hírlevél</h3>
      <form name="submit-to-google-sheet">
        <input
          type="email"
          name="Email"
          placeholder="Email"
          class="feliratkozas-doboz"
          required
        />
        <button type="submit" class="feliratkozas-gomb">Feliratkozás</button>
      </form>
    </div>
  -->
  </div>
  <div class="sor copyright">
    <p class="copyright-szoveg">Copyright &copy; 2023 Quizter</p>
  </div>
</footer>
</template>

<style scoped>
footer {
  background-color: #0b0c0e;
  color: white;
  font-size: 16px;
}
footer * {
  box-sizing: border-box;
  border: none;
  outline: none;
}
footer h3 {
  color: white;
  font-size: 16pt;
  text-align: center;
  padding-bottom: 15px;
  padding-top: 15px;
}
.sor {
  padding: 1em 1em;
}
.sor.fo {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: stretch;
  margin-bottom: 10px;
}
.oszlop {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  padding: 0 2em;
}
.linkek-tarolo h3 {
  width: 100%;
  text-align: left;
  color: white;
  font-size: 1.4em;
  white-space: nowrap;
}
.linkek-tarolo ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
.linkek-tarolo li:not(:first-child) {
  margin-top: 0.8em;
}
.linkek-tarolo ul li * {
  color: #a7a7a7;
  text-decoration: none;
}
.linkek-tarolo ul li a:hover {
  color: rgb(255, 225, 0);
}
.rolunk-footer p {
  text-align: justify;
  line-height: 2;
  margin: 0;
}
.logo-tarolo {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.logo {
  height: 40px;
  width: 155px;
  background-size: cover;
  background-image: url("../img/quizterlogo_white.png");
}
.logo:hover {
  background-image: url("../img/quizterlogo.png");
}
.feliratkozas-doboz,
.feliratkozas-gomb {
  font-size: 1em;
  padding: 1em;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}
.feliratkozas-gomb {
  background-color: #c7940a;
  color: #ffffff;
}
.feliratkozas-gomb:hover {
  opacity: 0.8;
}
div.kozossegi-tarolo {
  display: flex;
  justify-content: space-evenly;
  font-size: 2.4em;
  flex-direction: row;
  margin-top: 0.5em;
  padding-left: 20%;
  padding-right: 20%;
}
.kozossegi-gomb {
  height: 30px;
  width: 30px;
  background-size: cover;
}
.reddit {
  background-image: url("../img/reddit_icon.png");
}
.youtube {
  background-image: url("../img/youtube_icon.png");
}
.github {
  background-image: url("../img/github_icon.png");
}
.reddit:hover {
  background-image: url("../img/reddit_icon_hover.png");
}
.youtube:hover {
  background-image: url("../img/youtube_icon_hover.png");
}
.github:hover {
  background-image: url("../img/github_icon_hover.png");
}
.copyright {
  padding: 0.3em 1em;
  background-color: #16171b;
}
.copyright p {
  color: #a7a7a7;
  font-size: 0.9em;
  text-align: center;
  margin-top: 15px;
}
@media screen and (max-width: 850px) {
  .sor.fo {
    grid-template-columns: 1fr;
  }
}
</style>