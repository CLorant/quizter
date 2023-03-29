<template>
  <div class="d-flex justify-content-center">
    <div class="spinner-border">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
  .spinner-border {
    font-size: 1.5rem;
    width: 3rem;
    height: 3rem;
    color: rgb(255, 200, 0);
  }
  .spinner-border::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    margin-left: -5px;
    margin-bottom: -10px;
    border-bottom: 10px solid rgb(255, 200, 0);
    transform: rotate(60deg);
  }
</style>