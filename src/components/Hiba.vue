<template>
  <div class="text-center">
    <div id="cim">
      <img src="/img/ikon/quizterlogo.webp" alt="Quizter Logó" decoding="async" id="cim-logo" width="600" height="150">
      <h2>Hiba történt az oldal betöltésekor</h2>
    </div>
    <RouterLink to="/">
      <button id="visszaGomb">Vissza</button>
    </RouterLink>
  </div>
</template>

<style scoped>
#cim {
  margin-top: 120px;
  margin-bottom: 120px;
}

#cim-logo {
  max-width: 90%;
  height: auto;
}

#visszaGomb {
  font-weight: 500;
  border: none;
  border-radius: 12px;
  background-color: #4C4C4C;
  color: whitesmoke;
  font-size: 14pt;
  height: 60px;
  width: 160px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#visszaGomb:hover {
  opacity: 0.8;
}
</style>