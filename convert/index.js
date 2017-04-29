/* eslint-disable no-console */
/* global process */

var fs = require('fs');
var path = require('path');
var pathToConvert = 'src';
var logic = {};

function convertNewValues(data, fileDir) {
    console.log(fileDir, 'started...');
    var newData = data

        // replace "<prop>: <rule>"
        .replace(/margin-left:/g, `margin-${logic.left}:`)
        .replace(/margin-right:/g, `margin-${logic.right}:`)
        .replace(/padding-left:/g, `padding-${logic.left}:`)
        .replace(/padding-right:/g, `padding-${logic.right}:`)
        .replace(/border-left:/g, `border-${logic.left}:`)
        .replace(/border-right:/g, `border-${logic.right}:`)
        .replace(/border-top-left:/g, `border-top-${logic.left}:`)
        .replace(/border-top-right:/g, `border-top-${logic.right}:`)
        .replace(/border-bottom-right:/g, `border-bottom-${logic.right}:`)
        .replace(/border-bottom-left:/g, `border-bottom-${logic.left}:`)
        .replace(/left:/g, `${logic.left}:`)
        .replace(/right:/g, `${logic.right}:`)
        .replace(/text-align: left/g, `text-align: ${logic.left}`)
        .replace(/text-align: right/g, `text-align: ${logic.right}`)
        .replace(/clear: left/g, `clear: ${logic.left}`)
        .replace(/clear: right/g, `clear: ${logic.right}`)
        .replace(/float: left/g, `float: ${logic.left}`)
        .replace(/float: right/g, `float: ${logic.right}`)

        // replace "<prop> :"
        .replace(/margin-left :/g, `margin-${logic.left} :`)
        .replace(/margin-right :/g, `margin-${logic.right} :`)
        .replace(/padding-left :/g, `padding-${logic.left} :`)
        .replace(/padding-right :/g, `padding-${logic.right} :`)
        .replace(/border-left :/g, `border-${logic.left} :`)
        .replace(/border-right :/g, `border-${logic.right} :`)
        .replace(/border-top-left :/g, `border-top-${logic.left} :`)
        .replace(/border-top-right :/g, `border-top-${logic.right} :`)
        .replace(/border-bottom-right :/g, `border-bottom-${logic.right} :`)
        .replace(/border-bottom-left :/g, `border-bottom-${logic.left} :`)
        .replace(/left :/g, `${logic.left} :`)
        .replace(/right :/g, `${logic.right} :`)
        .replace(/text-align : left/g, `text-align : ${logic.left}`)
        .replace(/text-align : right/g, `text-align : ${logic.right}`)
        .replace(/clear : left/g, `clear : ${logic.left}`)
        .replace(/clear : right/g, `clear : ${logic.right}`)
        .replace(/float : left/g, `float : ${logic.left}`)
        .replace(/float : right/g, `float : ${logic.right}`)

        // replace "<prop>:<rule>"
        .replace(/clear:left/g, `clear:${logic.left}`)
        .replace(/clear:right/g, `clear:${logic.right}`)
        .replace(/float:left/g, `float:${logic.left}`)
        .replace(/float:right/g, `float:${logic.right}`);
    return newData;
}

function convertThisCSS(fileDir) {
    fs.readFile(fileDir, 'utf-8', function (err, data) {
        if (err) throw err;

        var newValue = convertNewValues(data, fileDir);

        fs.writeFile(fileDir, newValue, 'utf-8', function (error) {
            if (error) throw error;
            console.log(fileDir, 'converted!');
        });
    });
}

function walkDir(dir, done) {
    fs.readdir(dir, function (err, list) {
        console.log('Searching', dir, '...');
        if (err) return done(err);
        var i = 0;

        (function statFile() {
            var file = list[i++];

            if (!file) {
                console.log('Search on folder', dir, 'finished');
                return false;
            }

            file = dir + '/' + file;

            fs.stat(file, function (error, stat) {
                if (error) return done(null, error);

                if (stat && stat.isDirectory()) {
                    walkDir(file, function(errFile) {
                        if (errFile) throw err;
                        statFile();
                    });

                } else {

                    if (path.extname(file) === '.css') {
                        convertThisCSS(file);
                    }

                    statFile();
                }

                return true;
            });

            return true;
        }());

        return true;
    });
}

function walkDone(err) {
    if (err) throw err;

    console.log('--DONE!');
    return true;
}

function setOptions() {

    // default logic follows LTR;
    logic.left = 'end';
    logic.right = 'start';

    process.argv.forEach((val, index) => {
        if (val == '--RTL') {
            // invert logic to follows RTL;
            logic.left = 'end';
            logic.right = 'start';
            return true;
        }

        // hopping index 2 brings the path given
        if (index === 2) {
            pathToConvert = val;
            return true;
        }
    });
}

function convertToStartToEnd() {
    setOptions();

    if (pathToConvert.indexOf('.css') > 1) {
        convertThisCSS(pathToConvert);
    } else {
        walkDir(pathToConvert, walkDone);
    }
}

convertToStartToEnd();
