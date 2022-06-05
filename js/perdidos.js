import * as ServiceAlquiler from "../js/services/VolanteService.js";

let listaVolantes;
window.onload = () => {
    //CargarVolantes();
    CargarAlquileres();
};
function CargarAlquileres() {
  ServiceAlquiler.default().then((x) => Cargar(x));
}
function Cargar(x) {
  listaVolantes = x;
  CargarVolantes();
}





let select_ubicacion = document.getElementById("select-ubicacion");
let tipo_seleccionado = "";


select_ubicacion.addEventListener("click",(e)=>{
    $('#carteles').empty();
    CargarVolantes(tipo_seleccionado,(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value) 
})

document.getElementById("btn-todo").addEventListener("click",()=>{
    $('#carteles').empty();
    tipo_seleccionado = ""
    CargarVolantes("",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)
})
document.getElementById("btn-perro").addEventListener("click",()=>{
    $('#carteles').empty();
    tipo_seleccionado = "Perro"
    CargarVolantes("Perro",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)
})
document.getElementById("btn-gato").addEventListener("click",()=>{
    $('#carteles').empty();
    tipo_seleccionado = "Gato"
    CargarVolantes("Gato",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)
})
document.getElementById("btn-otro").addEventListener("click",()=>{
    $('#carteles').empty();
    tipo_seleccionado = "Otro"
    CargarVolantes("Otro",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)
})
function CargarVolantes(tipoAnimal,ubicacion) {

    

    var i = 0;
    var main = $('#carteles');
    listaVolantes.forEach(volante => {
        /*console.log(i)
        console.log(volante)*/
        //if(!tipoAnimal || tipoAnimal && volante.tipoMascota == tipoAnimal){
        if(
            (!tipoAnimal && !ubicacion) ||
            (!tipoAnimal && ubicacion && ubicacion == volante.ubicacion) ||
            (!ubicacion && tipoAnimal && tipoAnimal == volante.tipoAnimal) ||
            (ubicacion && ubicacion == volante.ubicacion && tipoAnimal && tipoAnimal == volante.tipoAnimal) 
            ){
            var card = `
            <article class="cartel">
                    <header>
                        <h3>SE BUSCA</h3>
                    </header>
                    <main class="contenido-cartel">
                        <img src="${volante.url_imagen}" class="imagen-cartel" alt="Perro">
                        <div class="contenido">
                            <p>
                            ${volante.descripción}
                            </p>
                        </div>
                    </main>
                    <footer>
                        <div class="ubicacion">
                            <img src="../img/perdidos/zona.png" alt="zona" id="zona">
                            <p>${volante.ubicacion}</p>
                        </div>
                        <div class="contacto">
                            <img src="../img/perdidos/whatsapp.png" alt="whatsapp" id="whatsapp">
                            <p>(+549) ${volante.telefono}</p>
                        </div>
                    </footer>
                </article>
            `
            main.append(card);
            i++;
        }
        
        
    })
    $('#resultados').empty();
    if(i){
        document.getElementById("resultados").innerHTML = "Resultados encontrados: "+i;
    }
    else{
        document.getElementById("resultados").innerHTML = "No hay resultados que mostrar";
    }
    console.log(i)
}


