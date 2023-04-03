import { defineStore } from 'pinia'

// A QuizBeallito előtti beállítási adatok. A temaNev és temaMagyarazat a QuizBeallito-ban vannak beállítva.
export const useTemaStore = defineStore('tema', {
  state: () => ({
    tema: "default",
    temaNev: "",
    temaMagyarazat: ""
  }),
});