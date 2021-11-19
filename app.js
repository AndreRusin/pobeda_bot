
const { Command } = require('commander');
const { bot } = require('./src/bot.js');

const program = new Command();

program
    .version('0.0.1')
    .description('Pobeda parse')
    .option('-d, --debug', 'Show browser')
    .action((options) => {
        const debug = options.debug;
        console.log('Debug mode', debug);
        bot(debug);
    })
    .parse();
