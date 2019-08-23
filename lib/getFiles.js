"use strict";

const glob = require("glob");
const pat = require("path");
const fs = require("fs");

function readdirAsync(path) {
    var getDirectories = function(callback) {
        glob(pat.join(path, "**/*"), callback);
    };

    return new Promise(function(resolve, reject) {
        getDirectories(function(err, res) {
            if (err) reject(err);
            else
                resolve(
                    res
                        .map(function(item) {
                            const fileName = item.replace(/^.*[\\\/]/, "");
                            const filePath = item.replace(fileName, "");
                            const fileRaw = item;
                            return { fileName, filePath, fileRaw };
                        })
                        .filter(
                            a =>
                                a.fileRaw
                                    .split("/")
                                    .pop()
                                    .split(".").length > 1
                        )
                );
        });
    });
}

module.exports = readdirAsync;
