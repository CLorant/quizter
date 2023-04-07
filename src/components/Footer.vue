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
          <RouterLink to="/adatvedelem" class="text-decoration-none text-light m-3">
            Adatvédelem
          </RouterLink>
          <RouterLink v-if="felhasznalo.jogosultsag === 'admin'" to="/kerdesek" class="text-decoration-none text-light m-3">
            Kérdések
          </RouterLink>
          <RouterLink v-if="felhasznalo.jogosultsag === 'admin'" to="/uj-kerdes" class="text-decoration-none text-light m-3">
            Új Kérdés
          </RouterLink>
        </div>
        <div class="col-md-3 col-sm-12 text-center text-md-end">
          <a href="https://github.com/CLorant/quizter" target="_blank" rel="noreferrer" aria-label="Github Oldal">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="text-light m-2" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
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
import { mapWritableState } from 'pinia';
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
}
</style>