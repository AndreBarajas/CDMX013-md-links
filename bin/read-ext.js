const fs = require('fs');
const path = require('path');

const directory = fs.readdir('./bin/examples', (err, list) => {
    if (err) console.error(err);
    console.log(list);

    const listLenght = list.length;
    if (!listLenght) return console.error('No hay archivos en esta carpeta'); 

    list.forEach(file => {

        // const route = path.resolve('./bin/examples', __dirname);
        // fs.stat(route, function (err, stat) {
        //     if (err) console.error(err);
        //     if (stat && stat.isDirectory()) {
              if (path.extname(file) === '.js') {
                    console.log(file);
                } else if (path.extname(file) != '.js') {
                    console.log('No es un archivo .js');
                }
            // })
        })
    });
