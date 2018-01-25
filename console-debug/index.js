const data = {
 icon: 'd',

 blueBg: "\x1b[44m",
 blueFg: "\x1b[36m",
 whiteFg: "\x1b[37m",

 reset: "\x1b[0m",
 reverse: "\x1b[7m"
};
console.old_debug =  console.debug ;
console.debug = function() {
 console.old_debug(data.blueBg + data.whiteFg, data.icon, data.reset, data.blueFg, ...arguments, data.reset);
};
module.exports = console.debug ;
