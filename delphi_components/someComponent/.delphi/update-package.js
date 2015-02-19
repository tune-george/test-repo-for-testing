var fs = require('fs');
var path = require('path');
var defaultPackagePath = path.join(__dirname, '../', 'package.json');
var defaultPackage = require(defaultPackagePath);
var merge = require('lodash').merge;
var merged = merge({
  devDependencies: {
    "gulp": "^3.8.10"
  }
}, defaultPackage);

// make copy of original file
// var origFilePath = defaultPackagePath.replace('package.json', 'package.orig.json');
// fs.writeFileSync(origFilePath, fs.readFileSync(defaultPackagePath));

// merge delphi package with existing package
fs.writeFileSync(defaultPackagePath, JSON.stringify(merged, null, 2));