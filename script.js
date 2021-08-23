/* document.getElementById () | Permite, como su nombre indica, seleccionar un elemento del documento por medio del valor del 
atributo id que se le haya asignado.
document.createElement()  | crea un elemento HTML especificado por su tagName, o un  HTMLUnknownElement si su tagName no se reconoce.
appendChild() | Inserta un nuevo nodo dentro de la estructura DOM de un documento, y es la segunda parte del proceso central uno-dos,
crear-y-añadir para construir páginas web a base de programación.*/

//<td> <button onClick="borrar()"><i class="mdi mdi-delete"></i></button></td>

const input = document.getElementById("input");
const table = document.getElementById("tabla");
const boton = document.getElementById("boton");

function agregarTarea() {
  const fila = document.createElement("tr");

  fila.innerHTML = `
                    <td> <input type="checkbox" onClick="completar()" /> </td>
                    <td style="flex-grow: 2"> ${input.value} </td>
                    <td> <span onClick = "borrar()" class="fas fa-trash-alt"></span> </td>
                    `;

  tabla.appendChild(fila);
  input.value= "";
}

boton.addEventListener("click", function (e) {
  if (input.value === "") {
    alert("Ingrese una tarea valida");
  } else {
    agregarTarea();
  }
});

function borrar(event) {
  this.event.target.parentElement.parentElement.remove();
}

function completar(event) {
  if (this.event.target.checked) {
    this.event.target.parentElement.parentElement.classList.add("completado");
  } else {
    this.event.target.parentElement.parentElement.classList.remove("completado");
  }
}








