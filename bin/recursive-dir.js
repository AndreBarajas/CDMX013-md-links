const axios = require('axios');
const color = require('colors');
const fs = require('fs');
const path = require('path');

// Check if path is absolute or relative to return only absolute paths
function checkRoute(userPath) {
    console.log("error", userPath);
    if (userPath === undefined) {
        return false;
    } else if (path.isAbsolute(userPath) === true) {
        return userPath;
    } else {
        return (path.resolve(__dirname, userPath));
        
    }
};


// Filter the directories to return array with only .md files 
function getFilesMd(absolutePath) {
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
        return oneArray;
    }
}

// Read directories to extract info of .md files
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


// Function that validate links to know HTTP status
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
            resolve( statusLinks )
        }).catch(() =>  {
            statusLinks.push({
                href: arr.href,
                text: arr.text,
                file: arr.file,
                status: '404',
            });
                resolve( statusLinks )
            })
    })
};
    

// Promise All 
const promises = (obj) => {
    return new Promise((resolve, reject) => {
        Promise.all(
            obj.map(obj => getStatus(obj))
        ).then(response => {
            resolve(response);
            // console.log("promise all", response);
        })
    })
};


// Function to know basic statistics
const getStatistics = (arrObj) => {
    let statistics = {
        Total: 0,
        Unique: 0,
        Broken: 0,
    }
    arrObj.forEach(res => {
            if (res.status === '404') {
            statistics.Broken++
            console.log("stats", statistics.Total);
            } else if (res.status !== null) {
                statistics.Total++
            }
    })
    return statistics;
};

// Export functions
module.exports = {
    checkRoute,
    getFilesMd,
    getStatistics,
    readFile, 
    getStatus, 
    promises,
    getStatistics
}
    