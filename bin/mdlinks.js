const fn = require('./recursive-dir');

//Function md-links to call all the modules 
const mdLinks = (userPath, options) => {
    return new Promise((resolve, reject) => {

        const absolutePath = fn.checkRoute(userPath);
       
        if (absolutePath == false) {
            reject('Verifica la ruta que ingresaste')
        }

        const arrayMds = fn.getFilesMd(absolutePath);
        // console.log("array", arrayMds);

         if (options == undefined) {
        resolve(fn.readFile(arrayMds));
        }  else if (options.validate == true && options.stats == false) {
            const readFiles = fn.readFile(arrayMds);
            fn.promises(readFiles)
                .then((data) => resolve (data.flat()))
                .catch((error) => reject(error))
        } else if (options.stats == true && options.validate == false) {
            const readFiles = fn.readFile(arrayMds);
            fn.promises(readFiles)
                .then((data) => resolve (fn.getStatistics(data)))
                .catch((error) => reject(error))
        } else if (options.validate == true && options.stats == true) {
            const readFiles = fn.readFile(arrayMds);
            fn.promises(readFiles)
                .then((data) => data.flat())
                .then((data) => resolve (fn.getStatistics(data)))
                .catch((error) => reject(error))                
        } else if (options.stats == false && options.validate == false) {
            resolve(fn.readFile(arrayMds));
            // console.log(readfiles);
        } 
    })
}

const resultMdLinks = mdLinks('C:\\Users\\abaja\\Documents\\Laboratoria\\CDMX013-md-links\\bin\\examples\\readmeeee.md');
console.log("variable", resultMdLinks);
resultMdLinks.then(console.log);