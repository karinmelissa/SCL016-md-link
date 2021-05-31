#!/usr/bin/env node
const findMdLinks = require('./lib/index.js');
const path = require('path');
const { program } = require('commander');

//getting the route & validate request from the console 
let routeFile = process.argv[2];
//resolves a sequence of paths or path segments into an absolute path.
routeFile = path.resolve(routeFile);
//normalizes the given path, fixing writtings errors 
routeFile = path.normalize(routeFile);

program
  .option('--validate', 'validate links')
  .option('--stats', 'show statistics instead of list')
program.parse(process.argv);  

const options = program.opts();
if(!options.validate & !options.stats){
  findMdLinks.mdLinks(routeFile).then((links)=>{
    console.log(links);
  });
}
else if(options.validate & !options.stats){
  findMdLinks.mdLinks(routeFile,true).then((links)=>{
    console.log(links);
  });
}
else if(!options.validate & options.stats){
  findMdLinks.mdLinks(routeFile, true).then((links)=>{
    const getStats = showStats(links, false)
    console.log(getStats)
  })
}
else if(options.validate & options.stats){
  findMdLinks.mdLinks(routeFile, true).then((links)=>{
    const getStats = showStats(links, true)
    console.log(links)
    console.log(getStats)
  })
}

const showStats = (linksArray , validation)=>{
  const linksStats = {
    Total: linksArray.length,
    Unique: new Set(linksArray.map(({ href }) => href)).size,
  }
  if(validation == true){
    linksStats.Broken = 0;
    linksArray.forEach((e) => {
      if(e.ok=='fail'){
        linksStats.Broken ++; 
      }
    });  
  }
  return linksStats;
}