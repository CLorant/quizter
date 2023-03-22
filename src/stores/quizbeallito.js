import { defineStore } from 'pinia'

// oldal: QuizBeallito.vue ( írás, olvasás )
export const useQuizBeallitoStore = defineStore('quizBeallito', {
  state: () => ({
    nehezseg: "",
    ido: 0,
    kerdesSzam: 0,
    valaszSzam: 0
  }),
});