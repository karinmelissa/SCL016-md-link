const findMdLinks = require('./lib/mdLinks.js');
const pathJS = require('path');

//getting the route & validate request from the console 
let routeFile = process.argv[2];
let validateLinks = process.argv[3];
//resolves a sequence of paths or path segments into an absolute path.
routeFile = pathJS.resolve(routeFile);
//normalizes the given pathfixing writtings errors 
routeFile = pathJS.normalize(routeFile);

findMdLinks.mdLinks(routeFile,validateLinks);
