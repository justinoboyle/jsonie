var fs = require('fs');
var path = require('path');
var pkg = require('./package');

var buildpath = path.join(__dirname, pkg['main-build']);
var srcpath = path.join(__dirname, pkg['main-src']);

var enableSrc = !!process.env['ALLOWSRC'];

module.exports = (function() {
  if(fs.existsSync(buildpath))
    return require(buildpath);
  if(enableSrc)
      return require(srcpath);
  console.error('Not built!');
  return process.exit(-1);
})();
