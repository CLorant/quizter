<template>
  <div id="tartalom">
    <div id="cim">
      <img src="/img/ikon/quizterlogo.webp" alt="Quizter Logó" decoding="async" id="cim-logo" width="600" height="150">
      <h2>Adatvédelmi Nyilatkozat</h2>
    </div>
    <div class="p-2">
      <ul>
        <li>Ez az adatvédelmi nyilatkozat az <b>Ön, mint felhasználó, személyes adatait tartalmazza</b>, amelyeket az oldalunk használata során gyűjtünk és kezelünk.</li>
        <li>A weboldalunkon történő regisztráció során az Ön <b>felhasználónevét, e-mail címét és jelszavát kérjük.</b> Ezen adatokat <b>kizárólag az Ön azonosítására</b> és a felhasználói fiókjának kezelésére használjuk, illetve a jogi kötelezettségek teljesítése érdekében tároljuk.</li>
        <li>Az Ön adatait bizalmasan kezeljük, és <b>semmilyen körülmények között nem adjuk ki harmadik félnek</b>, kivéve, ha jogszabályi előírások ezt kötelezővé teszik, vagy az Ön előzetes hozzájárulása alapján.</li>
        <li>Az oldalunk az <b>autentikációhoz használ egy sütit (cookie-t)</b>, amely egy kis szöveges fájl a felhasználó böngészőjében, és ebben az esetben <b>csakis a felhasználó azonosítására szolgál</b> az oldalunkon történő látogatások során. Ez a süti <b>nem tartalmaz személyes adatot</b>. Viszont <b>ennek a tartalmát</b> semmilyen körülmények között <b>ne ossza meg mással, mivel ezzel veszélynek teszi ki a fiókját.</b></li>
        <li>Az oldalunkon használt adatbiztonsági intézkedéseknek köszönhetően az Ön <b>adatai az általánosan elfogadott biztonsági szabványoknak megfelelően kerülnek tárolásra és kezelésre</b>. Az Ön adataihoz csakis mi férünk hozzá, és csak a felhasználói fiók kezelésének vagy az oldalunk működtetésének céljából.</li>
        <li>Ha bármilyen kérdése vagy aggálya merül fel az adatvédelemmel kapcsolatban, kérjük, vegye fel velünk a kapcsolatot ezen az email címen: <b><a href="https://mail.google.com/mail/?view=cm&fs=1&to=quizterhelp@gmail.com" target="_blank" rel=”noreferrer” class="text-decoration-none">quizterhelp@gmail.com</a></b>.</li>
        <li>Az adatvédelmi nyilatkozatunkat időről időre módosíthatjuk, ezért javasoljuk, hogy <b>rendszeresen tájékozódjon az oldalunkon közzétett változtatásokról.</b></li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
#tartalom {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: auto;
  padding-bottom: 50px;
}

#cim {
  margin-top: 120px;
  margin-bottom: 120px;
  text-align: center;
}

#cim-logo {
  max-width: 90%;
  height: auto;
}

li {
  padding-bottom: 16pt;
  font-size: 14pt;
  line-height: 28pt;
  color: rgb(230, 230, 230);
}

b, a {
  color: white;
}

a:hover {
  opacity: 0.8;
}

@media screen and (max-width: 420px) {
  #cim h2 {
    font-size: 6vw;
  }

  li {
    font-size: 4.5vw;
    line-height: 8vw;
  }
}
</style>