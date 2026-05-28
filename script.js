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
