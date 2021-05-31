const { mdLinks, isMdFile, readMdFile, getLinkStatus, getLinks, findPath } = require('../lib/index.js');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});

// Get Links from File
describe('readMdFile', () => {
  it('should be a function', () => {
    expect(typeof readMdFile).toBe('function');
  });
  it('should return an array', () => {
    return readMdFile("readmeTest.md").then(result => {
      expect(typeof result).toBe('object');
    })
  })
});
describe('idMdFie', () => {
  it('should be a function', () => {
    expect(typeof isMdFile).toBe('function');
  });
  it('should return a boolean', () => {
    const isMd = isMdFile("readmeTest.md");
    expect(typeof isMd).toBe('boolean');
  });
});
//Md-Links
describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('should resolve to an object when validate is true', () => {
    return mdLinks("readmeTest.md", { validate: true }).then(finalResult => {
      expect(typeof finalResult).toBe('object');
    })
  })
  it('should resolve to an object when validate is false', () => {
    return mdLinks("readmeTest.md", { validate: false }).then(finalResult => {
      expect(typeof finalResult).toBe('object');
    })
  })
  //revisar path 
});



