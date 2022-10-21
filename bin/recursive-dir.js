const color = require('colors'); 
const fs = require('fs');
const path = require('path');


// Check if path is absolute or relative & convert relative path into absolute
function checkRoute(userPath) {
    console.log(userPath);
    console.log(path.isAbsolute(userPath));
    if (userPath === undefined) {
        console.log('Ingresa una ruta válida'.red)
    } else if (path.isAbsolute(userPath) === true) {
        console.log('Es una ruta absoluta');
        getFileMd(userPath);
    } else {
        getFileMd(path.resolve(__dirname, userPath));
        console.log('Es una ruta relativa'.green, path.resolve(__dirname, userPath));
    }
}; 
const resultRoute = checkRoute('C:\\Users\\abaja\\Documents\\Laboratoria\\CDMX013-md-links\\bin');
console.log('resultado ruta abs', resultRoute);

// // Return array with files
function getFileMd(absolutePath) {
    console.log('path usuario',path)
    if (fs.lstatSync(absolutePath).isFile()) {
            console.log('ruta de un file', absolutePath)
            return [absolutePath]      
    } else {
        const results = fs.readdirSync(absolutePath);
        const innerFolders = results.map(result => getFileMd(absolutePath + '\\' + result));
        const oneArray = innerFolders.flat(Infinity);
        console.log("flat array", oneArray);
        return oneArray;
    }  
}
const resultLoop = getFileMd('C:\\Users\\abaja\\Documents\\Laboratoria\\CDMX013-md-links\\bin'); 
console.log('variable resultLoop', resultLoop);


