import { defineStore } from 'pinia'

// minden másik profil
// oldalak: Profil.vue ( olvasás ) - Ranglista.vue ( olvasás )
export const useProfilStore = defineStore('profil', {
  state: () => ({
    profil: {
      username: "nem-meghatarozott-felhasznalo",
      name: String,
      kep: "/img/ikon/default-user.webp",
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