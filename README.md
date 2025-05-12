# 🎬 Trailerflix - Catálogo de Películas y Series 🎬

## 📚 Proyecto de Preentrega - Curso de Backend (Node.js + Express)

---

### 👥 Integrante:
- ** Ana Maria Marquez Marquez**
- ** Andrea Judith junes**
- ** Marta Mariana Dominguez**

### 📌 Título del Proyecto:
**Trailerflix - API REST de cine**

### 📖 Descripción:
Trailerflix es una API REST que permite consultar información sobre un catálogo de películas y series. Fue creada como práctica para aplicar conocimientos de:
- Servidor con Express
- Manejo de archivos JSON
- Uso de rutas dinámicas
- Variables de entorno
- HTML embebido para respuestas visuales

---

### 🗂 Estructura del proyecto:

- `/` → Página de bienvenida en HTML
- `/catalogo` → Lista completa de películas y series
- `/titulo/:title` → Búsqueda por nombre (parcial, sin distinguir mayúsculas ni tildes)
- `/categoria/:cat` → Filtro por categoría (película o serie)
- `/reparto/:act` → Búsqueda parcial por actor/actriz
- `/trailer/:id` → Muestra el tráiler embebido o mensaje si no está disponible

---

### 🧪 Cómo probarlo:

1. Cloná el repositorio
2. Instalá las dependencias con `npm install`
3. Creá un archivo `.env` con el puerto y la ruta de datos
4. Ejecutá el servidor con `node index.js`
5. Probá las rutas desde el navegador

---

### ⚠️ Notas técnicas:

- El archivo `.env` está excluido del repositorio por seguridad.
- Los datos están en `/database/trailerflix.json`.
- Las búsquedas ignoran mayúsculas y tildes (normalización de texto).
- El servidor corre por defecto en `http://localhost:3008`.

---

✨ ¡Gracias por visitar mi proyecto! ✨

