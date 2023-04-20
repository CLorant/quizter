const temaObj = {
  autok: "Autók",
  biologia: "Biológia",
  fizika: "Fizika",
  foldrajz: "Földrajz",
  irodalom: "Irodalom",
  kemia: "Kémia",
  sport: "Sport",
  szorakoztatas: "Szórakoztatás",
  technologia: "Technológia",
  tortenelem: "Történelem",
  zene: "Zene",
  vegyes: "Vegyes",
  default: "Téma"
};

const temaMagyarazatObj = {
  autok: "Kérdések autókról, gyártókról, a legelső autótól a legutóbbiig.",
  biologia: "Kérdések emberi és állati anatómiáról, biológiai egyenletekről, elméletekről, fontos személyekről.",
  fizika: "Kérdések fizikai egyenletekről, elméletekről, fontos személyekről.",
  foldrajz: "Kérdések országokról, városokról és azok politikájáról.",
  irodalom: "Kérdések irodalmi művekről, fontos személyekről.",
  kemia: "Kérdések kémiai egyenletekről, elméletekről, fontos személyekről.",
  sport: "Kérdések különböző sportágakról, azok szabályairól, eseményekről, fontos személyekről.",
  szorakoztatas: "Kérdések filmekről, sorozatokról, hírességekről.",
  technologia: "Kérdések a modern technológiáról, nagyrészt informatikáról.",
  tortenelem: "Kérdések történelmi eseményekről, fontos személyekről.",
  zene: "Kérdések zenészekről, együttesekről, a klasszikus zenétől a modern zenéig.",
  vegyes: "Kérdések az összes témából, véletlenszerűen.",
  default: "Nem meghatározott téma."
};

const nehezsegObj = {
  konnyu: "Könnyű",
  kozepes: "Közepes",
  nehez: "Nehéz",
  default: "Nehézség"
};

export function temaSzoveg(tema) {
  return temaObj[tema] || temaObj.default;
};

export function temaMagyarazatSzoveg(tema) {
  return temaMagyarazatObj[tema] || temaMagyarazatObj.default;
};

export function nehezsegSzoveg(nehezseg) {
  return nehezsegObj[nehezseg] || nehezsegObj.default;
};