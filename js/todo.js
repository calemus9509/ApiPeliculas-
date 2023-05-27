//sugerencia
const acumular = [
  "tt0434665",
  "tt0267804",
  "tt6723576",
  "tt1205489",
  "tt1790864",
  "tt0133093",
  "tt0120737",
];
function sugerencia() {
  let recomendacion = "";
  acumular.forEach((element) => {
    fetch(`http://www.omdbapi.com/?i=${element}&apikey=a0f6ccb`)
      .then((response) => response.json())
      .then((data) => {
        recomendacion += `<div class="card mx-3  my-3" style="width: 18rem;">
                  <img src=${data.Poster} class="card-img-top" alt="...">
                  <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <p class="card-text">año: ${data.Year}</p>
                  <p class="card-text">Descripcion: ${data.Plot}</p>
                  <a  onclick="local('${data.imdbID}')" href="otro.html" class="btn btn-primary">Detalles</a>
                  <a  bg-dark onclick="favoritos('${data.imdbID}')" class="btn btn-primary">Favoritos</a>

                  </div>
                  </div>`;
        document.getElementById("quemado").innerHTML = recomendacion;
      });
  });
}

//traer y mostar peliculas
let buscarPelicula = document.getElementById("pelicula");
let buscar = document.getElementById("botonP");
function traerPeliculas() {
  let nombre = buscarPelicula.value;
  let url = `http://www.omdbapi.com/?s=${nombre}&apikey=a0f6ccb`;
  let varias = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.Search.forEach((element) => {
        // trae los generos, directores y actores
        let ids = element.imdbID;
        fetch(`http://www.omdbapi.com/?i=${ids}&apikey=a0f6ccb`)
          .then((response) => response.json())
          .then((data) => {
            varias += `<div class="card mx-3  my-3" style="width: 18rem;">
                  <img src=${element.Poster} class="card-img-top" alt="...">
                  <div class="card-body">
                  <h5 class="card-title"> ${element.Title}</h5>
                  <p class="card-text">año: ${element.Year}</p>
                  <p class="card-text">Genero: ${data.Genre}</p>
                  <p class="card-text">Director: ${data.Director}</p>
                  <p class="card-text">Clasificacion: ${data.Rated}</p>
                  <a  onclick="local('${element.imdbID}')" href="otro.html" class="btn btn-primary">Detalles</a>
                  <a  bg-dark onclick="favoritos('${element.imdbID}')" class="btn btn-primary">Favoritos</a>

  </div>
  </div>`;
            document.getElementById("carta").innerHTML = varias;
            document.getElementById("fila").innerHTML = "";
            document.getElementById("quemado").innerHTML = "";
            document.getElementById("titulor").innerHTML = "";
          });
      });
    });
}
//autocompletado
function complet() {
  let nombre = buscarPelicula.value;
  let url = `http://www.omdbapi.com/?s=${nombre}&apikey=a0f6ccb`;
  let varias = "";
  if (nombre.length >= 3) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.Search.forEach((element) => {
          varias += `
          <div class="card bg-dark" style="width:455px">
              <a onclick="local('${element.imdbID}')" href="otro.html" class="btn btn-primary">${element.Title}</a>
           </div>
          </div>
          `;
        });

        document.getElementById("fila").innerHTML = varias;
        document.getElementById("carta").innerHTML = "";
      });
  }
}

//arreglo favoritos
const fav = [];
function favoritos(dato) {
  fav.push(dato);
}
//imprimir datos
function imprimir() {
  favos = "";
  let favo = fav;
  favo.forEach((element) => {
    let url = `http://www.omdbapi.com/?i=${element}&apikey=a0f6ccb`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        favos += `
          <div class="card mx-3  my-3" style="width: 18rem;">
            <a onclick="local('${data.imdbID}')" href="otro.html">
            <img src="${data.Poster}" class="card-img-top" alt="...">
          </a>
            <div class="card-body">
              <h5 class="card-title">${data.Title}</h5>
              <p class="card-text">año: ${data.Year}</p>

            </div>
            <a  onclick="local('${data.url}')" href="otro.html" class="btn btn-primary">Detalles</a>
            <a onclick="eliminarD('${data.imdbID}')" class="btn btn-primary">eliminar</a>
          </div>`;
        document.getElementById("agregarD").innerHTML = favos;
      });
  });
}
//eliminar datos

function eliminarD(dato) {
  console.log(dato);
  if (fav.includes(dato)) {
    let salir = fav.indexOf(`${dato}`);
    fav.splice(salir, 1);
    imprimir();
  }
}
//enviar por local storage
function local(urlType) {
  localStorage.setItem("url", urlType);
}
