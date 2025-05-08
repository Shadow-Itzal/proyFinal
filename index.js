const express = require('express'); // se importa el modulo express
const fs = require('fs'); // se importa el modulo fs (File System)
require('dotenv').config(); // se importan las variables de entorno

const app = express(); // se crea una instancia de express
const PUERTO = process.env.PUERTO || 3008; // en caso de que no exista la variable de entorno PUERTO, se usa el 3008
const RUTA_DATOS = process.env.RUTA_DATOS || './database/trailerFlix.json'; // en caso de que no exista la variable de entorno RUTA_DATOS, se usa el './database/trailerFlix.json'

// leer el archivo JSON y convertirlo a array de objetos
// const peliculas = JSON.parse(fs.readFileSync(RUTA_DATOS, 'utf-8')); // se lee el archivo JSON y se convierte en un array de objetos que va en la variable peliculas. 

// El Reparto como no es array, se lo convierte en array con split y el "," como separador, asi que se hace esto:
// en resumen: esto convierte el contenido JSON (texto) a objetos de JS, y se asegura que el reparto sea un array
const peliculas = JSON.parse(fs.readFileSync(RUTA_DATOS, 'utf-8')).map(p => {
    return {
        ...p, // copiamos todas las propiedades de la pelicula
        reparto: Array.isArray(p.reparto) ? p.reparto : p.reparto.split(', ') // si el reparto es un array, lo deja como esta, si no lo convierte en array
    };
});



// ............. hecho por Mariana y Ana ..........................

// // definir una ruta raiz
// app.get('/', (req, res) => {
//     res.send('<h1>Bienvenidos a nuestra pagina de peliculas</h1>');
// });

// // endpoint para obtener todas las peliculas por catalogo
// app.get('/catalogo', (req, res) => {
//     res.send(peliculas);
// });


// // ruta dinamica. Tiene que ir despues de las rutas estaticas. Ejemplo: http://localhost:3008/titulo/umbrella

// // ruta dinamica para obtener una pelicula por su nombre
// app.get('/titulo/:title', (req, res) => {
//     const tituloBuscado = req.params.title. toLowerCase();
//     const resultados = peliculas.filter(pelicula => 
//     pelicula.titulo.toLowerCase().includes(tituloBuscado));
//     res.json(resultados);
// })

// // ruta dinamica para obtener una pelicula por su categoria (serie o pelicula)
// app.get('/categoria/:cat', (req, res) => {
//     const categoriaBuscada = req.params.cat;
//     const peliculasFiltradas = peliculas.filter(pelicula => pelicula.categoria === categoriaBuscada);
//     res.send(peliculasFiltradas);
// })


// // ruta predeterminada para manejar una ruta inexistente
// app.use((req, res) => {
//     res.status(404).send('Ruta no encontrada');
// })

// hasta aca llegamos
// -------------------------------------------


// intento otra vez



// Ruta raíz - muestra mensaje de bienvenida con HTML
app.get('/', (req, res) => {
    res.send(` 
        <!DOCTYPE html>
        <html>
            <head>
                <title>Bienvenido a Trailerflix</title>
                <style>
                    body { background:#121212; color:#fff; font-family:sans-serif; text-align:center; padding:50px; }
                    h1 { color: #f44336; }
                </style>
            </head>
            <body>
                <h1>🎬 Bienvenido a Trailerflix</h1>
                <p>Explorá nuestro catálogo de películas y series favoritas.</p>
            </body>
        </html>
    `);
}); // muestra el mensaje de bienvenida en el inicio de la pagina


  // Ruta /catalogo - muestra todo el contenido del JSON en formato HTML
app.get('/catalogo', (req, res) => {
    let html = `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>Catálogo de Trailerflix</title>
                    <style>
                        body { background:#1e1e1e; color:#fff; font-family:sans-serif; padding:20px; }
                        .item { background:#2a2a2a; padding:15px; margin:15px 0; border-radius:8px; }
                        .titulo { font-size:20px; color:#00ccff; }
                        .categoria { font-style:italic; color:#ccc; }
                    </style>
                </head>
                <body>
                    <h1>🎬 Catálogo completo</h1>`;

    peliculas.forEach(p => {
        html += `
            <div class="item">
                <div class="titulo">${p.titulo}</div>
                <div class="categoria">${p.categoria} - ${p.genero}</div>
                <p>${p.resumen}</p>
                <p><strong>Reparto:</strong> ${p.reparto.join(', ')}</p>
                ${p.trailer ? `<a href="${p.trailer}" target="_blank">Ver trailer</a>` : `<em>Trailer no disponible</em>`}
            </div>`;
    }); // recorre el array de peliculas mostrandolas en el html

    html += `</body></html>`;
    res.send(html);
}); // muestra todo el contenido del JSON


  // Ruta /titulo/:title - busca por título (parcial, sin importar mayúsculas)
app.get('/titulo/:title', (req, res) => {
    const titulo = req.params.title.toLowerCase();
    const resultados = peliculas.filter(p => p.titulo.toLowerCase().includes(titulo)); // busca en el array de peliculas el titulo buscado en minusculas

    let html = `
        <html>
            <head>
                <style>
                    body { background:#121212; color:#fff; font-family:sans-serif; padding:20px; }
                    .item { background:#2a2a2a; margin:15px 0; padding:15px; border-radius:8px; }
                    .titulo { font-size:20px; color:#00ccff; }
                </style>
            </head>
            <body>
                <h1>Resultados para "${req.params.title}"</h1>`;

    if (resultados.length === 0) {
        html += `<p>No se encontraron resultados.</p>`;
    } else {
        resultados.forEach(p => {
            html += `
                <div class="item">
                    <div class="titulo">${p.titulo}</div>
                    <div>${p.categoria} - ${p.genero}</div>
                    <p>${p.resumen}</p>
                </div>`;
        });
    }

    html += `</body></html>`;
    res.send(html);
});


  // Ruta /categoria/:cat - filtra por "película" o "serie" - busqueda parcial sin importar mayúsculas ni tildes
app.get('/categoria/:cat', (req, res) => {
    const cat = req.params.cat.toLowerCase();
    const resultados = peliculas.filter(p => p.categoria.toLowerCase() === cat);

    let html = `
        <html>
            <head>
                <style>
                    body { background:#121212; color:#fff; font-family:sans-serif; padding:20px; }
                    .item { background:#2a2a2a; margin:15px 0; padding:15px; border-radius:8px; }
                    .titulo { font-size:20px; color:#00ccff; }
                </style>
                </head>
                <body>
                    <h1>Contenido de la categoría: ${req.params.cat}</h1>`;

    if (resultados.length === 0) {
        html += `<p>No se encontraron resultados.</p>`;
    } else {
        resultados.forEach(p => {
            html += `
                <div class="item">
                    <div class="titulo">${p.titulo}</div>
                    <div>${p.genero}</div>
                    <p>${p.resumen}</p>
                </div>`;
        });
    }

    html += `</body></html>`;
    res.send(html);
});


  // Ruta /reparto/:act - filtra por actor/actriz y muestra solo "titulo" + "reparto"
app.get('/reparto/:act', (req, res) => {
    const actor = req.params.act.toLowerCase();
    const resultados = peliculas.filter(p =>
        p.reparto.some(r => r.toLowerCase().includes(actor))
    );

    let html = `
        <html>
            <head>
                <style>
                    body { background:#121212; color:#fff; font-family:sans-serif; padding:20px; }
                    .item { background:#2a2a2a; margin:15px 0; padding:15px; border-radius:8px; }
                    .titulo { font-size:20px; color:#00ccff; }
                </style>
            </head>
            <body>
                <h1>Reparto que incluye "${req.params.act}"</h1>`;

    if (resultados.length === 0) {
        html += `<p>No se encontraron resultados.</p>`;
    } else {
        resultados.forEach(p => {
            html += `
                <div class="item">
                    <div class="titulo">${p.titulo}</div>
                    <p><strong>Reparto:</strong> ${p.reparto.join(', ')}</p>
                </div>`;
        });
    }

    html += `</body></html>`;
    res.send(html);
});


  // Ruta /trailer/:id - busca por código y muestra id + titulo + trailer
app.get('/trailer/:id', (req, res) => {
    const id = req.params.id;
    const resultado = peliculas.find(p => p.id == id); // busca en el array de peliculas el id buscado

    if (!resultado) { // si no encuentra el id buscado muestra un error
        return res.status(404).send('<h1>❌ Contenido no encontrado.</h1>');
    } 

    // si no encuentra el trailer muestra un error
    if (!resultado?.trailer) { 
        return res.send(`
            <html>
                <head>
                    <style>
                        body { background:#121212; color:#fff; font-family:sans-serif; text-align:center; padding:40px; }
                    </style>
                </head>
                <body>
                    <h1>🎬 ${resultado.titulo}</h1>
                    <p><em>Trailer no disponible.</em></p>
                </body>
            </html>
        `);
    }

    // muestra el contenido del JSON
    res.send(`
        <html>
            <head>
                <title>Trailer - ${resultado.titulo}</title>
                <style>
                    body { background:#121212; color:#fff; font-family:sans-serif; text-align:center; padding:40px; }
                    iframe { width:560px; height:315px; border: none; border-radius: 10px; }
                    .info { margin-top: 20px; font-size: 18px; }
                </style>
            </head>
            <body>
                <h1>🎬 ${resultado.titulo}</h1>
                <iframe src="${resultado.trailer.replace("watch?v=", "embed/")}" allowfullscreen></iframe>
                <div class="info">
                    <p><strong>ID:</strong> ${resultado.id}</p>
                    <p><a href="${resultado.trailer}" target="_blank" style="color:#00ccff;">Ver en YouTube</a></p>
                </div>
            </body>
        </html>
    `);
}); 



  // Ruta para manejar errores si se escribe una ruta incorrecta
// ruta corta para manejar una ruta inexistente
// app.use((req, res) => {
//     res.status(404).send('<h1>404 - Ruta no encontrada</h1>');
// });

// ruta larga para manejar una ruta inexistente
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>404 - No encontrado</title>
                <style>
                    body {
                        background-color: #1e1e1e;
                        color: #fff;
                        font-family: 'Arial', sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                    }
                    img {
                        max-width: 300px;
                        margin-bottom: 20px;
                    }
                    h1 {
                        font-size: 48px;
                        color: #ff4444;
                    }
                    p {
                        font-size: 20px;
                        color: #ccc;
                    }
                    a {
                        margin-top: 20px;
                        display: inline-block;
                        padding: 10px 20px;
                        background: #00ccff;
                        color: #000;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    a:hover {
                        background: #0099cc;
                    }
                </style>
            </head>
            <body>
                <img src="https://i.imgur.com/qIufhof.png" alt="404 no encontrado">
                <h1>🚫 404 - Ruta no encontrada</h1>
                <p>Lo sentimos, la página que buscás no existe.</p>
                <a href="/">Volver al inicio</a>
            </body>
        </html>
    `);
});












// escuchar peticiones en el puerto indicado
// poner al final del codigo. Dice algo asi: "Ya configure mis rutas, ya cargue los datos... ahora si, empeza a escuchar las peticiones en este puerto"
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}, la direccion es http://localhost:${PUERTO}`);
});







