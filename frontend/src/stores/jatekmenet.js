import { defineStore } from 'pinia';

// A játékmenet adatai.
// Körönként változik: kerdes, valaszok, maradtIdo, folytatasGombKikapcsol, leNyomottValaszGomb
// Körönként növekeszik: kor, pont, helyesValasz, helytelenValasz, atlagosValaszIdo
export const useJatekmenetStore = defineStore('jatekmenet', {
  state: () => ({
    kor: 0,
    kerdes: { szoveg: "Nem meghatározott kérdés", kep: "/img/ikon/quizterlogo.svg" },
    valaszok: {
      valasz1: { szoveg: "Válasz 1", helyes: false },
      valasz2: { szoveg: "Válasz 2", helyes: false },
      valasz3: { szoveg: "Válasz 3", helyes: false },
      valasz4: { szoveg: "Válasz 4", helyes: false },
      valasz5: { szoveg: "Válasz 5", helyes: false },
      valasz6: { szoveg: "Válasz 6", helyes: false }
    },
    maradtIdo: 0,
    folytatasGombKikapcsol: true,
    leNyomottValaszGomb: false,
    pont: 0,
    helyesValasz: 0,
    helytelenValasz: 0,
    atlagosValaszIdo: 0
  })
});