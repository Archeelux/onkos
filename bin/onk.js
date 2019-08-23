#!/usr/bin/env node

"use strict";

require("dotenv").config({ path: `${__dirname.replace("\\bin", "\\.env")}` });

const getFiles = require("../lib/getFiles");
const minimist = require("minimist");
const randomstr = require("randomstring");
const fs = require("fs");
const replace = require("replace-in-file");

async function start() {
    const argv = minimist(process.argv.slice(2), {});
    const args = argv._.slice();
    const path = args[0];

    const fileNamesArr = await getFiles(path);

    console.log(fileNamesArr);

    fileNamesArr.forEach(async function(element) {
        let { fileName, filePath, fileRaw } = element;

        if (fileName.match(/(.js$)/)) {
            const ranGen = randomstr.generate({
                length: 6
            });

            fileName = fileName.includes("_&_") ? fileName.split("_&_")[1] : fileName;

            console.log(fileName);

            const newFileName = `${ranGen}_&_${fileName}`;

            fs.rename(fileRaw, `${filePath}/${newFileName}`, function(err) {
                if (err) console.log(err);
            });

            const options = {
                files: `${path}/**/*`,
                from: new RegExp(`${fileName}`, "g"),
                to: newFileName
            };
            try {
                const results = await replace(options);
                console.log("Replacement results:", results);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }
    });
}

start();
