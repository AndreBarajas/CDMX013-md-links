#!/usr/bin/env node
const path = require('path');
const { program } = require('commander');
const fn = require ('./recursive-dir');

program
    .name('Mdlinks')
    .version('1.0.0', '-v', 'Shows the actual version')
    .description('An API for command line tool to analyze your Markdown links :D');

program
    .description('Choose between validate your links or return statistics of them')
    .argument('<path>', 'path that includes file .md')
    .option('--validate', 'Verify if the links are active or not with axios')
    .option('--stats', 'Few statistics of .md links')
    .command('--validate --stats', 'Get statistics and validation of links')
    .action((userPath, option) => {
            return new Promise((resolve, reject) => {
                if (option.validate) {
                    const fnCheck = fn.checkRoute(userPath)
                    console.log("funcion checkRoute", fnCheck);
                        // .then((path) => fn.checkRoute(path))
                        // .then((data) => resolve(data))
                        // .cath((error) => reject(error))
                } else if (option.stats) {
                    fn.checkRoute((userPath))
                        .then((path) => fn.getStatistics(path))
                        .then((data) => resolve(data))
                        .catch((error) => reject(error))
                } else if (option.validate && option.stats) {
                    fn.checkRoute((userPath))
                        .then((path) => fn.checkRoute(path))
                        .then((data) => resolve(fn.getStatistics(data, stats)))
                        .catch((error) => reject(error))
                } else {
                    reject('¡Ups!, huno un error, intentalo nuevamente.')
                }
            })
        })    

program.parse(process.argv);

