<template>
  <footer class="pt-4">
    <div class="mx-4">
      <div class="row">
        <div class="col-md-3 col-sm-12 text-center text-md-start my-3">
          <RouterLink to="/">
            <img src="/img/ikon/quizterlogo.webp" alt="Logo" decoding="async" id="logo">
          </RouterLink>
        </div>
        <div id="oldalak" class="col-md-6 col-sm-12 d-flex flex-wrap justify-content-center">
          <RouterLink to="/rolunk" class="text-decoration-none text-light m-3">
            Rólunk
          </RouterLink>
          <RouterLink to="/sutik" class="text-decoration-none text-light m-3">
            Sütik
          </RouterLink>
        </div>
        <div class="col-md-3 col-sm-12 text-center text-md-end">
          <a href="https://github.com/CLorant/quizter" target="_blank" rel="noreferrer"><img
              src="/img/ikon/github_icon.webp" alt="Github Ikon" decoding="async" class="kozossegi-gomb m-2"></a>
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

<style scoped>
footer {
  background-color: #0b0c0e;
}

#logo {
  height: 39px;
  width: 150px;
}

.kozossegi-gomb {
  height: 30px;
  width: 30px;
}

.kozossegi-gomb:hover,
#logo:hover,
a:hover {
  opacity: 0.8;
}

#copyright {
  color: rgb(160, 160, 160);
}</style>