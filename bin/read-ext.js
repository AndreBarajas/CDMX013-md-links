const fs = require('fs');
const path = require('path');

const dir = './bin/examples'

function fileRecursion (dir,  callback) {
      
    let route = [];

    fs.readdir(dir, (err, list) => {
        if (err) return callback(err);
        console.log(list);
        
        const listLenght = list.length;
            
        if (!listLenght) console.error('No hay archivos en esta carpeta');
        
        list.forEach(file => {

            file = path.resolve(dir, file);

                if (path.extname(file) === '.js') {
                    console.log(file);
                } else if (path.extname(file) != '.js') {
                    console.log('No es un archivo .js');
                }
            
            fs.stat(file, (err, stat) => {

                if (stat && stat.isDirectory()) {

                    route.push(file);

                    fileRecursion(file, (err, res) => {
                        route = route.concat(res);
                        if (!--listLenght) return callback(null, route);
                    });
                } else {
                    route.push(file);
                    if (!--listLenght) return callback(null, route);
                }
            })
        })

    })

};

   