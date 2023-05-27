function trae() {
  return new Promise((response) => {
    let url = localStorage.url;
    let llave = "&apikey=a0f6ccb";
    let api = "http://www.omdbapi.com/?i=";
    let todo = `${api}${url}${llave}`;
    console.log(todo);
    fetch(todo)
      .then((response) => response.json())
      .then((data) => {
        let id = data.imdbID;
        //traer trailer
        trailer(id);
        document.getElementById("clasificar").innerHTML = ` ${data.Title}`;
        document.getElementById(
          "cartas"
        ).innerHTML = `<div class="card mx-3 my-3" style="width: 18rem;">
              <img  src="${data.Poster}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">nombre: ${data.Title}</h5>
                <p class="card-text">Clasificacion: ${data.Rated}</p>
                <p  class="card-text">Año: ${data.Year}</p>
                <p class="card-text">Duracion: ${data.Runtime}</p>
                <p class="card-text">Actores: ${data.Actors}</p>
                <p class="card-text">Descripcion: ${data.Plot}</p>
                <p class="card-text">Escritor: ${data.Writer}</p>

              </div>
              </div>`;
        response("Hola");
      });
  });
}
//traer trailer
function trailer(data) {
  let llave = "AIzaSyCVckJFwSxR4gfZNlUainwN57E4sqJrLDg";
  let idTrailer = data;
  console.log(idTrailer);
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${idTrailer}+trailer&key=${llave}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let trailer = data.items[0].id.videoId;
      let youtube = `https://www.youtube.com/embed/${trailer}`;
      console.log(youtube);
      document.getElementById("youtra").src = youtube;
    });
}
