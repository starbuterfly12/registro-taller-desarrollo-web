
const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Campos requeridos para las inscripciones.
const camposRequeridos = [
  "nombre",
  "correo",
  "telefono",
  "taller",
  "horario",
  "modalidad",
  "nivel_experiencia"
];

// Validar la información recibida.
function validarInscripcion(datos) {
  if (!datos || camposRequeridos.some(campo =>
    typeof datos[campo] !== "string" ||
    !datos[campo].trim()
  )) {
    return "Completa todos los campos.";
  }

  const correo = datos.correo.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return "Ingresa un correo electrónico válido.";
  }

  return null;
}

// GET: consultar todas las inscripciones.
app.get("/api/inscripciones", (req, res) => {
  try {
    const inscripciones = db.prepare(
      "SELECT * FROM inscripciones ORDER BY id DESC"
    ).all();

    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar las inscripciones."
    });
  }
});

// POST: registrar una inscripción.
app.post("/api/inscripciones", (req, res) => {
  const error = validarInscripcion(req.body);

  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  try {
    const datos = camposRequeridos.map(campo =>
      req.body[campo].trim()
    );

    const resultado = db.prepare(`
      INSERT INTO inscripciones
      (nombre, correo, telefono, taller, horario,
       modalidad, nivel_experiencia)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(...datos);

    const registro = db.prepare(
      "SELECT * FROM inscripciones WHERE id = ?"
    ).get(Number(resultado.lastInsertRowid));

    res.status(201).json(registro);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al guardar la inscripción."
    });
  }
});

// PUT: modificar una inscripción existente.
app.put("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "Identificador inválido."
    });
  }

  const error = validarInscripcion(req.body);

  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  try {
    const datos = camposRequeridos.map(campo =>
      req.body[campo].trim()
    );

    const resultado = db.prepare(`
      UPDATE inscripciones
      SET nombre = ?, correo = ?, telefono = ?,
          taller = ?, horario = ?, modalidad = ?,
          nivel_experiencia = ?
      WHERE id = ?
    `).run(...datos, id);

    if (resultado.changes === 0) {
      return res.status(404).json({
        mensaje: "Inscripción no encontrada."
      });
    }

    const registro = db.prepare(
      "SELECT * FROM inscripciones WHERE id = ?"
    ).get(id);

    res.json(registro);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la inscripción."
    });
  }
});

// DELETE: eliminar una inscripción.
app.delete("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "Identificador inválido."
    });
  }

  try {
    const resultado = db.prepare(
      "DELETE FROM inscripciones WHERE id = ?"
    ).run(id);

    if (resultado.changes === 0) {
      return res.status(404).json({
        mensaje: "Inscripción no encontrada."
      });
    }

    res.json({
      mensaje: "Inscripción eliminada correctamente."
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la inscripción."
    });
  }
});

// Reporte: resumen de inscripciones.
app.get("/api/reportes", (req, res) => {
  try {
    const total = db.prepare(
      "SELECT COUNT(*) AS total FROM inscripciones"
    ).get().total;

    const porTaller = db.prepare(`
      SELECT taller AS nombre, COUNT(*) AS cantidad
      FROM inscripciones
      GROUP BY taller
      ORDER BY cantidad DESC
    `).all();

    const porHorario = db.prepare(`
      SELECT horario AS nombre, COUNT(*) AS cantidad
      FROM inscripciones
      GROUP BY horario
      ORDER BY cantidad DESC
    `).all();

    const porModalidad = db.prepare(`
      SELECT modalidad AS nombre, COUNT(*) AS cantidad
      FROM inscripciones
      GROUP BY modalidad
      ORDER BY cantidad DESC
    `).all();

    res.json({
      total,
      porTaller,
      porHorario,
      porModalidad
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al generar los reportes."
    });
  }
});

// Iniciar el servidor.
app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
