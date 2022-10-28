const axios = require('axios');
const color = require('colors');
const fs = require('fs');
const path = require('path');


// Check if path is absolute or relative & convert relative path into absolute
// function checkRoute(userPath) {
//     console.log(userPath);
//     console.log(path.isAbsolute(userPath));
//     if (userPath === undefined) {
//         console.log('Ingresa una ruta válida'.red)
//     } else if (path.isAbsolute(userPath) === true) {
//         console.log('Es una ruta absoluta');
//         getFileMd(userPath);
//     } else {
//         getFileMd(path.resolve(__dirname, userPath));
//         console.log('Es una ruta relativa'.green, path.resolve(__dirname, userPath));
//     }
// };
// const resultRoute = checkRoute('C:\\Users\\abaja\\Documents\\Laboratoria\\CDMX013-md-links\\bin');
// console.log('resultado ruta abs', resultRoute);

// // Return array with only .md files 
function getFilesMd(absolutePath) {
    console.log('path usuario', path)
    if (fs.lstatSync(absolutePath).isFile()) {
        if (path.extname(absolutePath) === '.md') {
            console.log('ruta de un file', absolutePath);
            return [absolutePath];  
        } else {
            return [];
        }       
    } else {
        const results = fs.readdirSync(absolutePath);
        const innerFolders = results.map(result => getFilesMd(absolutePath + '\\' + result));
        const oneArray = innerFolders.flat(Infinity);
        // console.log("flat array", oneArray);
        return oneArray;
    }
}
const resultMds = getFilesMd('C:\\Users\\abaja\\Documents\\Laboratoria\\CDMX013-md-links\\bin');
// console.log('variable resultLoop', resultMds);


// Read files .md
function readFile(pathsFiles) {
    let arrayRead = []; 
    pathsFiles.forEach(file => { 
        const content = fs.readFileSync(file, 'utf-8'); 
        const regEx = /\[(.+)\]\((https?:\/\/.+)\)/gi;
        const filter = [...content.matchAll(regEx)];
        filter.forEach(res => {
             let contentFile = {
                href: res[2],
                text: res[1],
                file: file,
             };
             arrayRead.push(contentFile);
        })        
    })
    return arrayRead;
 };

const resultReadFile = readFile (resultMds);
// console.log("resultado de leer los archivos", resultReadFile);

// Validate links
const getStatus = (arr) => {
    let statusLinks = [];
    return new Promise((resolve, reject) => {
        axios({
            url: arr.href
        }).then((content) => {
            statusLinks.push({
                href: arr.href,
                text: arr.text,
                file: arr.file,
                status: content.status + content.statusText,
            });
            console.log("statusLinks", statusLinks);
            resolve( statusLinks )
        }).catch(() =>  {
            statusLinks.push({
                href: arr.href,
                text: arr.text,
                file: arr.file,
                status: '404',
            });
            console.log(statusLinks);
                resolve( statusLinks )
            })
    })
};
    

// Promise All
Promise.all([getStatus({
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\abaja\\Documents\\Laboratoria\\CDMX013-md-links\\bin\\examples\\readmeeee.md'
},
    {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\abaja\\Documents\\Laboratoria\\CDMX013-md-links\\bin\\examples\\readmeeee.md'
}
)])
    .then(response => console.log("promise all", response.forEach.flat())
    );

// 
    







