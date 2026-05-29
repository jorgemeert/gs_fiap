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

  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }

  marker.bindPopup(`Lat: ${latFixed}<br>Lng: ${lngFixed}`).openPopup();
});

// Lógica de validação Latitude
const btnAnalisar = document.getElementById("botao");

btnAnalisar.addEventListener("click", () => {
  let latitude = document.getElementById("latitude").value;
  latitude = parseFloat(latitude);
  if (latitude < -90 || latitude > 90) {
    document.getElementById("latitude").value = "";

    document.querySelector("#erro").innerHTML = "<p>Latitude inválida </p>";
    document.querySelector("#erro").classList.add("erro");
    document.getElementById("latitude").classList.add("erroCaixa");
  }
});
