const findMdLinks = require('./lib/mdLinks.js');
const path = require('path');

//getting the route & validate request from the console 
let routeFile = process.argv[2];
let validateLinks = process.argv[3];
//resolves a sequence of paths or path segments into an absolute path.
routeFile = path.resolve(routeFile);
//normalizes the given path, fixing writtings errors 
routeFile = path.normalize(routeFile);

findMdLinks.mdLinks(routeFile,validateLinks);
