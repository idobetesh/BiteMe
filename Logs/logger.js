const morgan = require ('morgan');
const fs = require('fs');

const  morganChalk = morgan(function (tokens, req, res) {
    if(tokens.status(req,res)==200)
        return [
            tokens.method(req, res),
            tokens.status(req, res),
            tokens.url(req, res),
            tokens['response-time'](req, res) + ' ms  -',
            tokens['date'](req, res),
        ].join(' ');
    else if (tokens.status(req,res)==304)
        return [
            tokens.method(req, res),
            tokens.status(req, res),
            tokens.url(req, res),
            tokens['response-time'](req, res) + ' ms  -',
            tokens['date'](req, res),
        ].join(' ');
    else
        return [
            tokens.method(req, res),
            tokens.status(req, res),
            tokens.url(req, res),
            tokens['response-time'](req, res) + ' ms  -',
            tokens['date'](req, res),
        ].join(' ');
});

let wr = fs.createWriteStream('logs.txt', {flags: 'a'});
const logger = morgan('Date: :date - Method: :method, Status: :status, Path: :url, Response-time: :response-time ms', { stream: wr });
module.exports = {
    morgan, logger
}