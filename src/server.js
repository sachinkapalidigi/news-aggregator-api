const http = require("http");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const app = require("./app");

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

// Add database connection

server.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
