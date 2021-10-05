const input = document.getElementById("input");
const table = document.getElementById("tabla");
const boton = document.getElementById("boton");
const expandir = document.getElementById("fullscreen");

function agregarTarea() {
  const fila = document.createElement("tr");

  fila.innerHTML = `
                    <td> <input type="checkbox" id="tarea" onClick="completar()" /> </td>
                    <td style="flex-grow: 2"> ${input.value} </td>
                    <td> <button onClick="copiar()" class="far fa-clipboard"></button> </td>
                    <td> <button onClick="compartir()" class="fas fa-share-alt"></button> </td>
                    <td> <button onClick = "borrar()" class="fas fa-trash-alt"></button> </td>
                    `;

  tabla.prepend(fila);
  input.value= "";
}

//Añadir una tarea
boton.addEventListener("click", function (e) {
  if (input.value === "") {
    alert("Ingrese una tarea valida");
  } else {
    agregarTarea();
  }
});

//Eliminar una tarea
function borrar(event) {
  this.event.target.parentElement.parentElement.remove();
}

//Marcar tarea como completada
function completar(event) {
  if (this.event.target.checked) {
    this.event.target.parentElement.parentElement.classList.add("completado");
  } else {
    this.event.target.parentElement.parentElement.classList.remove("completado");
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
