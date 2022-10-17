
const fs = require('fs');
const path = require('path');

function test(folderPaths) {
    
       folderPaths.forEach(folderPath => {
        const results = fs.readdirSync(folderPath)
        const folders = results.filter(res => fs.lstatSync(path.resolve(folderPath, res)).isDirectory())
        const innerFolderPaths = folders.map(folder => path.resolve(folderPath, folder))
          if (folderPaths.length === 0) {
              return
           }
        console.log(innerFolderPaths);
        test(innerFolderPaths)
    })

}   

test([path.resolve(__dirname, 'examples'),]);

// console.log(path.resolve('bin'));