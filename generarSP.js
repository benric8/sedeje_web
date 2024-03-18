const fs = require('fs');
const path = require('path');

function listarDirectorio(ruta, rutaRelativa) {
  // Leer el contenido del directorio
  fs.readdir(ruta, (err, archivos) => {
    if (err) {
      console.error('Error al leer el directorio:', err);
      return;
    }

    // Recorrer los archivos y subdirectorios
    archivos.forEach((archivo) => {
      const rutaCompleta = `${ruta}/${archivo}`;
      const rutaRelativaCompleta = `${rutaRelativa}/${archivo}`;

      // Obtener las estadísticas del archivo
      fs.lstat(rutaCompleta, (err, stats) => {
        if (err) {
          console.error('Error al obtener las estadísticas del archivo:', err);
          return;
        }
        // Obtener la fecha de creación y modificación del archivo
        const fechaCreacion = stats.birthtime.toLocaleDateString();
        const fechaModificacion = stats.mtime.toLocaleDateString();

        // Obtener la extensión del archivo
        const extension = path.extname(archivo);
        // Si es un archivo, mostrar su ruta relativa
        if (stats.isFile()) {
            let des = `${rutaRelativaCompleta}:${extension}:${fechaCreacion}:${fechaModificacion}`;
          console.log(des);
        } else if (stats.isDirectory()) {
          // Si es un directorio, mostrar su ruta relativa y llamar a la función de forma recursiva
          //console.log(`Directorio: ${rutaRelativaCompleta}`);
          listarDirectorio(rutaCompleta, rutaRelativaCompleta);
        }
      });
    });
  });
}

// Ruta del directorio a listar
const ruta = './';

// Ruta relativa inicial
const rutaRelativa = '';

// Iniciar el proceso de listar el directorio
listarDirectorio(ruta, rutaRelativa);

