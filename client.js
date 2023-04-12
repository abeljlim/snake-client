const net = require("net");

// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: "localhost",// IP address here,
    port: 50541// PORT number here,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");
  
  conn.on("data", data => {
    console.log("Server says: ", data);
  });

  conn.on('connect', () => {
    console.log(`Successfully connected to game server`);
    process.stdout.write(`Name: `);
    process.stdin.on('data', (data) => {
      const name = data.toString(); // can't use data.replace(/^\s+|\s+$/g, '') because data is a buffer and not a string
      conn.write(`Name: ${name.replace(/^\s+|\s+$/g, '')}`);
    });
  });

  return conn;
};

module.exports = { connect };