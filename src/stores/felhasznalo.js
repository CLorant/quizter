import { defineStore } from 'pinia';

// A bejelentkezett felhasználó adatai.
export const useFelhasznaloStore = defineStore('felhasznalo', {
  state: () => ({
    felhasznalo: {
      felhasznalonev: "nem-meghatarozott",
      csatlakozas: Date,
      jogosultsag: "",
      jellemzok: {
        kep: "/img/ikon/default-user.webp",
        nev: "Quizter Felhasználó",
        bio: "",
        tema1: "autok",
        tema2: "biologia",
        tema3: "fizika"
      },
      statisztika: {
        exp: 0,
        jatszmaSzam: 0,
        valaszIdo: 0,
      },
      rekord: {
        pontszam: 0,
        helyesHelytelen: "0 / 0",
        tema: "autok",
        nehezseg: "konnyu",
        ido: 0,
        kerdesSzam: 0,
        valaszSzam: 0
      },
      bejelentkezett: false
    }
  })
});