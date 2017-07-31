// Output a prompt
var commands = require('./commands');
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim().split(" ")[0]; // remove the newline
  var command = commands[cmd];

  var args = data.toString().trim().split(" ")
  args.shift();
  command(args);
//   process.stdout.write('\nprompt > ');

});




