const fs = require('fs');
const readline = require('readline');
const marked = require('marked');
const fetch = require('node-fetch');
const { resolve } = require('path');

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
        reject(new Error("Archivo no encontrado" + path))
      }
      resolve(getLinks(data,path))
    })
  })
});

const getLinkStatus = (link) => {
  return new Promise((resolve, reject) => {
    const result = {}
    fetch(link)
      .then((resp) => {
        result.status = resp.status;
        result.ok = resp.statusText;
        resolve(result);
      }).catch((error) => {
        result.status = error.code
        result.ok = `fail`;
        resolve(result);
      })
  })
}

//Obtener links de un archivo 
const getLinks = ((data,path) => {
  return new Promise((resolve, reject) => {
    let foundLinks = [];
    const renderer = new marked.Renderer();
    renderer.link = (href,title,text) =>{
      if(!href.startsWith("#")){
        foundLinks.push({
          text: text, href: href, file : path 
        })
      }
    }
    marked(data, { renderer: renderer });
    if (foundLinks.length === 0) {
      reject(new Error("No se han encontrado enlaces"))
    }
    resolve(foundLinks);
  })
});

const findPath = (path)=>{
  return new Promise((resolve,reject)=>{
    const mdFilesFound = [];
    fs.readdir(path,(error,files)=>{
      if(files==undefined||error){
        console.log(error)
      }
      files.forEach(e=>{
        if(isMdFile(e)){
          mdFilesFound.push(e)
        }
        else{
          //findPath(path +'/'+e)
          //console.log('No es archivo .md ')
          //No se que hacer pa que lea mas path uwu
        }
      })
      console.log(mdFilesFound)
      resolve(mdFilesFound)
    })
  })/*.then(mdFilesFound =>{
    return new Promise((resolve,reject)=>{
      mdFilesFound.forEach(e=>{
        resolve(mdLinks(e,true));
      })
    })
  })*/
}

const mdLinks = (path, validate)=> {
  //We make sure if the route provided its a .md file
  if(isMdFile(path) == true){
    return new Promise((resolve, reject) => {
      readMdFile(path).then((linksArray)=>{
        if(validate){
          const linksStatusArray = linksArray.map((e)=>{
            return getLinkStatus(e.href);
          })
          Promise.all(linksStatusArray).then((array)=>{
            for(let i=0;i<array.length;i++){
              Object.assign(linksArray[i],array[i])
            }
            resolve(linksArray)
          })
        }
        else{
          resolve(linksArray)
        }
      })
    })
  }
  //If is not an .md file search for a path 
  else{
    return new Promise((resolve, reject) =>{
      findPath(path).then(linksArray=>{
        linksArray.forEach(file =>{
          readMdFile(file).then(linksArray=>{
            if(validate){
              const linksStatusArray = linksArray.map((e)=>{
                return getLinkStatus(e.href);
              })
              Promise.all(linksStatusArray).then((array)=>{
                for(let i=0;i<array.length;i++){
                  Object.assign(linksArray[i],array[i])
                }
                resolve(linksArray)
              })
            }
            else{
              resolve(linksArray)
            }
          })
        })
      })
    });
  }
}

module.exports = {
  mdLinks,
  isMdFile,
  readMdFile,
  getLinkStatus,
  getLinks,
  findPath
}