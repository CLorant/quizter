import { defineStore } from 'pinia'

// a bejelentkezett felhasználó
// oldalak: Profil.vue ( írás, olvasás ) - Ranglista.vue ( olvasás ) - Nav.vue ( olvasás ) - Jatekmenet.vue ( írás )
export const useFelhasznaloStore = defineStore('felhasznalo', {
  state: () => ({
    felhasznalo: {
      felhasznaloNev: "nem-meghatarozott-felhasznalo",
      csatlakozas: Date,
      jogosultsag: "user",
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