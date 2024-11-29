
// ---------------------------------------------------------------------------

const botonClima = document.getElementById("obtener-clima");

botonClima.addEventListener("click", function() {
    // Verifica si el navegador soporta la geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log("Latitud:", lat, "Longitud:", lon);
            
            // Llama a la función para obtener el clima
            obtenerClima(lat, lon);
        }, function(error) {
            alert("No se pudo obtener la ubicación.");
        });
    } else {
        alert("Geolocalización no es soportada en este navegador.");
    }
});

// Función para obtener los datos del clima
function obtenerClima(lat, lon) {
    //const apiKey = 'tu_api_key_de_openweathermap'; // Reemplaza con tu clave API
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9e122cd782b2d0333f5fe4e7fa192062&units=metric&lang=es`;
    
    axios.get(url)
    .then(function(response) {
        console.log(response);
           console.log(response.data);
        // Verificar si hay error en la respuesta
        if (response.data.error) {
            document.getElementById("resultado").innerHTML = "No se encontró pronostico para estas coordenadas.";
        } else {
            // Extraer los datos del JSON
            const zona = response.data.name || "No disponible";
            const descripcion = response.data.weather[0].description || "No disponible";
            const temp = response.data.main.temp || "No disponible";
            const tempMin = response.data.main.temp_min || "No disponible";
            const tempMax = response.data.main.temp_max || "No disponible";              
            const humedad = response.data.main.humidity || "No disponible";
            const viento = response.data.wind.speed || "No disponible";
            const icono = response.data.weather[0].icon;
            const texto =`La temperatura actual en ${zona} es de ${temp} grados`;
            

            document.getElementById('icono-clima').innerHTML = `<img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="icono clima">`;              
            document.getElementById("zon").textContent = zona;
            document.getElementById("hume").textContent = humedad+'% H';
            document.getElementById("viento").textContent = viento+' m/s';
            document.getElementById('descripcion').textContent = descripcion.toUpperCase();
            document.getElementById('temperatura').textContent =(temp).toFixed(1)+"°";
            document.getElementById('tempMin').textContent = (tempMin).toFixed(1)+"° min";
            document.getElementById('tempMax').textContent = (tempMax).toFixed(1)+"° max";              
            
            hablar(texto);
            document.getElementById("resultado").innerHTML = "HOY";
            
        }
    })
    .catch(function(error) {
       
        //console.log("Error al realizar la solicitud:", error);
        //document.getElementById("resultado").innerHTML = "La API no está disponible en este momento. Intenta más tarde.";
    });


}