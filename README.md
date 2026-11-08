
# Registro de participantes para un taller

## Descripción del proyecto

Aplicación web desarrollada como práctica de Desarrollo Web,
orientada al registro de participantes en talleres universitarios.

Permite ingresar los datos de inscripción, validar la información
y consultar los participantes registrados desde una misma página,
sin necesidad de recargarla.

## Tecnologías utilizadas

- HTML5: estructura del formulario.
- CSS3: estilos y adaptación a diferentes pantallas.
- JavaScript: eventos, validaciones e interacción.
- Node.js: ejecución de JavaScript en el servidor.
- Express: desarrollo de la API.
- JSON: intercambio de datos entre cliente y servidor.
- Git y GitHub: control de versiones y publicación.

## Funcionalidades

- Registro de nombre completo, correo, teléfono, taller y horario.
- Validación de campos obligatorios.
- Comprobación del formato del correo electrónico.
- Envío de inscripciones utilizando fetch y JSON.
- Consulta y visualización de participantes inscritos.
- Mensajes de confirmación o error.
- Actualización de la lista sin recargar la página.
- Diseño adaptable a computadoras y dispositivos móviles.

## Requisitos

- Node.js versión 18 o superior.
- npm.
- Visual Studio Code u otro editor de código.
- Navegador web.

## Instalación y ejecución

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir una terminal dentro de la carpeta que contiene package.json.
4. Instalar las dependencias:

```bash
npm install
```

5. Iniciar el servidor:

```bash
npm start
```

6. Abrir en el navegador:

http://localhost:3000

Para detener el servidor, presionar Ctrl + C en la terminal.

Si PowerShell bloquea los comandos de npm, utilizar:

```powershell
npm.cmd install
npm.cmd start
```

## Estructura del proyecto

```text
registro-taller-estudiante/
|-- public/
|   |-- index.html
|   |-- styles.css
|   |-- app.js
|-- server.js
|-- package.json
|-- package-lock.json
|-- README.md
|-- bitacora.md
|-- .gitignore
```

## Funcionamiento

El usuario completa los cinco campos del formulario y presiona
el botón Registrar inscripción.

JavaScript captura la información y utiliza fetch para enviar
una solicitud POST al servidor Express.

El servidor verifica que los campos estén completos y que
el correo electrónico tenga un formato válido.

Si los datos son correctos, se crea una inscripción con un
identificador y se devuelve una respuesta HTTP 201.

La aplicación muestra un mensaje de confirmación, limpia
el formulario y actualiza la lista de participantes con GET.

## API REST

### GET /api/inscripciones

Consulta todas las inscripciones registradas.

Dirección:
http://localhost:3000/api/inscripciones

Respuesta esperada: HTTP 200 y un arreglo JSON.

Si no existen participantes, devuelve:

```json
[]
```

### POST /api/inscripciones

Permite registrar un participante enviando un objeto JSON.

Ejemplo del cuerpo de la solicitud:

```json
{
  "nombre": "Ana López",
  "correo": "ana@ejemplo.com",
  "telefono": "12345678",
  "taller": "HTML y CSS",
  "horario": "Mañana"
}
```

Respuestas:

- HTTP 201: inscripción creada correctamente.
- HTTP 400: datos incompletos o correo con formato inválido.

## Pruebas del sistema

### Prueba 1: Registro válido

Completar todos los campos con datos de prueba y presionar
Registrar inscripción.

Resultado esperado:
Aparece un mensaje de confirmación y el participante se
agrega a la lista sin recargar la página.

### Prueba 2: Campo obligatorio vacío

Dejar un campo obligatorio sin completar e intentar registrar.

Resultado esperado:
El navegador impide el envío y solicita completar el campo.

### Prueba 3: Correo electrónico inválido

Ingresar un correo con formato incorrecto.

Resultado esperado:
El navegador impide el envío. Si se envía directamente
un correo inválido a la API, el servidor responde HTTP 400.

### Prueba 4: Consulta de participantes

Abrir:

http://localhost:3000/api/inscripciones

Resultado esperado:
Se muestra un arreglo JSON con las inscripciones existentes.

### Prueba 5: Diseño responsive

Reducir el ancho de la ventana del navegador.

Resultado esperado:
El formulario y la lista mantienen su legibilidad.

## Almacenamiento de información

Los registros se guardan temporalmente en un arreglo de memoria
dentro del servidor Node.js.

No se utiliza una base de datos en esta versión.

Al reiniciar el servidor, las inscripciones almacenadas se pierden.

## Control de versiones

El proyecto utiliza Git para registrar los cambios realizados
durante su desarrollo.

GitHub permite consultar el código fuente y el historial
de commits del proyecto.

Las dependencias de node_modules y los archivos .env
están excluidos mediante .gitignore.

## Limitaciones

- Los datos no se conservan después de reiniciar el servidor.
- No existe un sistema de autenticación.
- No se implementa una base de datos permanente.
- Se permiten inscripciones repetidas.
- La validación del correo comprueba su formato, no su existencia.

## Conclusión

El proyecto integra los conocimientos básicos de desarrollo
frontend y backend para construir un registro de participantes.

Durante su elaboración se trabajó con formularios HTML,
estilos CSS, eventos de JavaScript, solicitudes HTTP y
una API desarrollada con Node.js y Express.
