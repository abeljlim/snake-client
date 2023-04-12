// setup interface to handle user input from stdin

let currentlyTyping = false;

const handleUserInput = function(data) {

  if (currentlyTyping) {
    process.stdin.on('data', (data) => {
    });
    return;
  }

  if (data === '\u000d') {
    if (!currentlyTyping) {
      currentlyTyping = true;
      process.stdout.write(`Say: `);
      return;
    }
    const name = data.toString(); // can't use data.replace(/^\s+|\s+$/g, '') because data is a buffer and not a string
    connection.write(`Say: ${name.replace(/^\s+|\s+$/g, '')}`);
  }

  switch (data) {
    case '\u0003':
      process.exit();
      break;
    case 'w': 
    connection.write("Move: up");

  }
  if (data === '\u0003') {
    process.exit();
  }
  if (data === 'w') {
    connection.write("Move: up");
  }
  if (data === 'a') {
    connection.write("Move: left");
  }
  if (data === 's') {
    connection.write("Move: down");
  }
  if (data === 'd') {
    connection.write("Move: right");
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