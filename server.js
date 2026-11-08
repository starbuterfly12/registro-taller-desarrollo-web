
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Este arreglo guarda los registros solo mientras el servidor está activo.
const inscripciones = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// GET: consultar las inscripciones registradas.
app.get("/api/inscripciones", (req, res) => {
  res.json(inscripciones);
});

// POST: registrar una nueva inscripción.
app.post("/api/inscripciones", (req, res) => {
  // Obtener los cinco datos.
  const { nombre, correo, telefono, taller, horario } = req.body || {};

  // Comprobar que todos los campos tengan información.
  const campos = { nombre, correo, telefono, taller, horario };

  if (Object.values(campos).some(valor =>
    typeof valor !== "string" || !valor.trim()
  )) {
    return res.status(400).json({
      mensaje: "Completa todos los campos."
    });
  }

  // Validar el formato del correo electrónico.
  const correoLimpio = correo.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
    return res.status(400).json({
      mensaje: "Ingresa un correo electrónico válido."
    });
  }

  // Crear el registro con un identificador.
  const registro = {
    id: inscripciones.length + 1,
    nombre: nombre.trim(),
    correo: correoLimpio,
    telefono: telefono.trim(),
    taller: taller.trim(),
    horario: horario.trim()
  };

  // Guardar el registro en memoria.
  inscripciones.push(registro);

  // Responder con el registro creado.
  return res.status(201).json(registro);
});

// Iniciar el servidor.
app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
