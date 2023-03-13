import { defineStore } from 'pinia'

// a bejelentkezett felhasználó
// oldalak: Profil.vue ( írás, olvasás ) - Ranglista.vue ( olvasás ) - Nav.vue ( olvasás ) - Jatekmenet.vue ( írás )
export const useFelhasznaloStore = defineStore('felhasznalo', {
  state: () => ({
    felhasznalo: {
      username: "nem-meghatarozott-felhasznalo",
      name: String,
      kep: String,
      exp: Number,
      csatlakozas: Date,
      bio: Text,
      jatszmaSzam: Number,
      valaszIdo: Number,
      tema1: String,
      tema2: String,
      tema3: String,
      tiltott: Boolean,
      rekord: {
        pontszam: Number,
        helyesHelytelen: String,
        tema: String,
        nehezseg: String,
        ido: String,
        kerdesSzam: Number,
        valaszSzam: Number
      }
    }
  })
});