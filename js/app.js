
let isMuted = false;

// Función para hablar
function hablar(datos) {
    if (!isMuted) {
        const utterance = new SpeechSynthesisUtterance(datos);
        window.speechSynthesis.speak(utterance);
    }
}

// Función para mutear y desmutear
function toggleMute() {
    isMuted = !isMuted;
    document.getElementById('toggleMute').innerText = isMuted ? 'Desmutear' : 'Hablar';

    if (isMuted) {
        // Detener cualquier voz en reproducción
        window.speechSynthesis.cancel();
    }
}

// Asignar evento al botón
document.getElementById('toggleMute').addEventListener('click', function() {
    if (isMuted) {
        // Si está muteado, lo desmutea
        toggleMute();
    } else {
        // Si no está muteado, habla y cambia el texto
        hablar("Los datos del clima son: soleado, 25 grados.");
        toggleMute(); // Cambia a estado de muteo
    }
});

// ---------------------------------------------------------------------------

function buscarClima() {
  let zona = document.getElementById("zona").value.trim();
  let lat = document.getElementById("lat").value.trim();
  let lon = document.getElementById("lon").value.trim();

  let url = "";
  if (zona) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${zona}&appid=9e122cd782b2d0333f5fe4e7fa192062&units=metric&lang=es`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9e122cd782b2d0333f5fe4e7fa192062&units=metric&lang=es`;
  } else {
    alert(
      "Por favor, ingresa una ubicación o las coordenadas (latitud y longitud)."
    );
    return;
  }

  axios
    .get(url)
    .then(function (response) {
      console.log(response);
      console.log(response.data);
      // Verificar si hay error en la respuesta
      if (response.data.error) {
        document.getElementById("resultado").innerHTML =
          "No se encontró pronostico para estas coordenadas.";
      } else {
        // Extraer los datos del JSON
        const zona = response.data.name || "No disponible";
        const descripcion =
          response.data.weather[0].description || "No disponible";
        const temp = response.data.main.temp || "No disponible";
        const tempMin = response.data.main.temp_min || "No disponible";
        const tempMax = response.data.main.temp_max || "No disponible";
        const humedad = response.data.main.humidity || "No disponible";
        const viento = response.data.wind.speed || "No disponible";
        const icono = response.data.weather[0].icon;
        const texto =`La temperatura actual en ${zona} es de ${temp} grados, con una humedad del ${humedad} porciento y una velocidad del viento de ${viento} metros por segundo`;

        document.getElementById(
          "icono-clima"
        ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="icono clima">`;
        document.getElementById("zon").textContent = zona;
        document.getElementById("hume").textContent = humedad + "% Humedad";
        document.getElementById("viento").textContent = viento + " Viento m/s";
        document.getElementById("descripcion").textContent =
          descripcion.toUpperCase();
        document.getElementById("temperatura").textContent =
          temp.toFixed(1) + "°";
        document.getElementById("tempMin").textContent =
          tempMin.toFixed(1) + "° Min";
        document.getElementById("tempMax").textContent =
          tempMax.toFixed(1) + "° Max";

        hablar(texto);

        // document.getElementById("resultado").innerHTML = "HOY";
      }
    })
    .catch(function (error) {
      //console.log("Error al realizar la solicitud:", error);
      //document.getElementById("resultado").innerHTML = "La API no está disponible en este momento. Intenta más tarde.";
    });
}

// **************************************************************

// Obtener los elementos de los radio buttons y contenedores
const zonaRadio = document.querySelector('input[value="zona"]');
const coordenadasRadio = document.querySelector('input[value="coordenadas"]');
const zonaContainer = document.getElementById("zona-container");
const coordenadasContainer = document.getElementById("coordenadas-container");
const zonaInput = document.getElementById("zona");
const latInput = document.getElementById("lat");
const lonInput = document.getElementById("lon");

// Mostrar y ocultar campos según la opción seleccionada
function toggleFields() {
  if (zonaRadio.checked) {
    zonaContainer.style.display = "block";
    coordenadasContainer.style.display = "none";
    latInput.value = "";
    lonInput.value = "";
  } else if (coordenadasRadio.checked) {
    zonaContainer.style.display = "none";
    coordenadasContainer.style.display = "block";
    zonaInput.value = "";
  }
}

zonaRadio.addEventListener("change", toggleFields);
coordenadasRadio.addEventListener("change", toggleFields);

// Inicializar con la opción por defecto
toggleFields();
