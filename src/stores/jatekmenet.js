import { defineStore } from 'pinia'

// oldal: Jatekmenet.vue ( írás, olvasás )
export const useJatekmenetStore = defineStore('jatekmenet', {
  state: () => ({
    kor: 0,
    kerdes: { szoveg: String, kep: String },
    valaszok: {
      valasz1: { szoveg: String, helyes: Boolean },
      valasz2: { szoveg: String, helyes: Boolean },
      valasz3: { szoveg: String, helyes: Boolean },
      valasz4: { szoveg: String, helyes: Boolean },
      valasz5: { szoveg: String, helyes: Boolean },
      valasz6: { szoveg: String, helyes: Boolean }
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