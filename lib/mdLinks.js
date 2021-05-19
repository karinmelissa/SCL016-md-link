const fs = require('fs');
const readline = require('readline');
const marked = require('marked');
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
      resolve(getLinks(data))
    })

  })
});

//Obtener links de un archivo 
const getLinks = (data => {
  return new Promise((resolve, reject) => {
    let foundLinks = [];
    let lineFound = 0;
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
      if(!href.startsWith("#")){
        foundLinks.push({
          text: text, href: href,
        })
      }
    }
    marked(data, { renderer: renderer });
    if (foundLinks.length === 0) {
      reject(new Error("No se han encontrado enlaces"))
    }
    console.log(foundLinks);
    resolve(foundLinks);
  })
})

readMdFile("./readmeTest.md", { validate: true }).then((doc) => {
});