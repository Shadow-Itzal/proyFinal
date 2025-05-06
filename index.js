const express = require('express'); // se importa el modulo express
const fs = require('fs'); // se importa el modulo fs
require('dotenv').config(); // se importan las variables de entorno

const app = express(); // se crea una instancia de express
const PUERTO = process.env.PUERTO || 3008; // en caso de que no exista la variable de entorno PUERTO, se usa el 3008
const RUTA_DATOS = process.env.RUTA_DATOS || './database/trailerFlix.json'; // en caso de que no exista la variable de entorno RUTA_DATOS, se usa el './database/trailerFlix.json'

// leer el archivo JSON y convertirlo a array de objetos
const peliculas = JSON.parse(fs.readFileSync(RUTA_DATOS, 'utf-8')); // se lee el archivo JSON y se convierte en un array de objetos que va en la variable peliculas








// endpoint para obtener todas las peliculas
app.get('/peliculas', (req, res) => {
    res.send(peliculas);
});







// escuchar peticiones en el puerto indicado
// poner al final del codigo. Dice algo asi: "Ya configure mis rutas, ya cargue los datos... ahora si, empeza a escuchar las peticiones en este puerto"
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});







