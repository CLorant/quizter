import { defineStore } from 'pinia';

// A kérdés adatai, csakis a Kerdes oldalon használt
export const useKerdesStore = defineStore('kerdes', {
  state: () => ({
    tema: "autok",
    nehezseg: "konnyu",
    kerdes: { szoveg: "Nem meghatározott kérdés", kep: "/img/ikon/quizterlogo.svg" },
    valaszok: {
      valasz1: { szoveg: "Válasz 1" },
      valasz2: { szoveg: "Válasz 2" },
      valasz3: { szoveg: "Válasz 3" },
      valasz4: { szoveg: "Válasz 4" },
      valasz5: { szoveg: "Válasz 5" },
      valasz6: { szoveg: "Válasz 6" }
    }
  })
});