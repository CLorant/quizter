<template>
  <div class="text-center pt-5 mt-5">
    <h3 class="pt-5 m-5">Hiba történt az oldal betöltésekor</h3>
    <RouterLink to="/">
      <button id="visszaGomb">Vissza</button>
    </RouterLink>
  </div>
</template>

<style scoped>
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
</style>