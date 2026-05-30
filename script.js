// GERADOR DO MAPA
const saoPaulo = [-29.9672, -51.201884];
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

  //Preenchimento Latitude base 1 & Latitude base 2 - Analíse Comparativa
  latitude = document.getElementById("latitude"); //Definido a constante para poder ser utilizada no evento exclusivo do analíse comparativa
  if (latitude.classList.contains("dadosComp")) {
    let latitude2 = document.getElementById("lat2").value;
    if (latitude.value === "") {
      document.getElementById("latitude").value = latFixed;
    } else {
      document.getElementById("lat2").value = latFixed;
    }
  } else {
    // Preenche o input de latitude ao clicar no mapa
    document.getElementById("latitude").value = latFixed;
  }

  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }

  marker.bindPopup(`Lat: ${latFixed}<br>Lng: ${lngFixed}`).openPopup();
});

// Lógica de validação Latitude

// Case #2 da história, matéria UX
// Análise comparativa
const btnComp = document.getElementById("btnComp");
const btnInd = document.getElementById("btnInd");

//Ação ao trocar para Análise Comparativa
btnComp.addEventListener("click", () => {
  document.querySelectorAll(".dadosInd").forEach((e) => e.remove());
  document.querySelector(".dados").innerHTML =
    "<label id='base1' class='dadosComp'>Nome Base 1</label> <input type='text' class='dadosComp'> <label class='dadosComp'>Latitude base 1</label> <input id='latitude' type='text' class='dadosComp'> <label id='base2' class='dadosComp'>Nome Base 2</label> <input type='text' class='dadosComp'> <label class='dadosComp'>Latitude base 2</label> <input id='lat2' type='text' class='dadosComp'> <button class='dadosComp' id='botao'>Analisar lançamento</button> <div id='erro' class='dadosComp'></div>";
});
//Ação ao trocar para Análise Indivudal
btnInd.addEventListener("click", () => {
  document.querySelectorAll(".dadosComp").forEach((e) => e.remove());
  document.querySelector(".dados").innerHTML =
    "<label for='base' class='dadosInd'>Nome da Base</label><input id='base' type='text' class='dadosInd' /><label for='latitude' class='dadosInd'>Latitude</label><input id='latitude' type='text' class='dadosInd' /><button id='botao' class='dadosInd'>Analisar Lançamento</button><div id='erro' class='dadosInd'></div>";
});

const btnAnalisar = document.getElementById("botao");
let latitude = document.getElementById("latitude");
const dados = document.querySelector(".dados");

// Evento ao Clicar em Análise de lançamento
dados.addEventListener("click", () => {
  if (event.target.id === "botao") {
    latitude = document.getElementById("latitude").value;
    latitude = parseFloat(latitude);

    if (latitude < -90 || latitude > 90) {
      document.getElementById("latitude").value = "";
      document.querySelector("#erro").innerHTML = "<p>Latitude inválida </p>";
      document.querySelector("#erro").classList.add("erro");
      document.getElementById("latitude").classList.add("erroCaixa");
    }

    // Contiunar daqui, ultimo commit 29/05 - 23:00
    // Falta a lógica do erro aparecer na longitude base 2 da análise comparativa.
  }
});
