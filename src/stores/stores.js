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

export const useFooldalStore = defineStore('fooldal', {
  state: () => ({
    tema: String,
    temaNev: String
  }),
  getters: {

  },
  actions: {

  }
});

export const useQuizBeallitoStore = defineStore('quizBeallito', {
  state: () => ({
    nehezseg: String,
    ido: String,
    kerdesekSzama: String,
    valaszokSzama: String
  }),
  getters: {

  },
  actions: {

  }
});

export const useJatekmenetStore = defineStore('jatekmenet', {
  state: () => ({
    korSzamlalo: Number,
    kerdes: String,
    kep: String,
    valasz1: String,
    valasz2: String,
    valasz3: String,
    valasz4: String,
    valasz5: String,
    valasz6: String,
    timeLeft: Number
  }),
  getters: {

  },
  actions: {

  }
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