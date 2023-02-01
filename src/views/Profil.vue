<script>
export default {
  
}
</script>

<template>
<div id="tartalom">
  <div class="root">
    <div class="subroot">
      <div class="container">
        <img id="profil-kep">
          <div id="profil-tarolo" style="padding-top: 10px;">
            <h2>Lucas Smith</h2>
            <h3>@LukeAFK</h3>
            <div id="szint-tarolo" style="max-width: 200px; width: 100%; height: 30px; margin-bottom: 15px;">
              <div class="d-flex justify-content-center">
                <span id="szint" style="font-size: 18pt;">1.&nbsp;szint</span>
              </div>
            <div id="szint-haladas" style="height: 30px;"></div>
          </div>
          <p>Csatlakozott: <a id="csatlakozas">2022.&nbsp;09.&nbsp;24.</a></p>
        </div>
      </div>
    </div>
  </div>
  <div id="bio-tarolo">
      <h3>Rólam</h3>
      <p id="bio">Bázisolt gigacsanád betörő vagyok</p>
  </div>
  <div id="rekord-tema-tarolo">
    <div id="rekord-tarolo">
      <div class="rekord-tablazat">
        <h3>Statisztika</h3><br>
        <p>Helyezés: <span id="helyezes">1.</span></p>
        <p>Játszmák: <span id="jatszmak">459</span></p>
        <p>Átlagos válaszidő: <span id="valaszido">3,56 mp</span></p>
      </div>
      <div class="rekord-tablazat">
        <h3>Személyes Rekord</h3><br>
        <p>Pontszám: <span id="pontszam">42069</span> pont</p>
        <p>Téma: <span id="tema">Földrajz</span></p>
        <p>Nehézség: <span id="nehezseg">Nehéz</span></p>
        <p>Idő kérdésenként: <span id="ido">10</span> mp</p>
        <p>Kérdésszám: <span id="kerdes-szam">20</span></p>
        <p>Válaszszám: <span id="valasz-szam">6</span></p>
      </div>
    </div>
    <div id="tema-tarolo" >
      <h3>Legjátszottabb témakörei</h3>
      <div id="temaGomb-tarolo">
        <div class="temaGomb" id="autok">Autók</div>
        <div class="temaGomb" id="biologia">Biológia</div>
        <div class="temaGomb" id="fizika">Fizika</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>