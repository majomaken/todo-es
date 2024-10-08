const tareaDesdeFormulario = document.getElementById("todo-input")
const buttonAgregarTarea = document.getElementById("add-task")
const listaDeTareas = document.getElementById("todo-list")
const buttonEliminarTodasLasTareas = document.getElementById("delete-all-button")
const guardarTodasLasTareas = document.getElementById("save-button")

const crearTarea = () => {
  if (tareaDesdeFormulario.value.length === 0 || tareaDesdeFormulario.value.trim() === "") {
    tareaDesdeFormulario.value = ""
    return alert("Debes escribir una tarea")
  }

  const elementoLi = document.createElement("li")
  elementoLi.innerHTML = '<input type="checkbox" />' +
    '<span>' + tareaDesdeFormulario.value + '</span>' +
    '<i class="fa-solid fa-trash button-eliminar"></i>'

  listaDeTareas.appendChild(elementoLi)



  const cajaDeCheck = elementoLi.querySelector("input[type='checkbox']");
  cajaDeCheck.addEventListener("change", () => {
    const textoDeLaTarea = elementoLi.querySelector("span");
    textoDeLaTarea.style.textDecoration = cajaDeCheck.checked ? "line-through" : "none";
  })

  const buttonBorrarTarea = elementoLi.querySelector(".button-eliminar");
  buttonBorrarTarea.addEventListener("click", () => {
    listaDeTareas.removeChild(elementoLi);
    // elementoLi.remove();
  })

  tareaDesdeFormulario.value = ""
}

buttonAgregarTarea.addEventListener("click", crearTarea)


const guardarTareas = (tareas) => {
  localStorage.setItem("tareas", JSON.stringify({tareas}));
}

const cargarTareas = () => {
  const tareasComoTexto = localStorage.getItem("tareas");
  return tareasComoTexto ? JSON.parse(tareasComoTexto) : [];
}


buttonEliminarTodasLasTareas.addEventListener("click", () => {
  const elementosLi = listaDeTareas.querySelectorAll("li");
  elementosLi.forEach(elementoLi => {
    const cajaDeCheck = elementoLi.querySelector("input[type='checkbox']")
    if (cajaDeCheck.checked) {
      listaDeTareas.removeChild(elementoLi);
    }
  })
})

guardarTodasLasTareas.addEventListener("click", () => {
  const elementosLi = listaDeTareas.querySelectorAll("li");
  const tareas = Array.from(elementosLi).map(elementoLi => {
    const textoDeLaTarea = elementoLi.querySelector("span");
    return textoDeLaTarea.textContent;
  })
  console.log(tareas)
  guardarTareas(tareas);
})

const tareasCargadas = cargarTareas();

console.log('tareasCargadas', tareasCargadas)

tareasCargadas.tareas.forEach(tarea => {
  const elementoLi = document.createElement("li")
  elementoLi.innerHTML = '<input type="checkbox" />' +
    '<span>' + tarea + '</span>' +
    '<i class="fa-solid fa-trash button-eliminar"></i>'
  listaDeTareas.appendChild(elementoLi)

  const cajaDeCheck = elementoLi.querySelector("input[type='checkbox']");
  cajaDeCheck.addEventListener("change", () => {
    const textoDeLaTarea = elementoLi.querySelector("span");
    textoDeLaTarea.style.textDecoration = cajaDeCheck.checked ? "line-through" : "none";
  })

  const buttonBorrarTarea = elementoLi.querySelector(".button-eliminar");
  buttonBorrarTarea.addEventListener("click", () => {
    listaDeTareas.removeChild(elementoLi);
  })
})

