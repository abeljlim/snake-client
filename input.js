// setup interface to handle user input from stdin

let currentlyTyping = false;

const handleUserInput = function(data) {
  switch (data) {
    case '\u0003':
      process.exit();
      break;
    case 'w':
      connection.write("Move: up");
      break;
    case 'a':
      connection.write("Move: left");
      break;
    case 's':
      connection.write("Move: down");
      break;
    case 'd':
      connection.write("Move: right");
      break;
    case 'z':
      connection.write("Say: Hey everyone!");
      break;
    case 'x':
      connection.write("Say: Outta my way");
      break;
    case 'c':
      connection.write("Say: Gimme the food!");
      break;
    default:
      break;
  }
};

// Stores the active TCP connection object.
let connection;

const setupInput = (conn) => {
  connection = conn;

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", handleUserInput);

  return stdin;
};


module.exports = { setupInput };