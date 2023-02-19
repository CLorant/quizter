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
    nehezseg: "konnyu",
    ido: 30,
    kerdesSzam: 10,
    valaszSzam: 2
  }),
});

export const useJatekmenetStore = defineStore('jatekmenet', {
  state: () => ({
    korSzamlalo: 0,
    kerdes: String,
    kep: String,
    valasz1: String,
    valasz2: String,
    valasz3: String,
    valasz4: String,
    valasz5: String,
    valasz6: String,
    maradtIdo: 0,
    valaszGombokAktiv: true,
    folytatasGombAktiv: false,
    pont: 0,
    helyesValasz: 0,
    helytelenValasz: 0,
    atlagosValaszIdo: 0
  }),
  getters: {
    kovetkezoKor: (state) => state.korSzamlalo++
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