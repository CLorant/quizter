<script>
export default {
  props: {
    tema: String,
    temaNev: String
  }
}
</script>

<template>
  <RouterLink :to="{ name: 'quizbeallito', params: { temaId: tema } }" class="temaGomb">
    <img :src="`/img/tema/kicsi/${tema}.webp`" :alt="{ tema } + ' képe'" decoding="async" class="temaImg" />
    <span class="temaNev">{{ temaNev }}</span>
  </RouterLink>
</template>

<style>
.temaGomb {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 120px;
  width: 360px;
  margin: 16pt;
}

.temaImg {
  height: 100%;
  width: 100%;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.temaNev {
  color: white;
  font-size: 29pt;
  font-weight: bold;
  position: absolute;
  z-index: 1;
}

@media screen and (max-width: 820px) {
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