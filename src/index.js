if (process.argv.length < 3) {
  console.error(`
Not enough arguments.

Usage: [input] | jsonie [resolve]

Example: cat file.json | jsonie root.one.two`);
  process.exit(-1);
}
var safeeval = require('safe-eval');
var stdin = process.stdin;
try {
  stdin.setRawMode(true);
} catch (e) { }

stdin.resume();

stdin.setEncoding('utf8');
let keys = "";
let cbo = 0;
let isO = false;
stdin.on('data', k => {
  for (let key of k)
    try {
      if (key === '\u0003')
        return done();
      if (key == "{") {
        isO = true;
        cbo++;
      }
      if (key == "}")
        cbo--;
      keys += key;
      if (isO && cbo == 0)
        return done();
    } catch (e) {
      console.log(e)
      console.error('failure');
      process.exit(-1);
    }
});

function done() {
  try {
    var root = JSON.parse(keys);
    var resol = safeeval(process.argv[2], {root: root, env: process.env});
    console.log(resol);
    process.exit(0);
  } catch (e) {
    console.error("undefined");
    process.exit(1);
  }

}