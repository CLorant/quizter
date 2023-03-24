import { defineStore } from 'pinia'

// oldal: Kerdesek.vue ( írás, olvasás ) - Kerdes.vue ( írás, olvasás )
export const useKerdesStore = defineStore('kerdes', {
  state: () => ({
    tema: 'nem-meghatarozott',
    nehezseg: '',
    kerdes: { szoveg: String, kep: String },
    valaszok: {
      valasz1: { szoveg: String },
      valasz2: { szoveg: String },
      valasz3: { szoveg: String },
      valasz4: { szoveg: String },
      valasz5: { szoveg: String },
      valasz6: { szoveg: String }
    }
  })
});