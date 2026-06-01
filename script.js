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
  const latitude = document.getElementById("latitude"); //Definido a constante para poder ser utilizada no evento exclusivo do analíse comparativa
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
    "<div class='analiseComp'><label for='base' class='dadosComp'>Nome Base 1</label> <input type='text' id='base' class='dadosComp'> <label for='latitude' class='dadosComp'>Latitude base 1</label> <input id='latitude' type='text' class='dadosComp'> <label for='base2' class='dadosComp'>Nome Base 2</label> <input type='text' id='base2' class='dadosComp'> <label for='lat2' class='dadosComp'>Latitude base 2</label> <input id='lat2' type='text' class='dadosComp'> <button class='dadosComp' id='botao'>Analisar lançamento</button>  <div id='erro' class='dadosComp'></div>";
});

//Ação ao trocar para Análise Indivudal
btnInd.addEventListener("click", () => {
  document.querySelectorAll(".dadosComp").forEach((e) => e.remove());
  document.querySelector(".dados").innerHTML =
    "<div class='analiseInd'><label for='base' class='dadosInd'>Nome da Base</label><input id='base' type='text' class='dadosInd' /><label for='latitude' class='dadosInd'>Latitude</label><input id='latitude' type='text' class='dadosInd' /><button id='botao' class='dadosInd'>Analisar Lançamento</button><div id='erro' class='dadosInd'></div>";
});

const btnAnalisar = document.getElementById("botao");
let latitude = document.getElementById("latitude");
const dados = document.querySelector(".dados");

// Evento ao Clicar em Análise de lançamento
dados.addEventListener("click", (event) => {
  if (event.target.id === "botao") {
    latitude = document.getElementById("latitude").value;
    latitude = parseFloat(latitude);
    const base = document.getElementById("base").value;
    let erros = 0;

    if (latitude < -90 || latitude > 90 || !latitude) {
      document.getElementById("latitude").value = "";
      document.querySelector("#erro").innerHTML =
        "<p>Latitude Base 1 inválida </p>";
      document.querySelector("#erro").classList.add("erro");
      document.getElementById("latitude").classList.add("erroCaixa");
      erros = erros + 1;
    } else if (document.querySelector("#lat2")) {
      const latitude2 = document.getElementById("lat2").value;
      if (latitude2 < -90 || latitude2 > 90 || !latitude2) {
        document.getElementById("lat2").value = "";
        document.querySelector("#erro").innerHTML =
          "<p>Latitude Base 2 inválida </p>";
        document.querySelector("#erro").classList.add("erro");
        document.getElementById("lat2").classList.add("erroCaixa");
        erros = erros + 1;
      }
    }
    if (base.length === 0 || base.length < 2) {
      document.getElementById("base").classList.add("erroCaixa");
      document.querySelector("#erro").innerHTML =
        "<p>Digite na base 1 um nome válido </p>";
      document.querySelector("#erro").classList.add("erro");
      erros = erros + 1;
    } else if (document.querySelector("#lat2")) {
      const base2 = document.getElementById("base2").value;
      if (base2.length === 0 || base2.length < 2) {
        document.getElementById("base2").classList.add("erroCaixa");
        document.querySelector("#erro").innerHTML =
          "<p>Digite na base 2 um nome válido </p>";
        document.querySelector("#erro").classList.add("erro");
        erros = erros + 1;
      }
    }

    function calcularEnergia(latitude) {
      const phi = latitude * (Math.PI / 180);

      const R_T = 6371000;
      const r_GEO = 42164000;
      const v_GEO = 3070;
      const omega = 7.2921159e-5;
      const mu = 3.986004418e14;

      const energia =
        0.5 * 1000 * Math.pow(v_GEO - omega * R_T * Math.cos(phi), 2) +
        ((1000 * mu) / 2) * (1 / R_T - 1 / r_GEO);

      const ganhoRotacao = omega * R_T * Math.cos(phi);

      let eficiencia = "";

      if (energia > 420) {
        eficiencia = "Eficiência: Perfeita";
      } else if (energia > 350) {
        eficiencia = "Eficiência: Alta";
      } else if (energia > 200) {
        eficiencia = "Eficiência: Média";
      } else if (energia > 100) {
        eficiencia = "Eficiência: Baixa";
      } else {
        eficiencia = "Eficiência: Muito Baixa";
      }

      return [energia, ganhoRotacao, eficiencia];
    }

    function compararLatitudes(lat1, lat2) {
      const e1 = calcularEnergia(lat1);
      const e2 = calcularEnergia(lat2);
      const economia = e1 - e2;

      return economia;
    }

    if (erros == 0) {
      if (document.querySelector("#lat2")) {
        const latitude2 = document.getElementById("lat2").value;
        const base2 = document.getElementById("base2").value;
        const economia = compararLatitudes(latitude, latitude2);
        const [energia1, ganhoRotacao1, eficiencia1] =
          calcularEnergia(latitude);
        const [energia2, ganhoRotacao2, eficiencia2] =
          calcularEnergia(latitude);

        document.querySelectorAll(".dadosComp").forEach((e) => e.remove());
        document.querySelector(".btnTroca").remove();
        document.querySelector(".dados").innerHTML =
          `<div> <h2>Resultado</h2><div class='resultComp'><div class='base1'><p>Base 1</p><p id='base'>Base: ${base}</p> <p id='latitude'>Latitude: ${latitude}</p><p>Energia estimada</p><p>${energia1.toFixed(2)} MJ/t</p> <p>Ganho de rotação</p> <p>${ganhoRotacao1.toFixed(2)} m/s</p><p>${eficiencia1}</p></div>
          <div class='base2'><p>Base 2</p><p id='base2'>Base: ${base2} </p> <p id='latitude2'>Latitude:${latitude2} </p><p>Energia estimada</p><p>${energia2.toFixed(2)} MJ/t</p> <p>Ganho de rotação</p> <p>${ganhoRotacao2.toFixed(2)} m/s</p><p>${eficiencia1}</p></div></div> <button id='btnReset'>Nova análise</button>`;
        console.log(ganhoRotacao2);
        btnReset.addEventListener("click", () => {
          location.reload();
        });
      } else {
        const [energia, ganhoRotacao, eficiencia] = calcularEnergia(latitude);
        document.querySelectorAll(".dadosInd").forEach((e) => e.remove());
        document.querySelector(".btnTroca").remove();
        document.querySelector(".dados").innerHTML =
          `<div class='resultInd'><h2>Resultado</h2> <p id='base'>${base}</p> <p id='latitude'>${latitude}</p><h2>Energia estimada</h2><p id='energia'>${energia.toFixed(2)} MJ/t</p><p>Ganho rotação</p> <p id='rotacao'>${ganhoRotacao.toFixed(2)} m/s</p> <p>${eficiencia}</p> <button id='btnReset'>Nova análise</button></div>`;
        btnReset.addEventListener("click", () => {
          location.reload();
        });
      }
    }
  }
});
