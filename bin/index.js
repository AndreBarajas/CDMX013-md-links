#!/usr/bin/env node
const path = require('path');
const { program } = require('commander');
const checkRoute = require ('./recursive-dir')


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
    .action((path, options) => {

        if (options.validate) {
            new Promise((resolve) => {
            resolve(checkRoute(path))
            })
            console.log('validate')
        } else if (options.stats) {
            console.log('stats')
        }
    });

program.parse(process.argv);