import { defineStore } from 'pinia'

// Minden másik profil adatai - csak 1
export const useProfilStore = defineStore('profil', {
  state: () => ({
    profil: {
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
      }
    }
  })
});