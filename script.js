// GERADOR DO MAPA
const saoPaulo = [-23.55052, -46.633308];
const coordsText = document.getElementById("coords");

const map = L.map("map").setView(saoPaulo, 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let marker = null;

map.on("click", (event) => {
  const { lat, lng } = event.latlng;
  const latFixed = lat.toFixed(6);
  const lngFixed = lng.toFixed(6);

  coordsText.textContent = `Latitude: ${latFixed} | Longitude: ${lngFixed}`;

  //Voltar apartir daqui commit 29/05/26!!
  
  //Preenchimento Latitude base 1 & Latitude base 2 - Analíse Comparativa
  latitude = document.getElementById("latitude"); //Definido a constante para poder ser utilizada no evento exclusivo do analíse comparativa
  if (latitude.classList.contains("dadosComp")) {
    console.log('oi1');
  }else{
    // Preenche o input de latitude ao clicar no mapa
  document.getElementById("latitude").value = latFixed;  
  console.log("oi2");
  }

  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }

  marker.bindPopup(`Lat: ${latFixed}<br>Lng: ${lngFixed}`).openPopup();
});

// Lógica de validação Latitude
const btnAnalisar = document.getElementById("botao");
let latitude = document.getElementById("latitude");

btnAnalisar.addEventListener("click", () => {
  latitude = document.getElementById("latitude").value;
  latitude = parseFloat(latitude);
  if (latitude < -90 || latitude > 90) {
    document.getElementById("latitude").value = "";

    document.querySelector("#erro").innerHTML = "<p>Latitude inválida </p>";
    document.querySelector("#erro").classList.add("erro");
    document.getElementById("latitude").classList.add("erroCaixa");
  }
});

// Case #2 da história, matéria UX
// Análise comparativa
const btnComp = document.getElementById("btnComp");
const btnInd = document.getElementById("btnInd");

btnComp.addEventListener("click", () => {
  document.querySelectorAll(".dadosInd").forEach(e => e.remove());
  document.querySelector(".dados").innerHTML = "<label id='base1' class='dadosComp'>Nome Base 1</label> <input type='text' class='dadosComp'> <label class='dadosComp'>Latitude base 1</label> <input id='latitude' type='text' class='dadosComp'> <label id='base2' class='dadosComp'>Nome Base 2</label> <input type='text' class='dadosComp'> <label id='lat2' class='dadosComp'>Latitude base 2</label> <input type='text' class='dadosComp'> <button class='dadosComp'>Analisar lançamento</button>"
});

btnInd.addEventListener("click", () => {
  document.querySelectorAll(".dadosComp").forEach(e => e.remove());
  document.querySelector(".dados").innerHTML = "<label id='base' class='dadosInd'>Nome Base</label> <input type='text' class='dadosInd'> <label id='lat' class='dadosInd'>Latitude</label> <input id='latitude' type='text' class='dadosInd'> <button class='dadosInd'>Analisar lançamento</button>"
});