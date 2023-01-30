<template>
<footer>
  <div class="sor fo">
    <div class="oszlop rolunk-footer">
      <div class="logo-tarolo"><a href="index" class="logo"></a></div>
      <p>
        A Quizter egy magyar és angol nyelvű kvízes weboldal, ahol 11
        különböző témában érhetőek el kvízek. A fejlesztése 2022-ben
        kezdődött.
      </p>
      <div class="kozossegi">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          class="kozossegi-gomb facebook"
        ></a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          class="kozossegi-gomb youtube"
        ></a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          class="kozossegi-gomb twitter"
        ></a>
        <a
          href="https://www.reddit.com/"
          target="_blank"
          class="kozossegi-gomb reddit"
        ></a>
      </div>
    </div>
    <div class="oszlop linkek-footer">
      <h3>Oldalak</h3>
      <ul>
        <li><a href="index">Főoldal</a></li>
        <li><a href="rolunk">Rólunk</a></li>
        <li><a href="profil">Profil</a></li>
        <li><a href="ranglista">Ranglista</a></li>
      </ul>
    </div>
    <div class="oszlop linkek-footer">
      <h3>Egyéb</h3>
      <ul>
        <li><a href="#faq">GYIK</a></li>
        <li><a href="#terms-of-services">ÁSZF</a></li>
        <li><a href="#cookies-policy">Süti tájékoztató</a></li>
        <li>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=quizterhelp@gmail.com"
            target="_blank"
            >Email</a
          >
        </li>
      </ul>
    </div>
    <div class="oszlop feliratkozas-footer">
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
  </div>
  <div class="sor copyright">
    <p class="copyright-szoveg">Copyright &copy; 2023 Quizter</p>
  </div>
  <!--<script src="js/hirlevel.js"></script>-->
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
  grid-template-columns: 2fr 1fr 1fr 2fr;
  align-items: stretch;
  margin-bottom: 10px;
}

.oszlop {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  padding: 0 2em;
}

.linkek-footer h3 {
  width: 100%;
  text-align: left;
  color: white;
  font-size: 1.4em;
  white-space: nowrap;
}

.linkek-footer ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.linkek-footer li:not(:first-child) {
  margin-top: 0.8em;
}

.linkek-footer ul li a {
  color: #a7a7a7;
  text-decoration: none;
}

.linkek-footer ul li a:hover {
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

div.kozossegi {
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

.facebook {
  background-image: url("../img/facebook_icon.png");
}

.reddit {
  background-image: url("../img/reddit_icon.png");
}

.twitter {
  background-image: url("../img/twitter_icon.png");
}

.youtube {
  background-image: url("../img/youtube_icon.png");
}

.facebook:hover {
  background-image: url("../img/facebook_icon_hover.png");
}

.reddit:hover {
  background-image: url("../img/reddit_icon_hover.png");
}

.twitter:hover {
  background-image: url("../img/twitter_icon_hover.png");
}

.youtube:hover {
  background-image: url("../img/youtube_icon_hover.png");
}

.copyright {
  padding: 0.3em 1em;
  background-color: #25262e;
}

.copyright p {
  color: #cfd2d6;
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