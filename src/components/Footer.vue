<template>
  <footer class="pt-4">
    <div class="mx-4">
      <div class="row">
        <div class="col-md-3 col-sm-12 text-center text-md-start my-3">
          <RouterLink to="/">
            <img src="../img/ikon/quizterlogo.png" alt="Logo" class="w-50">
          </RouterLink>
        </div>
        <div id="oldalak" class="col-md-6 col-sm-12 d-flex flex-wrap justify-content-center">
          <RouterLink to="/rolunk" class="text-decoration-none text-light m-3">
            Rólunk
          </RouterLink>
          <RouterLink to="/profil" class="text-decoration-none text-light m-3">
            Profil
          </RouterLink>
          <RouterLink to="/ranglista" class="text-decoration-none text-light m-3">
            Ranglista
          </RouterLink>
          <RouterLink to="/sutik" class="text-decoration-none text-light m-3">
            Sütik
          </RouterLink>
        </div>
        <div class="col-md-3 col-sm-12 text-center text-md-end">
          <a href="https://github.com/CLorant/quizter"><img src="../img/ikon/github_icon.png" target="_blank" rel=”noreferrer” alt="Github Ikon" class="kozossegi-gomb m-2"></a>
          <a href="https://www.reddit.com/r/quizter"><img src="../img/ikon/reddit_icon.png" target="_blank" rel=”noreferrer” alt="Reddit Ikon" class="kozossegi-gomb m-2"></a>
          <a href="https://www.youtube.com/@quiztersite"><img src="../img/ikon/youtube_icon.png" target="_blank" rel=”noreferrer” alt="Youtube Ikon" class="kozossegi-gomb m-2"></a>
          <div class="mt-3">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=quizterhelp@gmail.com" target="_blank" rel=”noreferrer” class="text-decoration-none text-light">quizterhelp@gmail.com</a>
          </div>
        </div>
        <hr class="bg-secondary my-4 d-md-none">
        <div class="col-sm-12 text-center">
          <p class="text-secondary">&copy; 2023 Quizter</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    background-color: #0b0c0e
  }
  #oldalak *{
    grid-template-columns: 1fr;
  }
  .kozossegi-gomb {
    height: 30px;
    width: 30px;
  }
  .kozossegi-gomb:hover, #logo:hover, a:hover{
    opacity: 0.8;
  }
</style>