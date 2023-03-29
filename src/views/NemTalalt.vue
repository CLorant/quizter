<template>
  <div id="tartalom">
    <img src="/img/ikon/quizterlogo.webp" alt="Quizter Logó" decoding="async" id="cim-logo" />
    <h2>A keresett oldal nem található</h2>
    <RouterLink to="/">
      <button id="visszaGomb">Vissza</button>
    </RouterLink>
  </div>
</template>

<style scoped>
#tartalom {
  color: whitesmoke;
  text-align: center;
  margin-top: 120px;
}

#cim-logo {
  height: 90%;
  width: 90%;
  max-width: 600px;
  margin-bottom: 25px;
}

#visszaGomb {
  margin-top: 80px;
  margin-bottom: 80px;
  font-weight: 500;
  border: none;
  border-radius: 12px;
  background-color: #4C4C4C;
  color: whitesmoke;
  font-size: 14pt;
  height: 60px;
  width: 160px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#visszaGomb:hover {
  opacity: 0.8;
}</style>