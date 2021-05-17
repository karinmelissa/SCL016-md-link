const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch');

//Verifica si el archivo seleccionado tiene extencion .md
const isMdFile = (path => {
  if (path.slice(-3) == '.md') {
    return true;
  }
  return false;
});

//Leer un archivo
const readMdFile = (path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.log('error' + err)
        reject(new Error("Archivo no encontrado" + path))
      }
      console.log('recorre archivo md' + data)
      resolve(data)
    })

  })
});

//Obtener links de un archivo 
const getLinks = (path => {
  return new Promise((resolve, reject) => {
    readMdFile(path).then(result => {

    })
  })
})

readMdFile("./readmeTest.md", { validate: true }).then((doc) => {
});