<template>
  <RouterLink :to="{ name: 'quizbeallito', params: { temaId: tema } }" class="temaGomb">
    <img :src="`/img/tema/kicsi/${tema}.webp`" :alt="{ tema } + ' képe'" decoding="async" class="temaImg" width="360" height="120">
    <span class="temaNev">{{ temaNev }}</span>
  </RouterLink>
</template>

<script>
export default {
  props: {
    tema: String,
    temaNev: String
  }
}
</script>

<style scoped>
.temaGomb {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 8pt;
}

.temaImg {
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.temaNev {
  color: whitesmoke;
  font-size: 29pt;
  font-weight: bold;
  position: absolute;
  z-index: 1;
}

@media screen and (max-width: 780px) {
  .temaGomb {
    width: 45%;
    margin: 5px;
  }

  .temaImg {
    width: 100%;
    object-fit: cover;
  }

  .temaNev {
    font-size: 6vw;
  }
}
</style>