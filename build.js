/*
 Quick and dirty dist "build system", requires TypeScript compilation to have been performed before starting
 */

var path = require("path");
var Builder = require('systemjs-builder');
var fs = require('fs');

fs.createReadStream('CNAME').pipe(fs.createWriteStream('public/CNAME'));
fs.createReadStream('index.html').pipe(fs.createWriteStream('public/index.html'));
fs.createReadStream('styles.css').pipe(fs.createWriteStream('public/styles.css'));
fs.createReadStream('systemjs.config.js').pipe(fs.createWriteStream('public/systemjs.config.js'));

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('', 'systemjs.config.js');

builder
    .bundle('app/main.js', 'public/systemjsbundle.js')
    .then(function() {
        console.log('Build complete');
    })
    .catch(function(err) {
        console.log('Build error');
        console.log(err);
    });