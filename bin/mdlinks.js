const fn = require('./recursive-dir');

//Function md-links to call all the modules+
const mdLinks = (userPath, options) => {
    return new Promise((resolve, reject) => {

        const absolutePath = fn.checkRoute(userPath); 
        console.log("ruta abs", absolutePath);

        if (absolutePath == false) {
            reject ('Verifica tu ruta ingresada')
        } 

        const arrayMds = fn.getFilesMd(absolutePath);
        console.log("array", arrayMds);
        
        // if (options.validate == true && options.stats == false) {
        //     fn.checkRoute(userPath)
        //         .then((path) => fn.checkRoute(path))
        //         .then((data) => resolve(data))
        //         .cath((error) => reject(error))
        // } else if (options.stats == true && options.validate == false) {
        //     fn.checkRoute((userPath))
        //         .then((path) => fn.getStatistics(path))
        //         .then((data) => resolve(data))
        //         .catch((error) => reject(error))
        // } else if (options.validate == true && options.stats == true) {
        //     fn.checkRoute((userPath))
        //         .then((path) => fn.checkRoute(path))
        //         .then((data) => resolve(fn.getStatistics(data, stats)))
        //         .catch((error) => reject(error))
        // } else {
        //     reject('¡Ups!, hubo un error, intentalo nuevamente.')
        // } 
    })
}

mdLinks('C:\\Users\\abaja\\Documents\\Laboratoria\\CDMX013-md-links\\bin\\examples\\readmeeee.md', { validate: true });