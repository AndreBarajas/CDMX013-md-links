const { program } = require('commander');

program
    .version('0.0.1')
    .description('A command line tool to analyze your Markdown links :D');

program.command('validate')
    .description('Verify if the links are active or not')
    .action(() => {
        console.log('validating')
    });
program.command('stats')
    .description('Shows the total of links, how many are repeated and broken ')
    .action(() => {
    console.log('stadistics files.....')
});

program.command('stats validate')
    .description('Stats and validate options are combined here ')
    .action(() => {
    console.log('verifying and statics')
});

program.parse(process.argv);

 