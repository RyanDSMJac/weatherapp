async function searchWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Campo vazio, insire uma cidade");
    return;
  }

  try {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById("result").innerHTML = `<p>${data.error}</p>`;
      return;
    }

    document.getElementById("result").innerHTML = `
      <h2>${data.city}, ${data.country}</h2>
      <img src="${data.icon}" />
      <p>Temperatura: ${data.temperature}°C</p>
      <p>Sensação térmica: ${data.feels_like}°C</p>
      <p>Umidade do ar: ${data.humidity}%</p>
      <p>Estado das nuvens: ${data.description}</p>
    `;
  } catch (error) {
    document.getElementById("result").innerHTML = `<p>Erro ao buscar dados</p>`;
  }
}

const cityInput = document.getElementById("city");

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchWeather();
  }
});

window.onload = () => {
  cityInput.value = "";
  cityInput.focus();
};