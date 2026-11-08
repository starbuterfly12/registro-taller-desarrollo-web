const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");

async function cargarInscripciones() {
  try {
    // Consultar las inscripciones del servidor.
    const respuesta = await fetch("/api/inscripciones");

    if (!respuesta.ok) {
      throw new Error("No se pudieron consultar las inscripciones.");
    }

    const inscripciones = await respuesta.json();

    // Limpiar la lista anterior.
    lista.innerHTML = "";

    if (inscripciones.length === 0) {
      const vacio = document.createElement("li");
      vacio.className = "vacio";
      vacio.textContent = "Aún no hay inscripciones.";
      lista.appendChild(vacio);
      return;
    }

    // Mostrar los participantes registrados.
    inscripciones.forEach((registro) => {
      const elemento = document.createElement("li");

      elemento.textContent =
        `${registro.nombre} - ${registro.correo} - ` +
        `${registro.telefono} - ${registro.taller} - ` +
        `${registro.horario}`;

      lista.appendChild(elemento);
    });

  } catch (error) {
    mensaje.textContent = error.message;
  }
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  // Obtener los cinco datos del formulario.
  const formularioDatos = new FormData(formulario);

  const datos = {
    nombre: formularioDatos.get("nombre"),
    correo: formularioDatos.get("correo"),
    telefono: formularioDatos.get("telefono"),
    taller: formularioDatos.get("taller"),
    horario: formularioDatos.get("horario")
  };

  try {
    mensaje.textContent = "";

    // Enviar la información a la API.
    const respuesta = await fetch("/api/inscripciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    // Mostrar cualquier error del servidor.
    if (!respuesta.ok) {
      mensaje.textContent =
        resultado.mensaje || "No se pudo registrar la inscripción.";
      return;
    }

    // Confirmar que el registro fue creado.
    mensaje.textContent = "Inscripción registrada correctamente.";

    // Limpiar el formulario.
    formulario.reset();

    // Actualizar la lista de participantes.
    await cargarInscripciones();

  } catch (error) {
    mensaje.textContent =
      "Ocurrió un error de conexión con el servidor.";
  }
});

// Mostrar los registros al abrir la página.
cargarInscripciones();
