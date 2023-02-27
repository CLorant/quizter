import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: String,
    exp: Number,
    csatlakozas: Date,
    bio: Text,
    figyelmeztetett: Boolean,
    tiltott: Boolean
  }),
  getters: {

  },
  actions: {
    
  },
});

export const useStatisztikaStore = defineStore('statisztika', {
  state: () => ({
    helyezes: Number,
    jatszmaSzam: Number,
    valaszIdo: Number,
    tema1: String,
    tema2: String,
    tema3: String
  }),
  getters: {

  },
  actions: {

  }
});

export const useRekordStore = defineStore('rekord', {
  state: () => ({
    pontszam: Number,
    helyesHelytelen: String,
    tema: String,
    nehezseg: String,
    idoKerdesenkent: String,
    kerdesSzam: Number,
    valaszSzam: Number
  }),
  getters: {

  },
  actions: {

  }
});

export const useQuizBeallitoStore = defineStore('quizBeallito', {
  state: () => ({
    nehezseg: String,
    ido: Number,
    kerdesSzam: Number,
    valaszSzam: Number,
    kitoltott: false
  }),
});

export const useJatekmenetStore = defineStore('jatekmenet', {
  state: () => ({
    kor: 0,
    kerdes: {szoveg: String, kep: String},
    valaszok: {
      valasz1: {szoveg: String, helyes: Boolean},
      valasz2: {szoveg: String, helyes: Boolean},
      valasz3: {szoveg: String, helyes: Boolean},
      valasz4: {szoveg: String, helyes: Boolean},
      valasz5: {szoveg: String, helyes: Boolean},
      valasz6: {szoveg: String, helyes: Boolean}
    },
    maradtIdo: 0,
    valaszGombokKikapcsol: false,
    folytatasGombKikapcsol: true,
    leNyomottValaszGomb: false,
    pont: 0,
    helyesValasz: 0,
    helytelenValasz: 0,
    atlagosValaszIdo: 0
  })
});

export const useRanglistaStore = defineStore('ranglista', {
  state: () => ({
    helyezés: Number,
    name: String,
    username: String,
    pont: Number
  }),
  getters: {

  },
  actions: {

  }
});