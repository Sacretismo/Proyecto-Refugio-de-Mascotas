let url_post = "http://localhost:8080/api/volantes";
/*import * as ServiceAlquiler from "./js/VolanteService.js";

window.onload = () => {

    
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //mode: "no-cors",
    },
    //body: JSON.stringify(alquilarReserva),
    //mode: 'no-cors'
};
  fetch("http://localhost:8080/api/volantes", options)
    .then((response) => {
        console.log(response);
      return response.json();
    })
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => console.log("ERROR: " + err));
    
    CargarAlquileres();
};


function CargarAlquileres() {
  ServiceAlquiler.default().then((x) => Cargar(x));
}
function Cargar(x) {
  console.log(x);
}
*/
const form = document.querySelector("form");
//let url_imagen = document.getElementById("form-urlImagen").value;

let url_imagen = document.getElementById("form-urlImagen");
let descripcion = document.getElementById("form-descripcion");
let ubicacion = document.getElementById("select-form-ubicacion");
let telefono = document.getElementById("form-telefono");
let tipo_animal = $('input[name=gridRadios]:checked', '#form-tipo');


form.addEventListener("submit", (e) => {
    
    e.preventDefault();
    //console.log(tipo_animal)
    console.log("Datos:" + url_imagen.value + descripcion.value + ubicacion.value + telefono.value + tipo_animal.val());

    
    let nuevo_volante = {
        "tipoAnimal": tipo_animal.val(),
        "url_imagen": url_imagen.value,
        "descripción": descripcion.value,
        "ubicacion": ubicacion.value,
        "telefono": telefono.value
    }
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevo_volante),
    };
    fetch(url_post, options)
        .then(response => {
            console.log("Status: " + response.status)            
        })
        .then(json => {
            return json;
        })
        .catch(err => console.log('ERROR: ' + err))
        
    
});


console.log("as")