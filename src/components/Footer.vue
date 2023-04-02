<template>
  <footer class="pt-4">
    <div class="mx-4">
      <div class="row">
        <div class="col-md-3 col-sm-12 text-center text-md-start my-3">
          <RouterLink to="/">
            <img src="/img/ikon/quizterlogo_kicsi.webp" alt="Logo" decoding="async" id="logo" width="151" height="38">
          </RouterLink>
        </div>
        <div id="oldalak" class="col-md-6 col-sm-12 d-flex flex-wrap justify-content-center">
          <RouterLink to="/rolunk" class="text-decoration-none text-light m-3">
            Rólunk
          </RouterLink>
          <RouterLink to="/sutik" class="text-decoration-none text-light m-3">
            Sütik
          </RouterLink>
          <RouterLink v-if="felhasznalo.jogosultsag === 'admin'" to="/kerdesek" class="text-decoration-none text-light m-3">
            Kérdések
          </RouterLink>
          <RouterLink v-if="felhasznalo.jogosultsag === 'admin'" to="/uj-kerdes" class="text-decoration-none text-light m-3">
            Új Kérdés
          </RouterLink>
        </div>
        <div class="col-md-3 col-sm-12 text-center text-md-end">
          <a href="https://github.com/CLorant/quizter" target="_blank" rel="noreferrer">
            <img src="/img/ikon/github_icon.webp" alt="Github Ikon" decoding="async" class="m-2" width="30" height="30">
          </a>
          <div class="mt-3">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=quizterhelp@gmail.com" target="_blank" rel=”noreferrer”
              class="text-decoration-none text-light">quizterhelp@gmail.com</a>
          </div>
        </div>
        <hr class="text-light my-4 d-md-none">
        <div class="col-sm-12 text-center">
          <p id="copyright">&copy; 2023 Quizter</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useFelhasznaloStore } from '../stores/felhasznalo';

export default {
  computed: {
    ...mapWritableState(useFelhasznaloStore, ['felhasznalo'])
  }
}
</script>

<style scoped>
footer {
  background-color: #0b0c0e;
}

.kozossegi-gomb:hover,
#logo:hover,
a:hover {
  opacity: 0.8;
}

#copyright {
  color: rgb(160, 160, 160);
}</style>