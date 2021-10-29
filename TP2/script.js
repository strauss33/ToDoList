/* document.getElementById() |Permite seleccionar un elemento del documento por medio del valor del atributo id que se le haya asignado.
   document.createElement()  |Crea un elemento HTML especificado por su tagName, o un  HTMLUnknownElement si su tagName no se reconoce.
   appendChild()             |Inserta un nuevo nodo dentro de la estructura DOM de un documento. */

const input = document.getElementById("input");
const table = document.getElementById("tabla");
const boton = document.getElementById("boton");
const expandir = document.getElementById("fullscreen");
let tareas = [];

let geo = { lat: null, lon: null };

async function agregarTarea() {
  const fila = document.createElement("tr");

  fila.innerHTML = `
                    <td> <input type="checkbox" id="tarea" onClick="completar()" /> </td>
                    <td style="flex-grow: 2"> ${input.value} </td>
                    <td> <button onClick="copiar()" class="far fa-clipboard"></button> </td>
                    <td> <button onClick="compartir()" class="fas fa-share-alt"></button> </td>
                    <td> <button onClick = "borrar()" class="fas fa-trash-alt"></button> </td>
                    `;

  table.prepend(fila);
  
}

//Añadir una tarea
boton.addEventListener("click", function (e) {
  if (input.value === "") {
    alert("Ingrese una tarea valida");
  } else {
    agregarTarea();
    agregarElemento(input.value);
    guardarLS();
  }
  input.value="";
});

//Eliminar una tarea
function borrar(event) {
  this.event.target.parentElement.parentElement.remove();
  borrarLS(copiarText(event));
}

//Marcar tarea como completada
function completar(event) {
  tareas =JSON.parse(localStorage.getItem('tarea'));
  if (this.event.target.checked) {
    this.event.target.parentElement.parentElement.classList.add("completado");
    completarLocalStorage(copiarText(event));
  } else {
    this.event.target.parentElement.parentElement.classList.remove("completado");
    completarLocalStorage(copiarText(event));
  }
}

//Copiar tareas al portapapeles
function copiarText(event){
  return this.event.target.parentElement.parentElement.children[1].innerHTML;
}

function copiar(){
  if(navigator.clipboard != undefined){
    navigator.clipboard.writeText(copiarText(onclick))
    .then(() => log('Async writeText successful, "' + emailLink.textContent + '" written'))
    .catch(err => log('Async writeText failed with error: "' + err + '"'));
    alert("Tarea copiada al portapapeles");
  }
}

//Funcion Fullscreen
expandir.addEventListener("click",function(e){
  if(document.fullscreenElement == null){
    document.documentElement.requestFullscreen();
    expandir.className = "fas fa-compress"
  }else{
    document.exitFullscreen();
    expandir.className = "fas fa-expand"
  }

});

//Funcion compartir tarea
function compartir() {
  if(!("share" in navigator)){
    alert('no funciona');
    return;
  }

  navigator.share({
      title: 'Te comparto esta tarea',
      text: copiarText(onclick),
      url: document.URL
    })
    .then(() => console.log('Exito'))
    .catch(error => console.log('Error', error));
}


//Mantener elementos en la lista
agregarElemento = async (tarea) => {
  let item = {
    tarea: tarea,
    estado: false, 
    ubicacion: await obtenerUbicacion()
  }
  tareas.unshift(item);
} 

//Guardar las tareas en el local storage
const guardarLS = () => {
  localStorage.setItem('tarea', JSON.stringify(tareas));
}

const cargarLocalStorage = () => {
  table.innerHTML ='';
  tareas=JSON.parse(localStorage.getItem('tarea'));
  if(tareas == null){
    tareas= [];
  }else{
    tareas.forEach(element =>{
      if(element.estado==true){
        table.innerHTML += `
                    <td> <input type="checkbox" id="tarea" onClick="completar()" checked="checked" /> </td>
                    <td style="flex-grow: 2">${element.tarea}</td>
                    <td> <button onClick="copiar()" class="far fa-clipboard"></button> </td>
                    <td> <button onClick="compartir()" class="fas fa-share-alt"></button> </td>
                    <td> <button onClick = "borrar()" class="fas fa-trash-alt"></button> </td>
                    `;
      }else{
        table.innerHTML += `
                    <td> <input type="checkbox" id="tarea" onClick="completar()" /> </td>
                    <td style="flex-grow: 2">${element.tarea}</td>
                    <td> <button onClick="copiar()" class="far fa-clipboard"></button> </td>
                    <td> <button onClick="compartir()" class="fas fa-share-alt"></button> </td>
                    <td> <button onClick = "borrar()" class="fas fa-trash-alt"></button> </td>
                    `;

      }
    });
  }
}

borrarLS = (tarea1) =>{
  let indexA;
  tareas.forEach((element,index)=>{
    if(element.tarea === tarea1){
      indexA = index;
    }
  });
  tareas.splice(indexA,1);
  guardarLS();
}


completarLocalStorage = (tarea) =>{
  tareas.forEach((element,index) => {
    if(element.tarea === tarea){
      if(element.estado==false){
        element.estado=true;
      }else{
        element.estado = false;
      }
    }
  });
  guardarLS();
}

//Geolocalizacion
function recuperarUbicacion() {

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          function (location) {
              geo.lat = location.coords.latitude;
              geo.lon = location.coords.longitude;
          },
          function (err) {
              console.warn(err);
              geo.lat = null;
              geo.lon = null;
          }
      );
  } else {
      return null;
  }

}

const obtenerUbicacion = async () => {
  // A new Promise() se le pasa por parámetro una función con dos callbacks,
  // el primero resolve el que utilizaremos cuando se cumpla la promesa, 
  // y el segundo reject cuando se rechace

  const promesa = new Promise((resolve, reject) => {
      //llamo a getCurrentPosition y le paso los parámetros
      navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  console.log(new Date().toLocaleTimeString(), "promesa", promesa);

  const posicion = await promesa; //en este punto se detiene la ejecución del código y espera a que se cumpla la promesa

  console.log(new Date().toLocaleTimeString(), "posicion", posicion);

  return {
      lon: posicion.coords.longitude,
      lat: posicion.coords.latitude,
  };
};

window.onload = function (){
  cargarLocalStorage();
  //recuperarUbicacion();
  obtenerUbicacion();
}
