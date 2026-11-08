# Bitácora de repaso de Desarrollo Web
Completa una ficha por tema con tus palabras. No copies párrafos de los sitios consultados.

## HTML

- Resumen propio (2–3 frases):
HTML es el lenguaje que se utiliza para estructurar el contenido de una página web. Permite organizar títulos, párrafos, botones y formularios para que el navegador pueda mostrar la información correctamente.

- Dos términos clave y su explicación:
Etiqueta: define un elemento dentro de la página, como un título, párrafo o formulario.
Atributo: proporciona información adicional sobre un elemento HTML, como el tipo de dato que debe ingresar el usuario o si un campo es obligatorio.

- Ejemplo de código explicado:
```html
<form>
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required>
  <button type="submit">Registrar</button>
</form>
```

Este código crea un formulario que solicita el nombre de una persona. El atributo for relaciona la etiqueta con el campo mediante su id, mientras que name identifica el dato y required evita que se envíe vacío.

- Pregunta que podría aparecer en el examen:
¿Cuál es la función principal de HTML en una página web?
Respuesta: Organizar y estructurar el contenido que se muestra en el navegador.

## CSS

- Resumen propio (2–3 frases):
CSS permite definir la apariencia de una página web mediante colores, tamaños, bordes y espacios. En el proyecto lo utilizamos para diseñar el formulario de inscripción y adaptar su presentación a diferentes tamaños de pantalla.

- Dos términos clave y su explicación:
Selector: identifica los elementos HTML a los que se aplicarán determinados estilos.
Padding: establece el espacio interior entre el contenido de un elemento y su borde.

- Ejemplo de código explicado:
```css
.panel {
  padding: 1.75rem;
  border: 1px solid #087e83;
  margin: 1.5rem 0;
}
```

Esta regla aplica estilos a los elementos que tienen la clase panel. Padding agrega espacio interior, border establece un borde y margin crea separación respecto a otros elementos.

- Práctica de Responsive y Flexbox:
En Flexbox Froggy practiqué propiedades como justify-content, que permite distribuir elementos dentro de un contenedor, y align-items, que controla su alineación. También trabajé con media queries para adaptar el diseño cuando cambia el ancho de la pantalla.

- Pregunta que podría aparecer en el examen:
¿Cuál es la diferencia entre margin y padding?
Respuesta: Margin establece el espacio exterior de un elemento, mientras que padding agrega espacio dentro de sus bordes.


## JavaScript y DOM

- Resumen propio (2–3 frases):
JavaScript permite agregar funcionalidades e interactividad a una página web. En el proyecto lo utilizamos para detectar el envío del formulario, obtener los datos ingresados y mostrar las inscripciones sin recargar la página.

- Dos términos clave y su explicación:
DOM: representa los elementos HTML de una página y permite que JavaScript acceda a ellos y modifique su contenido.
Evento: es una acción que ocurre en la página, como hacer clic en un botón, escribir en un campo o enviar un formulario.

- Ejemplo de código explicado:
```javascript
const formulario = document.querySelector("#formulario-registro");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  console.log(datos.get("nombre"));
});
```

Este código selecciona el formulario y escucha el evento submit. Cuando el usuario intenta enviarlo, preventDefault() evita la recarga de la página y FormData obtiene los valores ingresados.

- Variables, funciones y arreglos:
const permite declarar variables que no pueden reasignarse, mientras que let permite cambiar su valor durante la ejecución.
También utilizamos arreglos para almacenar varios datos y la propiedad length para conocer cuántos elementos contienen.

```javascript
const inscripciones = ["Ana", "Luis", "María"];

function contarInscripciones() {
  return inscripciones.length;
}

console.log(contarInscripciones());
```

Este ejemplo utiliza una función para contar los elementos del arreglo y devuelve como resultado 3.

- Pregunta que podría aparecer en el examen:
¿Para qué sirve preventDefault() al enviar un formulario?
Respuesta: Evita el envío tradicional del formulario y permite que JavaScript procese los datos sin recargar la página.


## Node.js, Express y API

- Resumen propio (2–3 frases):
Node.js permite ejecutar JavaScript fuera del navegador, mientras que Express facilita la creación de servidores y rutas. En el proyecto utilizamos una API para recibir inscripciones, validar los datos y devolver las respuestas en formato JSON.

- Dos términos clave y su explicación:
API: permite la comunicación entre el navegador y el servidor para consultar o enviar información.
Ruta: es una dirección del servidor que recibe solicitudes HTTP y ejecuta una operación determinada.

- Ejemplo de ruta o solicitud explicado:
```javascript
app.get("/api/inscripciones", (req, res) => {
  res.json(inscripciones);
});
```

Esta ruta recibe una solicitud GET y devuelve las inscripciones almacenadas temporalmente en el servidor mediante una respuesta JSON.

También implementamos POST /api/inscripciones para recibir los cinco datos del formulario, comprobar que estén completos y guardar una nueva inscripción.

- Conceptos trabajados:

Node.js: permite ejecutar el servidor utilizando JavaScript.
npm install: instala las dependencias necesarias para ejecutar el proyecto.
npm start: inicia el programa definido en el archivo package.json.
fetch(): realiza solicitudes HTTP desde el navegador hacia el servidor.
JSON.stringify(): convierte un objeto de JavaScript en una cadena de texto JSON.
respuesta.json(): interpreta el cuerpo JSON recibido y permite trabajar con sus datos en JavaScript.

- Estados HTTP:

200: indica que una solicitud se procesó correctamente.
201: indica que se creó un nuevo registro.
400: indica que la información enviada es incorrecta o está incompleta.

- Resultado de la práctica:

Probé la ruta POST enviando una inscripción desde la consola del navegador y recibí una respuesta HTTP 201. Después consulté la ruta GET y comprobé que el registro aparecía en el arreglo de inscripciones.
Finalmente conecté el formulario con fetch(), permitiendo registrar participantes, mostrar mensajes de confirmación y actualizar la lista sin recargar la página.

- Pregunta que podría aparecer en el examen:
¿Por qué se validan los datos en el navegador y también en Express?
Respuesta: El navegador ayuda al usuario a corregir errores antes del envío, mientras que Express comprueba la información recibida para evitar guardar datos incorrectos.


## SQL

- Resumen propio (2–3 frases):
SQL es un lenguaje que permite trabajar con bases de datos relacionales. Se utiliza para crear tablas, consultar registros y realizar operaciones sobre la información almacenada.

- Explica SELECT, INSERT, UPDATE y DELETE:
SELECT: consulta los registros de una tabla.
INSERT: agrega nuevos registros a una tabla.
UPDATE: modifica la información de registros existentes.
DELETE: elimina registros de una tabla.

- ¿Qué son una clave primaria y una clave foránea?
Clave primaria (PK): identifica de manera única cada registro dentro de una tabla.
Clave foránea (FK): permite establecer una relación entre los registros de dos tablas.

- Ejemplo de código explicado:

```sql
CREATE TABLE talleres (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  horario TEXT
);

INSERT INTO talleres (nombre, horario)
VALUES ('Desarrollo Web', 'Tarde');

SELECT * FROM talleres;
```

Este código crea una tabla llamada talleres, agrega un registro y posteriormente consulta la información almacenada.

- Diferencia entre DDL y DML:
DDL se utiliza para definir la estructura de una base de datos, por ejemplo, mediante CREATE TABLE.
DML permite insertar, modificar y eliminar registros utilizando instrucciones como INSERT, UPDATE y DELETE.

- Resultado de la práctica:
En SQLite Fiddle creé una tabla de talleres e inserté un registro. Después consulté la información con SELECT, cambié el horario de Tarde a Mañana con UPDATE y finalmente eliminé el registro utilizando DELETE. La última consulta confirmó que la tabla había quedado vacía.

- Pregunta que podría aparecer en el examen:

¿Por qué es importante utilizar WHERE en UPDATE y DELETE?
Respuesta: Porque permite indicar qué registros se deben modificar o eliminar, evitando afectar todos los datos de una tabla.


## Git y GitHub

- Resumen propio (2–3 frases):
Git es una herramienta que permite controlar las versiones de un proyecto y conservar un historial de sus cambios. GitHub es una plataforma que permite almacenar esos repositorios en línea y compartir el código con otras personas.

- Explica add, commit y push:
git add: prepara los archivos que se incluirán en el siguiente commit.
git commit: guarda una versión de los cambios en el repositorio local.
git push: envía los commits locales al repositorio remoto de GitHub.

- Diferencia entre Git y GitHub:
Git permite administrar las versiones del proyecto desde la computadora, mientras que GitHub permite alojar y compartir los repositorios a través de internet.

- Ejemplo de comandos explicado:
```bash
git add README.md public/app.js
git commit -m "Finaliza registro de participantes y documentacion"
git push origin main
```

Estos comandos preparan los archivos modificados, guardan una nueva versión con un mensaje descriptivo y publican los cambios en la rama main del repositorio remoto.

- Resultado de la práctica:
Inicialicé Git dentro de la carpeta del proyecto y realicé commits para registrar la estructura inicial, el formulario, los estilos y la lógica de JavaScript y Express.

Después creé un repositorio público en GitHub y publiqué los archivos. Finalmente actualicé el README y subí los cambios de la versión funcional del sistema.

También utilicé .gitignore para excluir la carpeta node_modules y los archivos .env, evitando publicar dependencias innecesarias o información sensible.

- Pregunta que podría aparecer en el examen:
¿Cuál es la diferencia entre git commit y git push?
Respuesta: Commit guarda una versión de los cambios en el repositorio local, mientras que push envía esos commits a GitHub.
