# Sistema de registro de participantes para talleres

## Descripción del proyecto
Aplicación web desarrollada para gestionar las inscripciones de participantes a talleres universitarios de Desarrollo Web.
El sistema permite registrar, consultar, editar y eliminar inscripciones mediante un formulario. También incluye reportes visuales para conocer la cantidad de participantes registrados por taller, horario y modalidad.
Los datos se almacenan en una base de datos SQLite, por lo que permanecen guardados incluso después de reiniciar el servidor.

## Tecnologías utilizadas
- HTML5: estructura de la página y formulario.
- CSS3: diseño visual y adaptación a diferentes pantallas.
- JavaScript: interacción con el formulario y la API.
- Node.js: ejecución del servidor.
- Express: implementación de rutas y solicitudes HTTP.
- SQLite: almacenamiento de las inscripciones.
- Git y GitHub: control de versiones y publicación del código.

## Funcionalidades

### Registro de participantes
El formulario solicita siete datos:

1. Nombre completo.
2. Correo electrónico.
3. Teléfono.
4. Taller.
5. Horario.
6. Modalidad.
7. Nivel de experiencia.

Los campos son obligatorios y se verifica que el correo tenga un formato válido.

### Gestión de inscripciones
- Registrar participantes nuevos.
- Consultar los participantes inscritos.
- Editar la información de una inscripción.
- Eliminar inscripciones con confirmación.
- Actualizar la lista sin recargar la página.
- Conservar los registros en SQLite.

### Horarios disponibles
- Mañana: 7:00 a. m. a 11:00 a. m.
- Tarde: 1:00 p. m. a 5:00 p. m.
- Noche: 6:00 p. m. a 9:00 p. m.
- Mixto: 7:00 a. m. a 9:00 p. m.

### Reportes
El sistema muestra:

- Total de participantes inscritos.
- Cantidad de inscripciones por taller.
- Cantidad de inscripciones por horario.
- Cantidad de inscripciones por modalidad.

Los resultados se presentan con barras visuales que se actualizan después de registrar, modificar o eliminar una inscripción.

## Estructura del proyecto
```text
registro-taller-estudiante/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── database.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── bitacora.md
```

El archivo `registro_taller.db` se genera localmente y no se publica en GitHub.

## Requisitos
- Node.js versión 22.13 o superior.
- npm.
- Visual Studio Code u otro editor de código.
- Navegador web.

## Instalación y ejecución

### 1. Obtener el proyecto
Clonar el repositorio:

```bash
git clone https://github.com/starbuterfly12/registro-taller-desarrollo-web.git
```
Entrar a la carpeta:
```bash
cd registro-taller-desarrollo-web
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor
```bash
npm start
```

La aplicación estará disponible en:
http://localhost:3000

La base de datos SQLite se crea automáticamente al iniciar el servidor por primera vez.

## API REST
El sistema utiliza las siguientes rutas:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/inscripciones | Consultar inscripciones |
| POST | /api/inscripciones | Registrar participante |
| PUT | /api/inscripciones/:id | Actualizar inscripción |
| DELETE | /api/inscripciones/:id | Eliminar inscripción |
| GET | /api/reportes | Consultar estadísticas |

### Ejemplo de solicitud POST
```json
{
  "nombre": "Ana López",
  "correo": "ana@ejemplo.com",
  "telefono": "12345678",
  "taller": "JavaScript",
  "horario": "Tarde (1:00 p. m. - 5:00 p. m.)",
  "modalidad": "Virtual",
  "nivel_experiencia": "Principiante"
}
```

Si los datos son válidos, el servidor guarda el registro y devuelve el código HTTP 201.

Si falta información o el correo no tiene un formato válido, devuelve HTTP 400.

## Pruebas realizadas

### Registro de participantes
Se comprobó que el formulario permite ingresar los siete campos y guardar una inscripción.

### Validación de campos
Se verificó que el navegador impide enviar campos obligatorios vacíos o correos con formato incorrecto.

### Edición
Se modificó información de una inscripción y se comprobó que los cambios se reflejan en la lista.

### Eliminación
Se eliminó una inscripción y se verificó que desaparece de los registros mostrados.

### Persistencia
Se reinició el servidor y se comprobó que los registros restantes continúan almacenados.

### Reportes
Se verificó que el total de participantes y las estadísticas se actualizan al cambiar las inscripciones.

## Diseño responsive
La aplicación utiliza CSS y media queries para adaptar los formularios, tarjetas y reportes a pantallas de diferentes tamaños.

## Base de datos
Se utiliza SQLite con una tabla llamada `inscripciones`.
Cada registro almacena:

- id
- nombre
- correo
- telefono
- taller
- horario
- modalidad
- nivel_experiencia
- fecha_registro

El identificador se genera automáticamente.

Se utilizan consultas preparadas para insertar, consultar, actualizar y eliminar registros.

## Control de versiones

El proyecto utiliza Git para registrar los cambios realizados durante el desarrollo.
GitHub almacena el código fuente y la documentación.
El archivo `.gitignore` excluye las dependencias, archivos de entorno y la base de datos local.

## Conclusión
Durante esta práctica se desarrolló una aplicación que conecta el formulario HTML con una API creada en Express y una base de datos SQLite.

Se implementaron las operaciones de registro, consulta, actualización y eliminación, junto con reportes que permiten visualizar la información almacenada.

El proyecto permitió practicar la comunicación entre el frontend, el backend y la base de datos, así como el uso de Git y GitHub para administrar los cambios.
