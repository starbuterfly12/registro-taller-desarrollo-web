# Bitácora de repaso de Desarrollo Web

Completa una ficha por tema con tus palabras. No copies párrafos de los sitios consultados.

## HTML
- Resumen propio (2–3 frases):
HTML es el lenguaje que se utiliza para organizar el contenido de una página web. Permite agregar títulos, párrafos, imágenes, botones y formularios para que el navegador sepa qué elementos debe mostrar.

- Dos términos clave y su explicación:
Etiqueta: Es una instrucción que permite identificar un elemento de la página, como un título o un párrafo.
Atributo: Proporciona información adicional a una etiqueta, como el tipo de dato que debe ingresar una persona.

- Ejemplo de código explicado:
<form>
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" required>
  <button type="submit">Registrar</button>
</form>
Explicación: Este código crea un formulario que solicita el nombre de una persona. La etiqueta input permite escribirlo, required indica que el campo es obligatorio y el botón permite enviar el formulario.

- Pregunta que podría aparecer en el examen:
¿Cuál es la función principal de HTML en una página web?
Respuesta: Organizar y estructurar el contenido que se muestra en el navegador.

## CSS
Una regla propia:
La regla .panel aplica estilos a los elementos que tienen esa clase. La propiedad padding permite aumentar el espacio entre el contenido y el borde del elemento.

- Resumen propio (2–3 frases):
HTML permite organizar y darle estructura al contenido de una página web. Con sus etiquetas podemos agregar títulos, formularios, botones y otros elementos que aparecen en el navegador.

- Dos términos clave y su explicación:
Etiqueta semántica: indica qué función cumple una parte del contenido. Por ejemplo, <main> identifica el contenido principal y <section> agrupa información relacionada.
Atributo: agrega información a un elemento HTML. Por ejemplo, name identifica un campo, type define el tipo de dato y required indica que es obligatorio.

- Ejemplo de código explicado:
<form>
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required>
  <button type="submit">Registrar</button>
</form>
Este ejemplo muestra un formulario donde se solicita un nombre. El atributo for conecta la etiqueta con el campo a través del id, mientras que name identifica el dato y required impide enviarlo vacío mediante la validación del navegador.

- Pregunta que podría aparecer en el examen:
¿Qué diferencia existe entre una etiqueta HTML y un atributo?
Respuesta: La etiqueta define el elemento que aparece en la página, mientras que el atributo proporciona información adicional sobre ese elemento.

## JavaScript y DOM
- Resumen propio (2–3 frases):
JavaScript permite que una página web realice acciones y responda a diferentes situaciones. Con variables, funciones y condiciones podemos controlar procesos, como verificar si todavía hay cupos disponibles para un taller.

- Dos términos clave y su explicación:
const: permite declarar una variable cuyo valor no se puede reasignar. Es útil para datos que deben mantenerse iguales.
let: permite declarar una variable cuyo valor puede cambiar durante la ejecución del programa.

- Ejemplo de código explicado:
const cuposMaximos = 20;
let inscritos = 0;
function hayCupo() {
  return inscritos < cuposMaximos;
}
if (hayCupo()) {
  inscritos++;
}

Este código comprueba si todavía hay espacio para registrar estudiantes. Si el número de inscritos es menor que el límite establecido, el contador aumenta en uno.

- Pregunta que podría aparecer en el examen:
¿Qué diferencia existe entre const y let en JavaScript?
Respuesta: const no permite reasignar una variable, mientras que let sí permite cambiar su valor.

## Node.js, Express y API
- Resumen propio (2–3 frases):

- Dos términos clave y su explicación:

- Ejemplo de ruta o solicitud explicado:

- Pregunta que podría aparecer en el examen:


## SQL
- Resumen propio (2–3 frases):
- Explica SELECT, INSERT, UPDATE y DELETE:
- ¿Qué son una clave primaria y una clave foránea?
- Pregunta que podría aparecer en el examen:

## Git y GitHub
- Resumen propio (2–3 frases):
- Explica add, commit y push:
- Diferencia entre Git y GitHub:
- Pregunta que podría aparecer en el examen:
