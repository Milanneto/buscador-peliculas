// Los Getters traidos desde el index y la API_KEY:
const API_KEY = 'adf1f2d7';
const input = document.getElementById('nombre-pelicula');
const buscar = document.getElementById('buscar');
const año = document.getElementById('año');
const alerta = document.getElementById('mensaje-error');

// Boton funcionamiento del boton submit
buscar.addEventListener('click', () => {

  const nombrePelicula = input.value;

  if (nombrePelicula === "") {
    resultados.innerHTML = "";
    alerta.innerText = 'Por favor ingresa el nombre de una pelicula para buscar';
    setTimeout(() => {
      alerta.innerText = "";
    }, 3000);
    return;
  }

  //  Conexion de la API:
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${nombrePelicula}`)
    .then(respuesta => respuesta.json())
    .then(peliculas => {
      if (peliculas.Response === "False") {
        resultados.innerHTML = "";
        alerta.innerText = 'No se encontraron resultados';
          setTimeout(() => {
          alerta.innerText = "";
        }, 3000);
      return;
      }
      resultados.innerHTML = "";

  //  Conexion de la API con el DOM:
      peliculas.Search.forEach(pelicula => {

        const div = document.createElement('div');
        div.classList.add ('card');

        const tituloPelicula = document.createElement('h3');
        tituloPelicula.innerText = pelicula.Title;

        const posterPelicula = document.createElement('img')
        posterPelicula.src = pelicula.Poster;
        posterPelicula.alt = pelicula.Title;
        posterPelicula.style.width = "200px";

        const añoPelicula = document.createElement('h4')
        añoPelicula.innerText = `Año: ${pelicula.Year}`;

        div.appendChild(tituloPelicula);
        div.appendChild(posterPelicula);
        div.appendChild(añoPelicula);

        resultados.appendChild(div);
        console.log(pelicula)
      });
    })

    .catch(error => console.error(error));
})
