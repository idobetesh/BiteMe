// const fs = require('fs');
// const moment = require('moment');

// const currTime = () => moment().format('DD-MM-YYYY HH:mm:ss');

// const saveToLog = (opObject) => {
//     console.log("inside logger func");
//     const timeStr = currTime();
//     const { statusCode: stat, msg: op } = opObject;
//     let buff = `${timeStr} -> ${op} | status[${stat}]\n`;

//     fs.appendFile('logs.txt', buff, (err) => {
//         if (err) return console.log(err);
//     });
// }

// module.exports = { saveToLog }



// const {createLogger, transports, format} = require('winston');

// const logger = createLogger({
//     transports: [
//         new transports.File({
//             filename: 'logs.log',
//             level: 'info',
//             format: format.combine(format.timestamp(), format.json())
//         })
//         // new transports.File({
//         //     filename: 'logs.log',
//         //     level: 'error',
//         //     format: format.combine(format.timestamp, format.json())
//         // })
//     ]
// })

// module.exports = logger;

const morgan = require ('morgan');
const chalk = require ('chalk');
const fs = require('fs');

const  morganChalk = morgan(function (tokens, req, res) {
    if(tokens.status(req,res)==200)
        return [
            chalk.green.bold(tokens.method(req, res)),
            chalk.green.bold(tokens.status(req, res)),
            chalk.green(tokens.url(req, res)),
            chalk.yellow(tokens['response-time'](req, res) + ' ms  -'),
            chalk.green(tokens['date'](req, res)),
        ].join(' ');
    else if (tokens.status(req,res)==304)
        return [
            chalk.yellow.bold(tokens.method(req, res)),
            chalk.yellow.bold(tokens.status(req, res)),
            chalk.yellow(tokens.url(req, res)),
            chalk.yellow(tokens['response-time'](req, res) + ' ms  -'),
            chalk.yellow(tokens['date'](req, res)),
        ].join(' ');
    else
        return [
            chalk.red.bold(tokens.method(req, res)),
            chalk.red.bold(tokens.status(req, res)),
            chalk.red(tokens.url(req, res)),
            chalk.yellow(tokens['response-time'](req, res) + ' ms  -'),
            chalk.red(tokens['date'](req, res)),
        ].join(' ');
});

let wr = fs.createWriteStream('logs.txt', {flags: 'a'});
const logger = morgan(':method :status :url  :response-time ms - :date', { stream: wr });
module.exports = {
    morganChalk, logger
}