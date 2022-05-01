const handler = require("serve-handler");
const path = require("path");
const http = require("http");

const server = http.createServer(async (req, res) => {
  return await handler(req, res, {
    public: path.join(__dirname, "../build"),
    rewrites: [{ source: "*", destination: "/index.html" }],
  });
});

server.listen(5000, () => {
  console.log("Running at http://localhost:5000");
});
