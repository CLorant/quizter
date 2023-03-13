<script>
  export default {
    props: {
      tema: String,
      temaNev: String
    }
  }
</script>

<template>
  <RouterLink :to="{name: 'quizbeallito', params: {temaId: tema}}" >
    <button class='temaGomb' :style="`background-image: url(/img/tema/${tema}.webp)`">{{ temaNev }}</button>
  </RouterLink>
</template>

<style>
  .temaGomb{
    color: white;
    font-size: 29pt;
    font-weight: bold;
    border: none;
    height: 120px;
    width: 95%;
    max-width: 360px;
    border-radius: 25px;
    margin: 25px;
    background-size:cover;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  @media screen and (max-width: 820px){
    .temaGomb{
      font-size: 6vw;
      width: 45%;
      background-position: center;
      margin: 5px;
    }
  }
</style>