
const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");

const btnGuardar = document.querySelector("#btn-guardar");
const btnCancelar = document.querySelector("#btn-cancelar");

const totalInscripciones = document.querySelector("#total-inscripciones");
const reporteTaller = document.querySelector("#reporte-taller");
const reporteHorario = document.querySelector("#reporte-horario");
const reporteModalidad = document.querySelector("#reporte-modalidad");

let idEdicion = null;

const campos = [
  "nombre",
  "correo",
  "telefono",
  "taller",
  "horario",
  "modalidad",
  "nivel_experiencia"
];

// Mostrar mensajes al usuario.
function mostrarMensaje(texto) {
  mensaje.textContent = texto;
}

// Obtener los datos del formulario.
function obtenerDatos() {
  const datosFormulario = new FormData(formulario);
  const datos = {};

  campos.forEach((campo) => {
    datos[campo] = String(datosFormulario.get(campo) || "").trim();
  });

  return datos;
}

// Restaurar el formulario a su estado inicial.
function cancelarEdicion() {
  idEdicion = null;
  formulario.reset();
  btnGuardar.textContent = "Registrar inscripción";
  btnCancelar.hidden = true;
}

// Consultar y mostrar las inscripciones.
async function cargarInscripciones() {
  try {
    const respuesta = await fetch("/api/inscripciones");

    if (!respuesta.ok) {
      throw new Error("No se pudieron consultar las inscripciones.");
    }

    const inscripciones = await respuesta.json();

    lista.replaceChildren();

    if (inscripciones.length === 0) {
      const vacio = document.createElement("li");
      vacio.className = "vacio";
      vacio.textContent = "Aún no hay inscripciones.";
      lista.appendChild(vacio);
      return;
    }

    inscripciones.forEach((registro) => {
      const elemento = document.createElement("li");
      elemento.className = "item-inscripcion";

      const informacion = document.createElement("div");
      informacion.className = "datos-inscripcion";

      const nombre = document.createElement("strong");
      nombre.textContent = registro.nombre;

      const detalle = document.createElement("p");
      detalle.textContent =
        `${registro.correo} | ${registro.telefono}`;

      const taller = document.createElement("p");
      taller.textContent =
        `${registro.taller} | ${registro.horario}`;

      const modalidad = document.createElement("p");
      modalidad.textContent =
        `${registro.modalidad} | ${registro.nivel_experiencia}`;

      informacion.append(nombre, detalle, taller, modalidad);

      const acciones = document.createElement("div");
      acciones.className = "acciones-inscripcion";

      const btnEditar = document.createElement("button");
      btnEditar.type = "button";
      btnEditar.className = "btn-editar";
      btnEditar.textContent = "Editar";
      btnEditar.addEventListener("click", () => {
        iniciarEdicion(registro);
      });

      const btnEliminar = document.createElement("button");
      btnEliminar.type = "button";
      btnEliminar.className = "btn-eliminar";
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", () => {
        eliminarInscripcion(registro.id);
      });

      acciones.append(btnEditar, btnEliminar);
      elemento.append(informacion, acciones);
      lista.appendChild(elemento);
    });

  } catch (error) {
    mostrarMensaje(error.message);
  }
}

// Cargar los datos de un participante para editarlo.
function iniciarEdicion(registro) {
  idEdicion = registro.id;

  campos.forEach((campo) => {
    formulario.elements[campo].value = registro[campo];
  });

  btnGuardar.textContent = "Guardar cambios";
  btnCancelar.hidden = false;

  mostrarMensaje(`Editando inscripción de ${registro.nombre}`);

  formulario.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Registrar o actualizar una inscripción.
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  if (!formulario.reportValidity()) {
    return;
  }

  const datos = obtenerDatos();
  const editando = idEdicion !== null;

  const ruta = editando
    ? `/api/inscripciones/${idEdicion}`
    : "/api/inscripciones";

  const metodo = editando ? "PUT" : "POST";

  btnGuardar.disabled = true;

  try {
    const respuesta = await fetch(ruta, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(
        resultado.mensaje || "No se pudo guardar la inscripción."
      );
      return;
    }

    cancelarEdicion();

    // Actualizar la lista y los reportes.
    await Promise.all([
      cargarInscripciones(),
      cargarReportes()
    ]);

    mostrarMensaje(
      editando
        ? "Inscripción actualizada correctamente."
        : "Inscripción registrada correctamente."
    );

  } catch (error) {
    mostrarMensaje("Error de conexión con el servidor.");
  } finally {
    btnGuardar.disabled = false;
  }
});

// Cancelar una edición.
btnCancelar.addEventListener("click", () => {
  cancelarEdicion();
  mostrarMensaje("Edición cancelada.");
});

// Eliminar una inscripción.
async function eliminarInscripcion(id) {
  const confirmar = confirm(
    "¿Estás segura de que deseas eliminar esta inscripción?"
  );

  if (!confirmar) {
    return;
  }

  try {
    const respuesta = await fetch(
      `/api/inscripciones/${id}`,
      { method: "DELETE" }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(
        resultado.mensaje || "No se pudo eliminar la inscripción."
      );
      return;
    }

    if (idEdicion === id) {
      cancelarEdicion();
    }

    await Promise.all([
      cargarInscripciones(),
      cargarReportes()
    ]);

    mostrarMensaje("Inscripción eliminada correctamente.");

  } catch (error) {
    mostrarMensaje("Error de conexión con el servidor.");
  }
}

// Crear barras visuales para los reportes.
function mostrarReporte(contenedor, datos) {
  contenedor.replaceChildren();

  if (datos.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "vacio";
    vacio.textContent = "Sin datos disponibles.";
    contenedor.appendChild(vacio);
    return;
  }

  const maximo = Math.max(...datos.map(item => item.cantidad));

  datos.forEach((item) => {
    const fila = document.createElement("div");
    fila.className = "fila-reporte";

    const encabezado = document.createElement("div");
    encabezado.className = "encabezado-reporte";

    const nombre = document.createElement("span");
    nombre.textContent = item.nombre;

    const cantidad = document.createElement("strong");
    cantidad.textContent = item.cantidad;

    encabezado.append(nombre, cantidad);

    const fondo = document.createElement("div");
    fondo.className = "barra-fondo";

    const barra = document.createElement("div");
    barra.className = "barra-progreso";
    barra.style.width =
      `${(item.cantidad / maximo) * 100}%`;

    fondo.appendChild(barra);
    fila.append(encabezado, fondo);
    contenedor.appendChild(fila);
  });
}

// Consultar los reportes de la base de datos.
async function cargarReportes() {
  try {
    const respuesta = await fetch("/api/reportes");

    if (!respuesta.ok) {
      throw new Error("No se pudieron consultar los reportes.");
    }

    const datos = await respuesta.json();

    totalInscripciones.textContent = datos.total;

    mostrarReporte(reporteTaller, datos.porTaller);
    mostrarReporte(reporteHorario, datos.porHorario);
    mostrarReporte(reporteModalidad, datos.porModalidad);

  } catch (error) {
    mostrarMensaje(error.message);
  }
}

// Cargar información al abrir la página.
cargarInscripciones();
cargarReportes();
