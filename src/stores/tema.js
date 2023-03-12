import { defineStore } from 'pinia'

// oldal: Fooldal.vue ( írás ) - QuizBeallito.vue ( olvasás ) - Jatekmenet.vue ( olvasás )
export const useTemaStore = defineStore('tema', {
  state: () => ({
    tema: "",
    temaNev: "",
    temaMagyarazat: ""
  }),
});