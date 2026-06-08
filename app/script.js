// ========================
// FUNÇÕES PARA O CÁLCULO
// ========================

// Calcula energia necessária e ganho de rotação com base na latitude
function calcularEnergia(latitude) {
  latitude = parseFloat(latitude);

  const phi = latitude * (Math.PI / 180);
  const R_T = 6371000;
  const r_GEO = 42164000;
  const v_GEO = 3070;
  const omega = 7.2921159e-5;
  const mu = 3.986004418e14;
  const ganhoRotacao = omega * R_T * Math.cos(phi);
  const delta_vi = 2 * v_GEO * Math.sin(Math.abs(latitude) * (Math.PI / 180));

  const energia =
    (0.5 * 1000 * Math.pow(v_GEO - ganhoRotacao + delta_vi, 2) +
      ((1000 * mu) / 2) * (1 / R_T - 1 / r_GEO)) *
    Math.pow(10, -6);

  let eficiencia = "";

  if (ganhoRotacao > 420) {
    eficiencia = "Eficiência: Perfeita";
  } else if (ganhoRotacao > 350) {
    eficiencia = "Eficiência: Alta";
  } else if (ganhoRotacao > 200) {
    eficiencia = "Eficiência: Média";
  } else if (ganhoRotacao > 100) {
    eficiencia = "Eficiência: Baixa";
  } else {
    eficiencia = "Eficiência: Muito Baixa";
  }

  return [energia, ganhoRotacao, eficiencia];
}

// Compara a energia entre duas latitudes e retorna a economia
function compararLatitudes(lat1, lat2) {
  const energia1 = calcularEnergia(lat1)[0];
  const energia2 = calcularEnergia(lat2)[0];

  return Math.abs(energia1 - energia2);
}

// ========================
// GERADOR DO MAPA
// ========================

const saoPaulo = [-29.9672, -51.201884];
const coordsText = document.getElementById("coords");

const map = L.map("map").setView(saoPaulo, 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let marker = null;

// Captura clique no mapa e preenche latitude no input correspondente
map.on("click", (event) => {
  const { lat, lng } = event.latlng;
  const latFixed = lat.toFixed(6);
  const lngFixed = lng.toFixed(6);

  coordsText.textContent = `Latitude: ${latFixed} | Longitude: ${lngFixed}`;

  // Preenchimento Latitude base 1 & Latitude base 2 - Análise Comparativa
  const latitude = document.getElementById("latitude");
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

  // Atualiza ou cria o marcador no mapa
  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }

  marker.bindPopup(`Lat: ${latFixed}<br>Lng: ${lngFixed}`).openPopup();
});

// ========================
// TROCA DE MODO DE ANÁLISE
// ========================

const btnComp = document.getElementById("btnComp");
const btnInd = document.getElementById("btnInd");

// Ação ao trocar para Análise Comparativa
btnComp.addEventListener("click", () => {
  document.querySelectorAll(".dadosInd").forEach((e) => e.remove());
  document.querySelector(".dados").innerHTML =
    "<div class='analiseComp'><label for='base' class='dadosComp'>Nome Base 1</label> <input type='text' id='base' class='dadosComp'> <label for='latitude' class='dadosComp'>Latitude base 1</label> <input id='latitude' type='text' class='dadosComp'> <label for='base2' class='dadosComp'>Nome Base 2</label> <input type='text' id='base2' class='dadosComp'> <label for='lat2' class='dadosComp'>Latitude base 2</label> <input id='lat2' type='text' class='dadosComp'> <button class='dadosComp' id='botao'>Analisar lançamento</button>  <div id='erro' class='dadosComp'></div>";
  document.querySelector(".botaoComp").style.backgroundColor = "#1a1a1a";
  document.querySelector(".botaoInd").style.backgroundColor = "#9d8e8e";
});

// Ação ao trocar para Análise Individual
btnInd.addEventListener("click", () => {
  document.querySelectorAll(".dadosComp").forEach((e) => e.remove());
  document.querySelector(".dados").innerHTML =
    "<div class='analiseInd'><label for='base' class='dadosInd'>Nome da Base</label><input id='base' type='text' class='dadosInd' /><label for='latitude' class='dadosInd'>Latitude</label><input id='latitude' type='text' class='dadosInd' /><button id='botao' class='dadosInd'>Analisar Lançamento</button><div id='erro' class='dadosInd'></div>";
  document.querySelector(".botaoInd").style.backgroundColor = "#1a1a1a";
  document.querySelector(".botaoComp").style.backgroundColor = "#9d8e8e";
});

// ========================
// ANÁLISE DE LANÇAMENTO
// ========================

const btnAnalisar = document.getElementById("botao");
let latitude = document.getElementById("latitude");
const dados = document.querySelector(".dados");

// Evento ao clicar em "Analisar Lançamento" (via event delegation)
dados.addEventListener("click", (event) => {
  if (event.target.id === "botao") {
    latitude = document.getElementById("latitude").value;
    latitude = parseFloat(latitude);
    const base = document.getElementById("base").value;
    let erros = 0;

    // Validação de latitude base 1
    if (
      latitude < -90 ||
      latitude > 90 ||
      latitude === "" ||
      Number.isNaN(latitude)
    ) {
      document.getElementById("latitude").value = "";
      document.querySelector("#erro").innerHTML =
        "<p>Latitude Base 1 inválida </p>";
      document.querySelector("#erro").classList.add("erro");
      document.getElementById("latitude").classList.add("erroCaixa");
      erros = erros + 1;
    } else if (document.querySelector("#lat2")) {
      // Validação de latitude base 2 (modo comparativo)
      const latitude2 = document.getElementById("lat2").value;
      if (
        latitude2 < -90 ||
        latitude2 > 90 ||
        latitude2 === "" ||
        Number.isNaN(latitude2)
      ) {
        document.getElementById("lat2").value = "";
        document.querySelector("#erro").innerHTML =
          "<p>Latitude Base 2 inválida </p>";
        document.querySelector("#erro").classList.add("erro");
        document.getElementById("lat2").classList.add("erroCaixa");
        erros = erros + 1;
      }
    }

    // Validação do nome da base 1
    if (base.length === 0 || base.length < 2) {
      document.getElementById("base").classList.add("erroCaixa");
      document.querySelector("#erro").innerHTML =
        "<p>Digite na base 1 um nome válido </p>";
      document.querySelector("#erro").classList.add("erro");
      erros = erros + 1;
    } else if (document.querySelector("#lat2")) {
      // Validação do nome da base 2 (modo comparativo)
      const base2 = document.getElementById("base2").value;
      if (base2.length === 0 || base2.length < 2) {
        document.getElementById("base2").classList.add("erroCaixa");
        document.querySelector("#erro").innerHTML =
          "<p>Digite na base 2 um nome válido </p>";
        document.querySelector("#erro").classList.add("erro");
        erros = erros + 1;
      }
    }

    if (erros == 0) {
      // ========================
      // RESULTADO - COMPARATIVO
      // ========================
      if (document.querySelector("#lat2")) {
        const latitude2 = document.getElementById("lat2").value;
        const base2 = document.getElementById("base2").value;
        const economia = compararLatitudes(latitude, latitude2);
        const [energia1, ganhoRotacao1, eficiencia1] =
          calcularEnergia(latitude);
        const [energia2, ganhoRotacao2, eficiencia2] =
          calcularEnergia(latitude2);

        document.querySelectorAll(".dadosComp").forEach((e) => e.remove());
        document.querySelector(".btsTroca").remove();
        document.querySelector(".dados").innerHTML =
          `<div> <h2>Resultado</h2><div class='resultComp'><div class='base1 fundoResult'><div><p class='fonte'>BASE 1</p><p id='base' class='base'>${base}</p> <p id='latitude' class='fonte'>Latitude: ${latitude}</p></div><div><p class='fonte'>Energia estimada</p><p class='energia'>${energia1.toFixed(2)} MJ/t</p> <p class='fonte'>Ganho de rotação</p> <p>${ganhoRotacao1.toFixed(2)} m/s</p></div><p class='ef1'>${eficiencia1}</p></div>
          <div class='base2 fundoResult'><div><p class='fonte'>BASE 2</p><p id='base2' class='base'>${base2} </p> <p id='latitude2' class='fonte'>Latitude:${latitude2} </p></div><div><p class='fonte'>Energia estimada</p><p class='energia'>${energia2.toFixed(2)} MJ/t</p> <p class='fonte'>Ganho de rotação</p> <p>${ganhoRotacao2.toFixed(2)} m/s</p></div><p class='ef2'>${eficiencia2}</p></div></div> <button id='btnReset'>Nova análise</button>`;

        // Cor da eficiência - base 1
        if (eficiencia1 === "Eficiência: Perfeita") {
          document.querySelector(".ef1").style.backgroundColor = "#1e3a5f";
        } else if (eficiencia1 === "Eficiência: Alta") {
          document.querySelector(".ef1").style.backgroundColor = "#166534";
        } else if (eficiencia1 === "Eficiência: Média") {
          document.querySelector(".ef1").style.backgroundColor = "#713f12";
        } else if (eficiencia1 === "Eficiência: Baixa") {
          document.querySelector(".ef1").style.backgroundColor = "#7c2d12";
        } else if (eficiencia1 === "Eficiência: Muito Baixa") {
          document.querySelector(".ef1").style.backgroundColor = "#450a0a";
        }

        // Cor da eficiência - base 2
        if (eficiencia2 === "Eficiência: Perfeita") {
          document.querySelector(".ef2").style.backgroundColor = "#1e3a5f";
        } else if (eficiencia2 === "Eficiência: Alta") {
          document.querySelector(".ef2").style.backgroundColor = "#166534";
        } else if (eficiencia2 === "Eficiência: Média") {
          document.querySelector(".ef2").style.backgroundColor = "#713f12";
        } else if (eficiencia2 === "Eficiência: Baixa") {
          document.querySelector(".ef2").style.backgroundColor = "#7c2d12";
        } else if (eficiencia2 === "Eficiência: Muito Baixa") {
          document.querySelector(".ef2").style.backgroundColor = "#450a0a";
        }

        btnReset.addEventListener("click", () => {
          location.reload();
        });

        // ========================
        // RESULTADO - INDIVIDUAL
        // ========================
      } else {
        const [energia, ganhoRotacao, eficiencia] = calcularEnergia(latitude);
        document.querySelectorAll(".dadosInd").forEach((e) => e.remove());
        document.querySelector(".btsTroca").remove();
        document.querySelector(".dados").innerHTML =
          `<div class='resultInd'><div class ='conteudo'><div><h2>Resultado</h2>  <p id='base'>Base: ${base}</p> <p id='latitude'>Latitude: ${latitude}</p></div><div><h2>Energia estimada</h2><p id='energia' class='energia'>${energia.toFixed(2)} MJ/t</p></div><div><p>Ganho rotação</p> <p id='rotacao'>${ganhoRotacao.toFixed(2)} m/s</p></div> <p class='ef'>${eficiencia}</p></div><div class='btnNvAnalise'><button id='btnReset'>Nova análise</button></div>`;

        // Cor da eficiência - análise individual
        if (eficiencia === "Eficiência: Perfeita") {
          document.querySelector(".ef").style.backgroundColor = "#1e3a5f";
        } else if (eficiencia === "Eficiência: Alta") {
          document.querySelector(".ef").style.backgroundColor = "#166534";
        } else if (eficiencia === "Eficiência: Média") {
          document.querySelector(".ef").style.backgroundColor = "#713f12";
        } else if (eficiencia === "Eficiência: Baixa") {
          document.querySelector(".ef").style.backgroundColor = "#7c2d12";
        } else if (eficiencia === "Eficiência: Muito Baixa") {
          document.querySelector(".ef").style.backgroundColor = "#450a0a";
        }

        btnReset.addEventListener("click", () => {
          location.reload();
        });
      }
    }
  }
});
